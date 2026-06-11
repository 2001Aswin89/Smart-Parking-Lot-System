import {
    Request,
    Response,
    NextFunction,
} from "express";

import { IParkingSpotRepository } from "../interfaces/repositories/IParkingSpotRepository";

export class SpotController {
    constructor(
        private spotRepository: IParkingSpotRepository,
    ) { }

    getAllSpots = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const spots =
                await this.spotRepository.findAll();

            res.status(200).json({
                success: true,
                data: spots,
            });
        } catch (error) {
            next(error);
        }
    };
}