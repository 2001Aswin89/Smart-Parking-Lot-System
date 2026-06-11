import { Router } from "express";

import { FloorController } from "../controllers/FloorController";

import { MongoFloorRepository } from "../repositories/MongoFloorRepository";
import { MongoParkingSpotRepository } from "../repositories/MongoParkingSpotRepository";

import { FloorService } from "../services/FloorService";

import {
    validateCreateFloorRequest,
    validateFloorNumberParam,
} from "../middleware/validateRequest";

const router = Router();

const floorRepository =
    new MongoFloorRepository();

const spotRepository =
    new MongoParkingSpotRepository();

const floorService =
    new FloorService(
        floorRepository,
        spotRepository,
    );

const controller =
    new FloorController(
        floorRepository,
        floorService,
    );

router.post(
    "/",
    validateCreateFloorRequest,
    controller.createFloor,
);

router.get(
    "/",
    controller.getFloors,
);

router.patch(
    "/:floorNumber/close",
    validateFloorNumberParam,
    controller.closeFloor,
);

router.patch(
    "/:floorNumber/open",
    validateFloorNumberParam,
    controller.openFloor,
);

export default router;