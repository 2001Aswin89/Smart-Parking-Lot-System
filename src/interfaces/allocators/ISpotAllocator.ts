import { SpotType } from "../../enums/SpotType";
import { ParkingSpotDocument } from "../../types/ParkingSpotDocument";

export interface ISpotAllocator {
    allocateSpot(
        spotType: SpotType,
    ): Promise<ParkingSpotDocument | null>;

    reserveSpot(
        spotTypes: SpotType[],
    ): Promise<ParkingSpotDocument | null>;
}