import { ParkingSpot } from "./spots/ParkingSpot";

export class ParkingFloor {
    constructor(
        private readonly floorNumber: number,
        private readonly spots: ParkingSpot[],
    ) { }

    getFloorNumber(): number {
        return this.floorNumber;
    }

    getSpots(): ParkingSpot[] {
        return this.spots;
    }
}