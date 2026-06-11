import { ParkingSpotModel } from "../schemas/ParkingSpotSchema";
import { FloorModel } from "../schemas/FloorSchema";

import { IParkingSpotRepository } from "../interfaces/repositories/IParkingSpotRepository";

import { ParkingSpotDocument } from "../types/ParkingSpotDocument";
import { SpotType } from "../enums/SpotType";

export class MongoParkingSpotRepository
    implements IParkingSpotRepository {

    async findAll(): Promise<ParkingSpotDocument[]> {
        return ParkingSpotModel.find()
            .sort({
                floorNumber: 1,
                spotNumber: 1,
            });
    }

    async findById(
        id: string,
    ): Promise<ParkingSpotDocument | null> {
        return ParkingSpotModel.findById(id);
    }

    async findAvailableByType(
        type: SpotType,
    ): Promise<ParkingSpotDocument[]> {
        return ParkingSpotModel.find({
            type,
            occupied: false,
        }).sort({
            floorNumber: 1,
            spotNumber: 1,
        });
    }

    async findAvailableByTypeOnActiveFloors(
        type: SpotType,
    ): Promise<ParkingSpotDocument[]> {
        const activeFloors =
            await FloorModel.find({
                isActive: true,
            }).sort({
                floorNumber: 1,
            });

        const activeFloorNumbers =
            activeFloors.map(
                (floor) => floor.floorNumber,
            );

        return ParkingSpotModel.find({
            type,
            occupied: false,
            floorNumber: {
                $in: activeFloorNumbers,
            },
        }).sort({
            floorNumber: 1,
            spotNumber: 1,
        });
    }

    async findNearestAvailableByTypesOnActiveFloors(
        types: SpotType[],
    ): Promise<ParkingSpotDocument | null> {
        const activeFloors =
            await FloorModel.find({
                isActive: true,
            }).sort({
                floorNumber: 1,
            });

        const activeFloorNumbers =
            activeFloors.map(
                (floor) => floor.floorNumber,
            );

        return ParkingSpotModel.findOne({
            type: {
                $in: types,
            },
            occupied: false,
            floorNumber: {
                $in: activeFloorNumbers,
            },
        }).sort({
            floorNumber: 1,
            spotNumber: 1,
        });
    }

    async reserveNearestAvailableByTypesOnActiveFloors(
        types: SpotType[],
    ): Promise<ParkingSpotDocument | null> {
        const activeFloors =
            await FloorModel.find({
                isActive: true,
            }).sort({
                floorNumber: 1,
            });

        const activeFloorNumbers =
            activeFloors.map(
                (floor) => floor.floorNumber,
            );

        return ParkingSpotModel.findOneAndUpdate(
            {
                type: {
                    $in: types,
                },
                occupied: false,
                floorNumber: {
                    $in: activeFloorNumbers,
                },
            },
            {
                occupied: true,
            },
            {
                new: true,
                sort: {
                    floorNumber: 1,
                    spotNumber: 1,
                },
            },
        );
    }

    async findByFloorNumbers(
        floorNumbers: number[],
    ): Promise<ParkingSpotDocument[]> {
        return ParkingSpotModel.find({
            floorNumber: {
                $in: floorNumbers,
            },
        }).sort({
            floorNumber: 1,
            spotNumber: 1,
        });
    }

    async create(
        data: Partial<ParkingSpotDocument>,
    ): Promise<ParkingSpotDocument> {
        return ParkingSpotModel.create(data);
    }

    async update(
        id: string,
        data: Partial<ParkingSpotDocument>,
    ): Promise<ParkingSpotDocument | null> {
        return ParkingSpotModel.findByIdAndUpdate(
            id,
            data,
            {
                returnDocument: "after",
            },
        );
    }

    async hasOccupiedSpotsOnFloor(
        floorNumber: number,
    ): Promise<boolean> {
        const spot =
            await ParkingSpotModel.findOne({
                floorNumber,
                occupied: true,
            });

        return !!spot;
    }
}