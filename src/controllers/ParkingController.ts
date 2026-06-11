import {
    Request,
    Response,
    NextFunction,
} from "express";

import { ParkingService } from "../services/ParkingService";
import { ExitService } from "../services/ExitService";

import { VehicleType } from "../enums/VehicleType";

import { BadRequestError } from "../errors/BadRequestError";

export class ParkingController {
    constructor(
        private parkingService: ParkingService,
        private exitService: ExitService,
    ) { }

    parkVehicle = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {
                vehicleNumber,
                vehicleType,
            } = req.body;

            const ticket =
                await this.parkingService.parkVehicle(
                    vehicleNumber,
                    vehicleType as VehicleType,
                );

            res.status(201).json({
                success: true,
                message:
                    "Vehicle parked successfully",
                data: ticket,
            });
        } catch (error) {
            next(error);
        }
    };

    exitVehicle = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const ticketIdParam =
                req.params.ticketId;

            if (
                !ticketIdParam ||
                Array.isArray(ticketIdParam)
            ) {
                throw new BadRequestError(
                    "Valid ticket id is required",
                );
            }

            const ticket =
                await this.exitService.exitVehicle(
                    ticketIdParam,
                );

            res.status(200).json({
                success: true,
                message:
                    "Vehicle exited successfully",
                data: ticket,
            });
        } catch (error) {
            next(error);
        }
    };
}