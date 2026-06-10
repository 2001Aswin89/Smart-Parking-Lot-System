import { Router } from "express";

import { FloorController } from "../controllers/FloorController";

import { MongoFloorRepository } from "../repositories/MongoFloorRepository";
import { MongoParkingSpotRepository } from "../repositories/MongoParkingSpotRepository";

import { FloorService } from "../services/FloorService";

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

const floorController =
    new FloorController(
        floorRepository,
        floorService,
    );

router.post(
    "/",
    floorController.createFloor,
);

router.get(
    "/",
    floorController.getFloors,
);

router.patch(
    "/:floorNumber/close",
    floorController.closeFloor,
);

router.patch(
    "/:floorNumber/open",
    floorController.openFloor,
);

export default router;