import { SpotType } from "../../enums/SpotType";
import { Vehicle } from "../vehicles/Vehicle";

export abstract class ParkingSpot {
    protected occupied = false;

    constructor(
        protected readonly id: string,
        protected readonly type: SpotType,
    ) { }

    abstract canFit(vehicle: Vehicle): boolean;

    occupy(): void {
        this.occupied = true;
    }

    free(): void {
        this.occupied = false;
    }

    isOccupied(): boolean {
        return this.occupied;
    }

    getId(): string {
        return this.id;
    }

    getType(): SpotType {
        return this.type;
    }
}