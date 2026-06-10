"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const Vehicle_1 = require("./Vehicle");
const VehicleType_1 = require("../../enums/VehicleType");
class Car extends Vehicle_1.Vehicle {
    constructor(licensePlate) {
        super(licensePlate, VehicleType_1.VehicleType.CAR);
    }
}
exports.Car = Car;
