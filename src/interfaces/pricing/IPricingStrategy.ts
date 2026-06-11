import { VehicleType } from "../../enums/VehicleType";

export interface IPricingStrategy {
    calculateFee(
        entryTime: Date,
        exitTime: Date,
        vehicleType: VehicleType,
    ): number;
}