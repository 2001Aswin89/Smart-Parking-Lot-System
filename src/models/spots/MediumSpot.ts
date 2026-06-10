import { ParkingSpot } from "./ParkingSpot";
import { SpotType } from "../../enums/SpotType";
import { Vehicle } from "../vehicles/Vehicle";
import { VehicleType } from "../../enums/VehicleType";

export class MediumSpot extends ParkingSpot {
    constructor(id: string) {
        super(id, SpotType.MEDIUM);
    }

    canFit(vehicle: Vehicle): boolean {
        return (
            vehicle.getType() === VehicleType.CAR ||
            vehicle.getType() === VehicleType.MOTORCYCLE
        );
    }
}