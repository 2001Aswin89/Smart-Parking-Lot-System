import { VehicleType } from "../enums/VehicleType";
import { SpotType } from "../enums/SpotType";
import { TicketStatus } from "../enums/TicketStatus";

import { ISpotAllocator } from "../interfaces/allocators/ISpotAllocator";

import { ITicketRepository } from "../interfaces/repositories/ITicketRepository";

import { IParkingSpotRepository } from "../interfaces/repositories/IParkingSpotRepository";

import { TicketDocument } from "../types/TicketDocument";

import { BadRequestError } from "../errors/BadRequestError";

export class ParkingService {

    constructor(
        private readonly allocator: ISpotAllocator,

        private readonly parkingSpotRepository:
            IParkingSpotRepository,

        private readonly ticketRepository:
            ITicketRepository,
    ) { }

    async parkVehicle(
        vehicleNumber: string,
        vehicleType: VehicleType,
    ): Promise<TicketDocument> {

        if (!vehicleNumber || !vehicleType) {
            throw new BadRequestError(
                "Vehicle number and vehicle type are required",
            );
        }

        const existingActiveTicket =
            await this.ticketRepository
                .findActiveByVehicleNumber(
                    vehicleNumber,
                );

        if (existingActiveTicket) {
            throw new BadRequestError(
                "Vehicle already has an active parking ticket",
            );
        }

        const compatibleSpotTypes =
            this.getCompatibleSpotTypes(
                vehicleType,
            );

        const reservedSpot =
            await this.allocator.reserveSpot(
                compatibleSpotTypes,
            );

        if (!reservedSpot) {
            throw new BadRequestError(
                "No parking spot available",
            );
        }

        try {
            const ticket =
                await this.ticketRepository.create({
                    vehicleNumber,
                    vehicleType,

                    spotId: reservedSpot._id.toString(),

                    entryTime: new Date(),

                    status: TicketStatus.ACTIVE,
                });

            return ticket;
        } catch (error) {
            await this.parkingSpotRepository.update(
                reservedSpot._id.toString(),
                {
                    occupied: false,
                },
            );

            throw error;
        }
    }

    private getCompatibleSpotTypes(
        vehicleType: VehicleType,
    ): SpotType[] {

        switch (vehicleType) {

            case VehicleType.MOTORCYCLE:
                return [
                    SpotType.SMALL,
                    SpotType.MEDIUM,
                    SpotType.LARGE,
                ];

            case VehicleType.CAR:
                return [
                    SpotType.MEDIUM,
                    SpotType.LARGE,
                ];

            case VehicleType.BUS:
                return [
                    SpotType.LARGE,
                ];

            default:
                throw new BadRequestError(
                    "Unsupported vehicle type",
                );
        }
    }
}