import {
    Request,
    Response,
    NextFunction,
} from "express";

import { AvailabilityService } from "../services/AvailabilityService";

export class AvailabilityController {
    constructor(
        private readonly availabilityService: AvailabilityService,
    ) { }

    getAvailability = async (
        _req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const availability =
                await this.availabilityService
                    .getAvailability();

            res.status(200).json({
                success: true,
                data: availability,
            });
        } catch (error) {
            next(error);
        }
    };
}