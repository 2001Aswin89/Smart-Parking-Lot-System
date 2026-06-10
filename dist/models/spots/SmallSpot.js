"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallSpot = void 0;
const ParkingSpot_1 = require("./ParkingSpot");
const SpotType_1 = require("../../enums/SpotType");
const VehicleType_1 = require("../../enums/VehicleType");
class SmallSpot extends ParkingSpot_1.ParkingSpot {
    constructor(id) {
        super(id, SpotType_1.SpotType.SMALL);
    }
    canFit(vehicle) {
        return vehicle.getType() === VehicleType_1.VehicleType.MOTORCYCLE;
    }
}
exports.SmallSpot = SmallSpot;
