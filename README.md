# Smart Parking Lot System

A backend Smart Parking Lot System built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

The system manages parking floors, parking spots, vehicle entry, vehicle exit, nearest compatible spot allocation, ticket lifecycle, fee calculation, availability summary, and basic concurrency-safe spot reservation.

---

## Project Objective

Design and implement a backend system for a smart parking lot that can:

- Automatically allocate parking spots based on vehicle type and spot availability
- Track vehicle check-in and check-out
- Generate parking tickets
- Calculate parking fees
- Update spot availability in real time
- Support multiple floors
- Prevent closing floors that still contain parked vehicles
- Handle concurrent parking requests safely

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

The project follows an MVC-style backend architecture with service and repository layers.

```txt
Route -> Middleware -> Controller -> Service -> Repository -> MongoDB