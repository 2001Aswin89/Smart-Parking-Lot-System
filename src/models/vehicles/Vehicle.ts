import { VehicleType } from "../../enums/VehicleType";

export abstract class Vehicle {
    constructor(
        protected readonly licensePlate: string,
        protected readonly type: VehicleType,
    ) { }

    getLicensePlate(): string {
        return this.licensePlate;
    }

    getType(): VehicleType {
        return this.type;
    }
}