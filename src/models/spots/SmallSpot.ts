import { ParkingSpot } from "./ParkingSpot";
import { SpotType } from "../../enums/SpotType";
import { Vehicle } from "../vehicles/Vehicle";
import { VehicleType } from "../../enums/VehicleType";

export class SmallSpot extends ParkingSpot {
    constructor(id: string) {
        super(id, SpotType.SMALL);
    }

    canFit(vehicle: Vehicle): boolean {
        return vehicle.getType() === VehicleType.MOTORCYCLE;
    }
}