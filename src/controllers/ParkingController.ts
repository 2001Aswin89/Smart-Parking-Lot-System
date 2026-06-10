import { Request, Response, NextFunction } from "express";

import { ParkingService } from "../services/ParkingService";
import { ExitService } from "../services/ExitService";

import { VehicleType } from "../enums/VehicleType";

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
            const { ticketId } = req.body;

            const ticket =
                await this.exitService.exitVehicle(
                    ticketId,
                );

            res.status(200).json({
                success: true,
                data: ticket,
            });
        } catch (error) {
            next(error);
        }
    };
}