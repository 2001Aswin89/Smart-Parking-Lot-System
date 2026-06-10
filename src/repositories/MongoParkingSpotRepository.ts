import { ParkingSpotModel } from "../schemas/ParkingSpotSchema";

import { IParkingSpotRepository } from "../interfaces/repositories/IParkingSpotRepository";

import { ParkingSpotDocument } from "../types/ParkingSpotDocument";
import { SpotType } from "../enums/SpotType";
import { FloorModel } from "../schemas/FloorSchema";

export class MongoParkingSpotRepository
    implements IParkingSpotRepository {
    async findAll(): Promise<ParkingSpotDocument[]> {
        return ParkingSpotModel.find();
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
            }
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

    async findAvailableByTypeOnActiveFloors(
        type: SpotType,
    ): Promise<ParkingSpotDocument[]> {
        const activeFloors = await FloorModel.find({ isActive: true });
        const activeFloorNumbers = activeFloors.map((f) => f.floorNumber);

        return ParkingSpotModel.find({
            type,
            occupied: false,
            floorNumber: { $in: activeFloorNumbers },
        });
    }
}