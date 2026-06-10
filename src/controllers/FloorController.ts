import {
    Request,
    Response,
    NextFunction,
} from "express";

import { IFloorRepository } from "../interfaces/repositories/IFloorRepository";
import { FloorService } from "../services/FloorService";

export class FloorController {
    constructor(
        private readonly floorRepository: IFloorRepository,
        private readonly floorService: FloorService,
    ) { }

    createFloor = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { floorNumber } = req.body;

            const existingFloor =
                await this.floorRepository.findByFloorNumber(
                    floorNumber,
                );

            if (existingFloor) {
                return res.status(409).json({
                    success: false,
                    message:
                        "Floor already exists",
                });
            }

            const floor =
                await this.floorRepository.create({
                    floorNumber,
                });

            res.status(201).json({
                success: true,
                data: floor,
            });
        } catch (error) {
            next(error);
        }
    };

    getFloors = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const floors =
                await this.floorRepository.findAll();

            res.status(200).json({
                success: true,
                data: floors,
            });
        } catch (error) {
            next(error);
        }
    };

    closeFloor = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const floorNumber = Number(
                req.params.floorNumber,
            );

            const floor =
                await this.floorService.closeFloor(
                    floorNumber,
                );

            res.status(200).json({
                success: true,
                message:
                    "Floor closed successfully",
                data: floor,
            });
        } catch (error) {
            next(error);
        }
    };
    openFloor = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const floorNumber = Number(
                req.params.floorNumber,
            );

            const floor =
                await this.floorService.openFloor(
                    floorNumber,
                );

            res.status(200).json({
                success: true,
                message:
                    "Floor opened successfully",
                data: floor,
            });
        } catch (error) {
            next(error);
        }
    };
}