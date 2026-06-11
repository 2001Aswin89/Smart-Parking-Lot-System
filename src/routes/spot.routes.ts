import { Router } from "express";

import { spotController } from "../config/container";

const router = Router();

router.get(
    "/",
    spotController.getAllSpots,
);

export default router;