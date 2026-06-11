"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HourlyPricingStrategy = void 0;
const VehicleType_1 = require("../enums/VehicleType");
class HourlyPricingStrategy {
    constructor() {
        this.rates = {
            [VehicleType_1.VehicleType.MOTORCYCLE]: 20,
            [VehicleType_1.VehicleType.CAR]: 50,
            [VehicleType_1.VehicleType.BUS]: 100,
        };
    }
    calculateFee(entryTime, exitTime, vehicleType) {
        const durationMs = exitTime.getTime() -
            entryTime.getTime();
        const hours = Math.max(1, Math.ceil(durationMs /
            (1000 * 60 * 60)));
        return hours * this.rates[vehicleType];
    }
}
exports.HourlyPricingStrategy = HourlyPricingStrategy;
