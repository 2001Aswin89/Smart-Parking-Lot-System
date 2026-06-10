export interface IPricingStrategy {
    calculateFee(
        entryTime: Date,
        exitTime: Date,
    ): number;
}