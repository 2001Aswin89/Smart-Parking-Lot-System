import { Router } from "express";

import { AvailabilityController } from "../controllers/AvailabilityController";

import { AvailabilityService } from "../services/AvailabilityService";

import { MongoFloorRepository } from "../repositories/MongoFloorRepository";
import { MongoParkingSpotRepository } from "../repositories/MongoParkingSpotRepository";

const router = Router();

const floorRepository =
    new MongoFloorRepository();

const spotRepository =
    new MongoParkingSpotRepository();

const availabilityService =
    new AvailabilityService(
        floorRepository,
        spotRepository,
    );

const controller =
    new AvailabilityController(
        availabilityService,
    );

router.get(
    "/",
    controller.getAvailability,
);

export default router;