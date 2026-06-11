import { MongoParkingSpotRepository } from "../repositories/MongoParkingSpotRepository";
import { MongoTicketRepository } from "../repositories/MongoTicketRepository";
import { MongoFloorRepository } from "../repositories/MongoFloorRepository";

import { NearestSpotAllocator } from "../allocators/NearestSpotAllocator";

import { HourlyPricingStrategy } from "../pricing/HourlyPricingStrategy";

import { ParkingService } from "../services/ParkingService";
import { ExitService } from "../services/ExitService";
import { FloorService } from "../services/FloorService";
import { AvailabilityService } from "../services/AvailabilityService";

import { ParkingController } from "../controllers/ParkingController";
import { FloorController } from "../controllers/FloorController";
import { SpotController } from "../controllers/SpotController";
import { AvailabilityController } from "../controllers/AvailabilityController";

const parkingSpotRepository =
    new MongoParkingSpotRepository();

const ticketRepository =
    new MongoTicketRepository();

const floorRepository =
    new MongoFloorRepository();

const spotAllocator =
    new NearestSpotAllocator(
        parkingSpotRepository,
    );

const pricingStrategy =
    new HourlyPricingStrategy();

const parkingService =
    new ParkingService(
        spotAllocator,
        parkingSpotRepository,
        ticketRepository,
    );

const exitService =
    new ExitService(
        ticketRepository,
        parkingSpotRepository,
        pricingStrategy,
    );

const floorService =
    new FloorService(
        floorRepository,
        parkingSpotRepository,
    );

const availabilityService =
    new AvailabilityService(
        floorRepository,
        parkingSpotRepository,
    );

export const parkingController =
    new ParkingController(
        parkingService,
        exitService,
    );

export const floorController =
    new FloorController(
        floorRepository,
        floorService,
    );

export const spotController =
    new SpotController(
        parkingSpotRepository,
    );

export const availabilityController =
    new AvailabilityController(
        availabilityService,
    );