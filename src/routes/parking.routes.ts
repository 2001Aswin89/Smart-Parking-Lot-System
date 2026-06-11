import { Router } from "express";

import { parkingController } from "../config/container";

import {
    validateParkVehicleRequest,
    validateTicketIdParam,
} from "../middleware/validateRequest";

const router = Router();

router.post(
    "/park",
    validateParkVehicleRequest,
    parkingController.parkVehicle,
);

router.post(
    "/exit/:ticketId",
    validateTicketIdParam,
    parkingController.exitVehicle,
);

export default router;