"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingController = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
class ParkingController {
    parkingService;
    exitService;
    constructor(parkingService, exitService) {
        this.parkingService = parkingService;
        this.exitService = exitService;
    }
    parkVehicle = async (req, res, next) => {
        try {
            const { vehicleNumber, vehicleType, } = req.body;
            const ticket = await this.parkingService.parkVehicle(vehicleNumber, vehicleType);
            res.status(201).json({
                success: true,
                message: "Vehicle parked successfully",
                data: ticket,
            });
        }
        catch (error) {
            next(error);
        }
    };
    exitVehicle = async (req, res, next) => {
        try {
            const ticketIdParam = req.params.ticketId;
            if (!ticketIdParam ||
                Array.isArray(ticketIdParam)) {
                throw new BadRequestError_1.BadRequestError("Valid ticket id is required");
            }
            const ticket = await this.exitService.exitVehicle(ticketIdParam);
            res.status(200).json({
                success: true,
                message: "Vehicle exited successfully",
                data: ticket,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.ParkingController = ParkingController;
