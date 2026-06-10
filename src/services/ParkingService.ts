import { VehicleType } from "../enums/VehicleType";
import { SpotType } from "../enums/SpotType";
import { TicketStatus } from "../enums/TicketStatus";

import { ISpotAllocator } from "../interfaces/allocators/ISpotAllocator";

import { ITicketRepository }
    from "../interfaces/repositories/ITicketRepository";

import { IParkingSpotRepository }
    from "../interfaces/repositories/IParkingSpotRepository";

import { TicketDocument } from "../types/TicketDocument";

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

        const requiredSpotType =
            this.getSpotType(vehicleType);

        const spot =
            await this.allocator.allocateSpot(
                requiredSpotType,
            );

        if (!spot) {
            throw new Error(
                "No parking spot available",
            );
        }

        await this.parkingSpotRepository.update(
            spot._id.toString(),
            {
                occupied: true,
            },
        );

        const ticket =
            await this.ticketRepository.create({
                vehicleNumber,
                vehicleType,

                spotId: spot._id.toString(),

                entryTime: new Date(),

                status: TicketStatus.ACTIVE,
            });

        return ticket;
    }

    private getSpotType(
        vehicleType: VehicleType,
    ): SpotType {

        switch (vehicleType) {

            case VehicleType.MOTORCYCLE:
                return SpotType.SMALL;

            case VehicleType.CAR:
                return SpotType.MEDIUM;

            case VehicleType.BUS:
                return SpotType.LARGE;

            default:
                throw new Error(
                    "Unsupported vehicle type",
                );
        }
    }
}