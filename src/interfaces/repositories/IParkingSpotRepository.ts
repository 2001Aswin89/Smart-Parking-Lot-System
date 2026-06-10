import { ParkingSpotDocument } from "../../types/ParkingSpotDocument";

export interface IParkingSpotRepository {
    findAll(): Promise<ParkingSpotDocument[]>;

    findById(
        id: string,
    ): Promise<ParkingSpotDocument | null>;

    findAvailableByType(
        type: string,
    ): Promise<ParkingSpotDocument[]>;

    create(
        data: Partial<ParkingSpotDocument>,
    ): Promise<ParkingSpotDocument>;

    update(
        id: string,
        data: Partial<ParkingSpotDocument>,
    ): Promise<ParkingSpotDocument | null>;
}