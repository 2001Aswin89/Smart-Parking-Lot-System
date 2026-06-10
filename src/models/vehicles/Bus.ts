import { Vehicle } from "./Vehicle";
import { VehicleType } from "../../enums/VehicleType";

export class Bus extends Vehicle {
    constructor(licensePlate: string) {
        super(licensePlate, VehicleType.BUS);
    }
}