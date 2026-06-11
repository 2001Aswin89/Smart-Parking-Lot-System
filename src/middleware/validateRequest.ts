import {
    Request,
    Response,
    NextFunction,
} from "express";

import mongoose from "mongoose";

import { VehicleType } from "../enums/VehicleType";
import { SpotType } from "../enums/SpotType";

import { BadRequestError } from "../errors/BadRequestError";

export const validateParkVehicleRequest = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    try {
        const {
            vehicleNumber,
            vehicleType,
        } = req.body;

        if (
            typeof vehicleNumber !== "string" ||
            vehicleNumber.trim().length === 0
        ) {
            throw new BadRequestError(
                "Vehicle number is required",
            );
        }

        if (
            typeof vehicleType !== "string" ||
            !Object.values(VehicleType)
                .includes(vehicleType as VehicleType)
        ) {
            throw new BadRequestError(
                "Valid vehicle type is required",
            );
        }

        req.body.vehicleNumber =
            vehicleNumber.trim().toUpperCase();

        next();
    } catch (error) {
        next(error);
    }
};

export const validateTicketIdParam = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    try {
        const { ticketId } = req.params;

        if (
            !ticketId ||
            Array.isArray(ticketId) ||
            !mongoose.Types.ObjectId.isValid(ticketId)
        ) {
            throw new BadRequestError(
                "Valid ticket id is required",
            );
        }

        next();
    } catch (error) {
        next(error);
    }
};

export const validateFloorNumberParam = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    try {
        const { floorNumber } = req.params;

        const parsedFloorNumber =
            Number(floorNumber);

        if (
            !floorNumber ||
            Number.isNaN(parsedFloorNumber) ||
            parsedFloorNumber < 0
        ) {
            throw new BadRequestError(
                "Valid floor number is required",
            );
        }

        next();
    } catch (error) {
        next(error);
    }
};

export const validateCreateFloorRequest = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    try {
        const { floorNumber } = req.body;

        const parsedFloorNumber =
            Number(floorNumber);

        if (
            floorNumber === undefined ||
            floorNumber === null ||
            Number.isNaN(parsedFloorNumber) ||
            parsedFloorNumber < 0
        ) {
            throw new BadRequestError(
                "Valid floor number is required",
            );
        }

        req.body.floorNumber =
            parsedFloorNumber;

        next();
    } catch (error) {
        next(error);
    }
};

export const validateCreateSpotRequest = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    try {
        const {
            spotNumber,
            floorNumber,
            type,
        } = req.body;

        const parsedFloorNumber =
            Number(floorNumber);

        if (
            typeof spotNumber !== "string" ||
            spotNumber.trim().length === 0
        ) {
            throw new BadRequestError(
                "Spot number is required",
            );
        }

        if (
            floorNumber === undefined ||
            floorNumber === null ||
            Number.isNaN(parsedFloorNumber) ||
            parsedFloorNumber < 0
        ) {
            throw new BadRequestError(
                "Valid floor number is required",
            );
        }

        if (
            typeof type !== "string" ||
            !Object.values(SpotType)
                .includes(type as SpotType)
        ) {
            throw new BadRequestError(
                "Valid spot type is required",
            );
        }

        req.body.spotNumber =
            spotNumber.trim().toUpperCase();

        req.body.floorNumber =
            parsedFloorNumber;

        next();
    } catch (error) {
        next(error);
    }
};