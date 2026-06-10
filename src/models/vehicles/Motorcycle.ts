import { Vehicle } from "./Vehicle";
import { VehicleType } from "../../enums/VehicleType";

export class Motorcycle extends Vehicle {
    constructor(licensePlate: string) {
        super(licensePlate, VehicleType.MOTORCYCLE);
    }
}