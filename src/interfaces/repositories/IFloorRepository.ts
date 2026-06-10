import { FloorDocument } from "../../types/FloorDocument";

export interface IFloorRepository {
    findAll(): Promise<FloorDocument[]>;

    findByFloorNumber(
        floorNumber: number,
    ): Promise<FloorDocument | null>;

    create(
        data: Partial<FloorDocument>,
    ): Promise<FloorDocument>;

    update(
        floorNumber: number,
        data: Partial<FloorDocument>,
    ): Promise<FloorDocument | null>;
}