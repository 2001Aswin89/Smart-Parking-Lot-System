"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = void 0;
const Vehicle_1 = require("./Vehicle");
const VehicleType_1 = require("../../enums/VehicleType");
class Bus extends Vehicle_1.Vehicle {
    constructor(licensePlate) {
        super(licensePlate, VehicleType_1.VehicleType.BUS);
    }
}
exports.Bus = Bus;
