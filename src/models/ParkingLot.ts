import { ParkingFloor } from "./ParkingFloor";

export class ParkingLot {
    constructor(
        private readonly id: string,
        private readonly floors: ParkingFloor[],
    ) { }

    getId(): string {
        return this.id;
    }

    getFloors(): ParkingFloor[] {
        return this.floors;
    }
}