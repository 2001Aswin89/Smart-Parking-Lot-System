import { IFloorRepository } from "../interfaces/repositories/IFloorRepository";
import { IParkingSpotRepository } from "../interfaces/repositories/IParkingSpotRepository";

import { SpotType } from "../enums/SpotType";

type AvailabilitySummary = {
    floorNumber: number;
    isActive: boolean;
    totalSpots: number;
    availableSpots: number;
    occupiedSpots: number;
    small: {
        total: number;
        available: number;
        occupied: number;
    };
    medium: {
        total: number;
        available: number;
        occupied: number;
    };
    large: {
        total: number;
        available: number;
        occupied: number;
    };
};

export class AvailabilityService {
    constructor(
        private readonly floorRepository: IFloorRepository,
        private readonly parkingSpotRepository: IParkingSpotRepository,
    ) { }

    async getAvailability(): Promise<AvailabilitySummary[]> {
        const floors =
            await this.floorRepository.findAll();

        const floorNumbers =
            floors.map(
                (floor) => floor.floorNumber,
            );

        const spots =
            await this.parkingSpotRepository.findByFloorNumbers(
                floorNumbers,
            );

        return floors
            .sort(
                (a, b) =>
                    a.floorNumber - b.floorNumber,
            )
            .map((floor) => {
                const floorSpots =
                    spots.filter(
                        (spot) =>
                            spot.floorNumber ===
                            floor.floorNumber,
                    );

                return {
                    floorNumber:
                        floor.floorNumber,

                    isActive:
                        floor.isActive,

                    totalSpots:
                        floorSpots.length,

                    availableSpots:
                        floorSpots.filter(
                            (spot) => !spot.occupied,
                        ).length,

                    occupiedSpots:
                        floorSpots.filter(
                            (spot) => spot.occupied,
                        ).length,

                    small:
                        this.getTypeSummary(
                            floorSpots,
                            SpotType.SMALL,
                        ),

                    medium:
                        this.getTypeSummary(
                            floorSpots,
                            SpotType.MEDIUM,
                        ),

                    large:
                        this.getTypeSummary(
                            floorSpots,
                            SpotType.LARGE,
                        ),
                };
            });
    }

    private getTypeSummary(
        spots: {
            type: SpotType;
            occupied: boolean;
        }[],
        type: SpotType,
    ) {
        const typeSpots =
            spots.filter(
                (spot) => spot.type === type,
            );

        return {
            total:
                typeSpots.length,

            available:
                typeSpots.filter(
                    (spot) => !spot.occupied,
                ).length,

            occupied:
                typeSpots.filter(
                    (spot) => spot.occupied,
                ).length,
        };
    }
}