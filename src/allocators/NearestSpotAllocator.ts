import { ISpotAllocator } from "../interfaces/allocators/ISpotAllocator";

import { SpotType } from "../enums/SpotType";

import { ParkingSpotDocument } from "../types/ParkingSpotDocument";

import { IParkingSpotRepository } from "../interfaces/repositories/IParkingSpotRepository";

export class NearestSpotAllocator
    implements ISpotAllocator {

    constructor(
        private readonly parkingSpotRepository: IParkingSpotRepository,
    ) { }

    async allocateSpot(
        spotType: SpotType,
    ): Promise<ParkingSpotDocument | null> {
<<<<<<< HEAD
        const spots =
            await this.parkingSpotRepository
                .findAvailableByTypeOnActiveFloors(
                    spotType,
                );
=======

        const spots =
            await this.parkingSpotRepository
                .findAvailableByType(spotType);
>>>>>>> origin/development

        if (spots.length === 0) {
            return null;
        }

        return spots[0];
    }
<<<<<<< HEAD

    async reserveSpot(
        spotTypes: SpotType[],
    ): Promise<ParkingSpotDocument | null> {
        return this.parkingSpotRepository
            .reserveNearestAvailableByTypesOnActiveFloors(
                spotTypes,
            );
    }
=======
>>>>>>> origin/development
}