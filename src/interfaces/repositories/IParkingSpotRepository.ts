import { ParkingSpotDocument } from "../../types/ParkingSpotDocument";
import { SpotType } from "../../enums/SpotType";

export interface IParkingSpotRepository {
    findAll(): Promise<ParkingSpotDocument[]>;

    findById(
        id: string,
    ): Promise<ParkingSpotDocument | null>;

    findAvailableByType(
        type: SpotType,
    ): Promise<ParkingSpotDocument[]>;

    create(
        data: Partial<ParkingSpotDocument>,
    ): Promise<ParkingSpotDocument>;

    update(
        id: string,
        data: Partial<ParkingSpotDocument>,
    ): Promise<ParkingSpotDocument | null>;

    hasOccupiedSpotsOnFloor(
        floorNumber: number,
    ): Promise<boolean>;
    findAvailableByTypeOnActiveFloors(
        type: SpotType,
    ): Promise<ParkingSpotDocument[]>;
}


