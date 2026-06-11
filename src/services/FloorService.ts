import { IFloorRepository } from "../interfaces/repositories/IFloorRepository";
import { IParkingSpotRepository } from "../interfaces/repositories/IParkingSpotRepository";

import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";

export class FloorService {
    constructor(
        private readonly floorRepository: IFloorRepository,
        private readonly spotRepository: IParkingSpotRepository,
    ) { }

    async closeFloor(
        floorNumber: number,
    ) {
        const floor =
            await this.floorRepository.findByFloorNumber(
                floorNumber,
            );

        if (!floor) {
            throw new NotFoundError(
                "Floor not found",
            );
        }

        const hasOccupiedSpots =
            await this.spotRepository.hasOccupiedSpotsOnFloor(
                floorNumber,
            );

        if (hasOccupiedSpots) {
            throw new BadRequestError(
                "Cannot close floor. Vehicles are still parked on this floor.",
            );
        }

        return this.floorRepository.update(
            floorNumber,
            {
                isActive: false,
            },
        );
    }

    async openFloor(
        floorNumber: number,
    ) {
        const floor =
            await this.floorRepository.findByFloorNumber(
                floorNumber,
            );

        if (!floor) {
            throw new NotFoundError(
                "Floor not found",
            );
        }

        return this.floorRepository.update(
            floorNumber,
            {
                isActive: true,
            },
        );
    }
}