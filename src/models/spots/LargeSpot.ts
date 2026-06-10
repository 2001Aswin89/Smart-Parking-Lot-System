import { ParkingSpot } from "./ParkingSpot";
import { SpotType } from "../../enums/SpotType";
import { Vehicle } from "../vehicles/Vehicle";

export class LargeSpot extends ParkingSpot {
    constructor(id: string) {
        super(id, SpotType.LARGE);
    }

    canFit(vehicle: Vehicle): boolean {
        return true;
    }
}