"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
class Vehicle {
    licensePlate;
    type;
    constructor(licensePlate, type) {
        this.licensePlate = licensePlate;
        this.type = type;
    }
    getLicensePlate() {
        return this.licensePlate;
    }
    getType() {
        return this.type;
    }
}
exports.Vehicle = Vehicle;
