import { FloorModel } from "../schemas/FloorSchema";

import { IFloorRepository } from "../interfaces/repositories/IFloorRepository";

import { FloorDocument } from "../types/FloorDocument";

export class MongoFloorRepository
    implements IFloorRepository {

    async findAll(): Promise<FloorDocument[]> {
        return FloorModel.find();
    }

    async findByFloorNumber(
        floorNumber: number,
    ): Promise<FloorDocument | null> {
        return FloorModel.findOne({
            floorNumber,
        });
    }

    async create(
        data: Partial<FloorDocument>,
    ): Promise<FloorDocument> {
        return FloorModel.create(data);
    }

    async update(
        floorNumber: number,
        data: Partial<FloorDocument>,
    ): Promise<FloorDocument | null> {
        return FloorModel.findOneAndUpdate(
            { floorNumber },
            data,
            {
                returnDocument: "after",
            }
        );
    }
}