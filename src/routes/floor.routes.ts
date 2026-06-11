import { Router } from "express";

import { floorController } from "../config/container";

import {
    validateCreateFloorRequest,
    validateFloorNumberParam,
} from "../middleware/validateRequest";

const router = Router();

router.post(
    "/",
    validateCreateFloorRequest,
    floorController.createFloor,
);

router.get(
    "/",
    floorController.getFloors,
);

router.patch(
    "/:floorNumber/close",
    validateFloorNumberParam,
    floorController.closeFloor,
);

router.patch(
    "/:floorNumber/open",
    validateFloorNumberParam,
    floorController.openFloor,
);

export default router;