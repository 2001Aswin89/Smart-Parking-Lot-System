"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateSpotRequest = exports.validateCreateFloorRequest = exports.validateFloorNumberParam = exports.validateTicketIdParam = exports.validateParkVehicleRequest = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const VehicleType_1 = require("../enums/VehicleType");
const SpotType_1 = require("../enums/SpotType");
const BadRequestError_1 = require("../errors/BadRequestError");
const validateParkVehicleRequest = (req, _res, next) => {
    try {
        const { vehicleNumber, vehicleType, } = req.body;
        if (typeof vehicleNumber !== "string" ||
            vehicleNumber.trim().length === 0) {
            throw new BadRequestError_1.BadRequestError("Vehicle number is required");
        }
        if (typeof vehicleType !== "string" ||
            !Object.values(VehicleType_1.VehicleType)
                .includes(vehicleType)) {
            throw new BadRequestError_1.BadRequestError("Valid vehicle type is required");
        }
        req.body.vehicleNumber =
            vehicleNumber.trim().toUpperCase();
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateParkVehicleRequest = validateParkVehicleRequest;
const validateTicketIdParam = (req, _res, next) => {
    try {
        const { ticketId } = req.params;
        if (!ticketId ||
            Array.isArray(ticketId) ||
            !mongoose_1.default.Types.ObjectId.isValid(ticketId)) {
            throw new BadRequestError_1.BadRequestError("Valid ticket id is required");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateTicketIdParam = validateTicketIdParam;
const validateFloorNumberParam = (req, _res, next) => {
    try {
        const { floorNumber } = req.params;
        const parsedFloorNumber = Number(floorNumber);
        if (!floorNumber ||
            Number.isNaN(parsedFloorNumber) ||
            parsedFloorNumber < 0) {
            throw new BadRequestError_1.BadRequestError("Valid floor number is required");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateFloorNumberParam = validateFloorNumberParam;
const validateCreateFloorRequest = (req, _res, next) => {
    try {
        const { floorNumber } = req.body;
        const parsedFloorNumber = Number(floorNumber);
        if (floorNumber === undefined ||
            floorNumber === null ||
            Number.isNaN(parsedFloorNumber) ||
            parsedFloorNumber < 0) {
            throw new BadRequestError_1.BadRequestError("Valid floor number is required");
        }
        req.body.floorNumber =
            parsedFloorNumber;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateCreateFloorRequest = validateCreateFloorRequest;
const validateCreateSpotRequest = (req, _res, next) => {
    try {
        const { spotNumber, floorNumber, type, } = req.body;
        const parsedFloorNumber = Number(floorNumber);
        if (typeof spotNumber !== "string" ||
            spotNumber.trim().length === 0) {
            throw new BadRequestError_1.BadRequestError("Spot number is required");
        }
        if (floorNumber === undefined ||
            floorNumber === null ||
            Number.isNaN(parsedFloorNumber) ||
            parsedFloorNumber < 0) {
            throw new BadRequestError_1.BadRequestError("Valid floor number is required");
        }
        if (typeof type !== "string" ||
            !Object.values(SpotType_1.SpotType)
                .includes(type)) {
            throw new BadRequestError_1.BadRequestError("Valid spot type is required");
        }
        req.body.spotNumber =
            spotNumber.trim().toUpperCase();
        req.body.floorNumber =
            parsedFloorNumber;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateCreateSpotRequest = validateCreateSpotRequest;
