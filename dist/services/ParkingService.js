"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingService = void 0;
const VehicleType_1 = require("../enums/VehicleType");
const SpotType_1 = require("../enums/SpotType");
const TicketStatus_1 = require("../enums/TicketStatus");
const BadRequestError_1 = require("../errors/BadRequestError");
class ParkingService {
    allocator;
    parkingSpotRepository;
    ticketRepository;
    constructor(allocator, parkingSpotRepository, ticketRepository) {
        this.allocator = allocator;
        this.parkingSpotRepository = parkingSpotRepository;
        this.ticketRepository = ticketRepository;
    }
    async parkVehicle(vehicleNumber, vehicleType) {
        if (!vehicleNumber || !vehicleType) {
            throw new BadRequestError_1.BadRequestError("Vehicle number and vehicle type are required");
        }
        const existingActiveTicket = await this.ticketRepository
            .findActiveByVehicleNumber(vehicleNumber);
        if (existingActiveTicket) {
            throw new BadRequestError_1.BadRequestError("Vehicle already has an active parking ticket");
        }
        const compatibleSpotTypes = this.getCompatibleSpotTypes(vehicleType);
        const reservedSpot = await this.allocator.reserveSpot(compatibleSpotTypes);
        if (!reservedSpot) {
            throw new BadRequestError_1.BadRequestError("No parking spot available");
        }
        try {
            const ticket = await this.ticketRepository.create({
                vehicleNumber,
                vehicleType,
                spotId: reservedSpot._id.toString(),
                entryTime: new Date(),
                status: TicketStatus_1.TicketStatus.ACTIVE,
            });
            return ticket;
        }
        catch (error) {
            await this.parkingSpotRepository.update(reservedSpot._id.toString(), {
                occupied: false,
            });
            throw error;
        }
    }
    getCompatibleSpotTypes(vehicleType) {
        switch (vehicleType) {
            case VehicleType_1.VehicleType.MOTORCYCLE:
                return [
                    SpotType_1.SpotType.SMALL,
                    SpotType_1.SpotType.MEDIUM,
                    SpotType_1.SpotType.LARGE,
                ];
            case VehicleType_1.VehicleType.CAR:
                return [
                    SpotType_1.SpotType.MEDIUM,
                    SpotType_1.SpotType.LARGE,
                ];
            case VehicleType_1.VehicleType.BUS:
                return [
                    SpotType_1.SpotType.LARGE,
                ];
            default:
                throw new BadRequestError_1.BadRequestError("Unsupported vehicle type");
        }
    }
}
exports.ParkingService = ParkingService;
