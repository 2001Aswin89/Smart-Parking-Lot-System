# Smart Parking Lot System

A backend Smart Parking Lot System built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **Mongoose**.

The system manages parking floors, parking spots, vehicle check-in, vehicle check-out, nearest compatible spot allocation, ticket lifecycle, fee calculation, availability summary, validation, seed data, and concurrency-safe spot reservation.

---

## Table of Contents

- [Project Objective](#project-objective)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Design Patterns Used](#design-patterns-used)
- [Core Business Rules](#core-business-rules)
- [Vehicle and Spot Compatibility](#vehicle-and-spot-compatibility)
- [Fee Calculation](#fee-calculation)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Seed Data](#seed-data)
- [Testing](#testing)
- [Example Demo Flow](#example-demo-flow)
- [Concurrency Handling](#concurrency-handling)
- [Error Handling](#error-handling)
- [Future Improvements](#future-improvements)

---

## Project Objective

Design and implement a backend system for a smart parking lot that can:

- Automatically allocate parking spots based on vehicle type and spot availability.
- Track vehicle check-in and check-out.
- Generate parking tickets.
- Calculate parking fees.
- Update spot availability in real time.
- Support multiple floors.
- Prevent closing floors that still contain parked vehicles.
- Handle concurrent parking requests safely.

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Jest
- Supertest

---

## Architecture

The project follows an MVC-style backend architecture with additional service and repository layers.

```txt
Route -> Middleware -> Controller -> Service -> Repository -> MongoDB
```

### Why this structure?

- **Routes** define API endpoints.
- **Middleware** validates requests before controller logic.
- **Controllers** handle request/response flow.
- **Services** contain business logic.
- **Repositories** abstract database operations.
- **Schemas** define MongoDB document structure.

This keeps the code maintainable and avoids placing business logic directly inside controllers or routes.

---

## Folder Structure

```txt
src/
├── allocators/
│   └── NearestSpotAllocator.ts
│
├── config/
│   ├── container.ts
│   ├── env.ts
│   └── validateEnv.ts
│
├── controllers/
│   ├── AvailabilityController.ts
│   ├── FloorController.ts
│   ├── ParkingController.ts
│   └── SpotController.ts
│
├── database/
│   └── connection.ts
│
├── enums/
│   ├── SpotType.ts
│   ├── TicketStatus.ts
│   └── VehicleType.ts
│
├── errors/
│   ├── AppError.ts
│   ├── BadRequestError.ts
│   └── NotFoundError.ts
│
├── interfaces/
│   ├── allocators/
│   ├── pricing/
│   └── repositories/
│
├── middleware/
│   ├── errorHandler.ts
│   ├── notFoundHandler.ts
│   └── validateRequest.ts
│
├── models/
│   ├── spots/
│   └── vehicles/
│
├── pricing/
│   └── HourlyPricingStrategy.ts
│
├── repositories/
│   ├── MongoFloorRepository.ts
│   ├── MongoParkingSpotRepository.ts
│   └── MongoTicketRepository.ts
│
├── routes/
│   ├── availability.routes.ts
│   ├── floor.routes.ts
│   ├── health.routes.ts
│   ├── parking.routes.ts
│   └── spot.routes.ts
│
├── schemas/
│   ├── FloorSchema.ts
│   ├── ParkingSpotSchema.ts
│   └── TicketSchema.ts
│
├── scripts/
│   └── seedParkingData.ts
│
├── services/
│   ├── AvailabilityService.ts
│   ├── ExitService.ts
│   ├── FloorService.ts
│   └── ParkingService.ts
│
├── types/
│   ├── FloorDocument.ts
│   ├── ParkingSpotDocument.ts
│   └── TicketDocument.ts
│
├── app.ts
└── server.ts
```

---

## Design Patterns Used

### MVC Pattern

The application uses controllers and routes to separate HTTP handling from business logic.

### Service Layer

Business logic is placed in services.

Examples:

- Parking a vehicle
- Exiting a vehicle
- Opening and closing floors
- Generating availability summaries

### Repository Pattern

Repositories abstract MongoDB/Mongoose logic.

This prevents services from depending directly on Mongoose models.

### Strategy Pattern

Used for:

- Parking spot allocation
- Parking fee calculation

### Dependency Injection

Dependencies are wired in:

```txt
src/config/container.ts
```

This keeps route files clean and avoids repeated object creation inside route modules.

---

## Core Business Rules

- A vehicle can have only one active parking ticket at a time.
- A parking spot can be assigned to only one active vehicle.
- A closed floor should not receive new parking allocations.
- A floor cannot be closed if it has occupied parking spots.
- Parking fee is calculated during checkout.
- Spot availability is updated after check-in and checkout.
- Parking spot reservation is concurrency-safe.
- Invalid requests return consistent error responses.

---

## Vehicle and Spot Compatibility

The system supports three vehicle types:

```txt
MOTORCYCLE
CAR
BUS
```

The system supports three spot types:

```txt
SMALL
MEDIUM
LARGE
```

Current compatibility rule:

```txt
MOTORCYCLE -> SMALL, MEDIUM, LARGE
CAR        -> MEDIUM, LARGE
BUS        -> LARGE
```

This means:

- A motorcycle can fit into any spot.
- A car can fit into medium or large spots.
- A bus can fit only into large spots.

Nearest allocation is based on:

```txt
floorNumber ascending
spotNumber ascending
```

So if floor 1 and floor 2 both have available compatible spots, floor 1 is selected first.

---

## Fee Calculation

Fee is calculated during checkout.

Current hourly rates:

```txt
MOTORCYCLE -> 20 per hour
CAR        -> 50 per hour
BUS        -> 100 per hour
```

Billing is rounded up to the next hour.

Examples:

```txt
1 minute   -> 1 hour charged
60 minutes -> 1 hour charged
61 minutes -> 2 hours charged
```

---

## API Endpoints

### API Status

```http
GET /
```

Response:

```json
{
  "success": true,
  "message": "Smart Parking Lot API"
}
```

---

### Health Check

```http
GET /health
```

---

### Park Vehicle

```http
POST /api/parking/park
```

Request body:

```json
{
  "vehicleNumber": "KL08AB1234",
  "vehicleType": "CAR"
}
```

Success response:

```json
{
  "success": true,
  "message": "Vehicle parked successfully",
  "data": {
    "_id": "ticket_id",
    "vehicleNumber": "KL08AB1234",
    "vehicleType": "CAR",
    "spotId": "spot_id",
    "entryTime": "2026-06-11T10:00:00.000Z",
    "exitTime": null,
    "fee": 0,
    "status": "ACTIVE"
  }
}
```

Possible errors:

```json
{
  "success": false,
  "message": "Vehicle already has an active parking ticket"
}
```

```json
{
  "success": false,
  "message": "No parking spot available"
}
```

---

### Exit Vehicle

```http
POST /api/parking/exit/:ticketId
```

Example:

```http
POST /api/parking/exit/684abcd12345678901234567
```

Success response:

```json
{
  "success": true,
  "message": "Vehicle exited successfully",
  "data": {
    "_id": "ticket_id",
    "vehicleNumber": "KL08AB1234",
    "vehicleType": "CAR",
    "spotId": "spot_id",
    "entryTime": "2026-06-11T10:00:00.000Z",
    "exitTime": "2026-06-11T12:00:00.000Z",
    "fee": 100,
    "status": "CLOSED"
  }
}
```

Possible errors:

```json
{
  "success": false,
  "message": "Ticket not found"
}
```

```json
{
  "success": false,
  "message": "Ticket already closed"
}
```

---

### Get Availability Summary

```http
GET /api/availability
```

Success response:

```json
{
  "success": true,
  "data": [
    {
      "floorNumber": 1,
      "isActive": true,
      "totalSpots": 10,
      "availableSpots": 7,
      "occupiedSpots": 3,
      "small": {
        "total": 3,
        "available": 2,
        "occupied": 1
      },
      "medium": {
        "total": 5,
        "available": 4,
        "occupied": 1
      },
      "large": {
        "total": 2,
        "available": 1,
        "occupied": 1
      }
    }
  ]
}
```

---

### Get All Spots

```http
GET /api/spots
```

---

### Create Floor

```http
POST /api/floors
```

Request body:

```json
{
  "floorNumber": 1
}
```

---

### Get Floors

```http
GET /api/floors
```

---

### Close Floor

```http
PATCH /api/floors/:floorNumber/close
```

A floor cannot be closed if it contains occupied spots.

Possible error:

```json
{
  "success": false,
  "message": "Cannot close floor. Vehicles are still parked on this floor."
}
```

---

### Open Floor

```http
PATCH /api/floors/:floorNumber/open
```

---

## Main API Summary

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API status |
| GET | `/health` | Health check |
| POST | `/api/parking/park` | Park a vehicle |
| POST | `/api/parking/exit/:ticketId` | Exit a vehicle |
| GET | `/api/availability` | Get floor-wise availability summary |
| GET | `/api/spots` | Get all parking spots |
| POST | `/api/floors` | Create a floor |
| GET | `/api/floors` | Get all floors |
| PATCH | `/api/floors/:floorNumber/close` | Close a floor |
| PATCH | `/api/floors/:floorNumber/open` | Open a floor |

---

## Request Validation

Request validation is handled using Express middleware.

Validated inputs include:

- Vehicle number
- Vehicle type
- Ticket ID
- Floor number
- Spot type

Invalid requests return a consistent error response.

Example:

```json
{
  "success": false,
  "message": "Valid vehicle type is required"
}
```

---

## Error Handling

The project uses custom error classes:

```txt
AppError
BadRequestError
NotFoundError
```

The global error handler returns consistent JSON responses.

Example:

```json
{
  "success": false,
  "message": "Floor not found"
}
```

---

## Concurrency Handling

Parking spot reservation is handled using atomic MongoDB update logic.

The reservation operation checks:

```txt
occupied: false
```

and updates the same spot to:

```txt
occupied: true
```

in one atomic operation.

This prevents two simultaneous parking requests from reserving the same spot.

The behavior is tested using concurrency tests in Jest and Supertest.

---

## Environment Variables

Create `.env` in the project root:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/smart_parking
```

For tests, create `.env.test`:

```env
NODE_ENV=test
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/smart_parking_test
```

---

## Installation

```bash
npm install
```

---

## Running the Application

### Development mode

```bash
npm run dev
```

Default URL:

```txt
http://localhost:3000
```

### Build

```bash
npm run build
```

### Start production build

```bash
npm start
```

---

## Seed Data

A seed script is available for creating initial parking floors and spots.

```bash
npm run seed
```

The seed script creates sample parking floors and parking spots with different spot types.

Example seeded data:

```txt
Floor 1:
  SMALL, MEDIUM, LARGE spots

Floor 2:
  SMALL, MEDIUM, LARGE spots

Floor 3:
  SMALL, MEDIUM, LARGE spots
```

---

## Testing

Run tests:

```bash
npm test
```

The test suite uses a separate MongoDB database configured through `.env.test`.

Current tests cover:

- Parking API
- Checkout API
- Availability API
- Floor API
- Request validation
- Duplicate active ticket prevention
- Concurrent parking allocation
- Occupied floor closure prevention

Test files are stored outside `src/`:

```txt
tests/
├── availability.api.test.ts
├── concurrency.api.test.ts
├── floor.api.test.ts
├── parking.api.test.ts
├── helpers/
│   └── seedTestData.ts
└── setup.ts
```

A separate TypeScript config is used for tests:

```txt
tsconfig.test.json
```

This keeps production build output clean and prevents test files from being included in `dist/`.

---

## Example Demo Flow

### 1. Seed parking data

```bash
npm run seed
```

### 2. Start the server

```bash
npm run dev
```

### 3. Check availability

```http
GET /api/availability
```

### 4. Park a car

```http
POST /api/parking/park
```

Request:

```json
{
  "vehicleNumber": "KL08AB1234",
  "vehicleType": "CAR"
}
```

### 5. Check availability again

```http
GET /api/availability
```

### 6. Exit using ticket ID

```http
POST /api/parking/exit/:ticketId
```

---

## Scripts

```json
{
  "dev": "ts-node-dev --respawn src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "test": "cross-env NODE_ENV=test jest --runInBand",
  "test:watch": "cross-env NODE_ENV=test jest --watch",
  "seed": "ts-node src/scripts/seedParkingData.ts"
}
```

---

## Project Status

Completed:

- Parking spot allocation
- Nearest compatible allocation
- Vehicle check-in
- Vehicle check-out
- Fee calculation
- Vehicle-type-based pricing
- Real-time availability summary endpoint
- Multiple floor support
- Floor open/close
- Prevent closing occupied floors
- Atomic spot reservation
- Request validation
- Global error handling
- Seed script
- Jest/Supertest test coverage
- Concurrency tests
- README documentation

---

