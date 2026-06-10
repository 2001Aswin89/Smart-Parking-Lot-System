import { Vehicle } from "./Vehicle";
import { VehicleType } from "../../enums/VehicleType";

export class Car extends Vehicle {
    constructor(licensePlate: string) {
        super(licensePlate, VehicleType.CAR);
    }
}