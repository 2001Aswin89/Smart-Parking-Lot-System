import { Router } from "express";

import { availabilityController } from "../config/container";

const router = Router();

router.get(
    "/",
    availabilityController.getAvailability,
);

export default router;