import { IPricingStrategy }
    from "../interfaces/pricing/IPricingStrategy";

export class HourlyPricingStrategy
    implements IPricingStrategy {

    constructor(
        private readonly ratePerHour: number = 50,
    ) { }

    calculateFee(
        entryTime: Date,
        exitTime: Date,
    ): number {

        const durationMs =
            exitTime.getTime() -
            entryTime.getTime();

        const hours =
            Math.ceil(
                durationMs /
                (1000 * 60 * 60),
            );

        return hours * this.ratePerHour;
    }
}