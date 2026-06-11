import { IPricingStrategy } from "../interfaces/pricing/IPricingStrategy";
import { VehicleType } from "../enums/VehicleType";

export class HourlyPricingStrategy
    implements IPricingStrategy {

    private readonly rates: Record<VehicleType, number> = {
        [VehicleType.MOTORCYCLE]: 20,
        [VehicleType.CAR]: 50,
        [VehicleType.BUS]: 100,
    };

    calculateFee(
        entryTime: Date,
        exitTime: Date,
        vehicleType: VehicleType,
    ): number {
        const durationMs =
            exitTime.getTime() -
            entryTime.getTime();

        const hours =
            Math.max(
                1,
                Math.ceil(
                    durationMs /
                    (1000 * 60 * 60),
                ),
            );

        return hours * this.rates[vehicleType];
    }
}