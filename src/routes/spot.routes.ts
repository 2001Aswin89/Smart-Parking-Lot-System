import { Router } from "express";

import { SpotController } from "../controllers/SpotController";

import { MongoParkingSpotRepository } from "../repositories/MongoParkingSpotRepository";

const router = Router();

const repository =
    new MongoParkingSpotRepository();

const controller =
    new SpotController(repository);

router.get(
    "/",
    controller.getAllSpots,
);

export default router;