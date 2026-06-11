import { Router } from "express";

import { ParkingController } from "../controllers/ParkingController";

import { ParkingService } from "../services/ParkingService";
import { ExitService } from "../services/ExitService";

import { MongoParkingSpotRepository } from "../repositories/MongoParkingSpotRepository";
import { MongoTicketRepository } from "../repositories/MongoTicketRepository";

import { NearestSpotAllocator } from "../allocators/NearestSpotAllocator";
import { HourlyPricingStrategy } from "../pricing/HourlyPricingStrategy";

import {
    validateParkVehicleRequest,
    validateTicketIdParam,
} from "../middleware/validateRequest";

const router = Router();

const spotRepository =
    new MongoParkingSpotRepository();

const ticketRepository =
    new MongoTicketRepository();

const allocator =
    new NearestSpotAllocator(
        spotRepository,
    );

const pricingStrategy =
    new HourlyPricingStrategy();

const parkingService =
    new ParkingService(
        allocator,
        spotRepository,
        ticketRepository,
    );

const exitService =
    new ExitService(
        ticketRepository,
        spotRepository,
        pricingStrategy,
    );

const controller =
    new ParkingController(
        parkingService,
        exitService,
    );

router.post(
    "/park",
    validateParkVehicleRequest,
    controller.parkVehicle,
);

router.post(
    "/exit/:ticketId",
    validateTicketIdParam,
    controller.exitVehicle,
);

export default router;