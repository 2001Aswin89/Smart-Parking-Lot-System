"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediumSpot = void 0;
const ParkingSpot_1 = require("./ParkingSpot");
const SpotType_1 = require("../../enums/SpotType");
const VehicleType_1 = require("../../enums/VehicleType");
class MediumSpot extends ParkingSpot_1.ParkingSpot {
    constructor(id) {
        super(id, SpotType_1.SpotType.MEDIUM);
    }
    canFit(vehicle) {
        return (vehicle.getType() === VehicleType_1.VehicleType.CAR ||
            vehicle.getType() === VehicleType_1.VehicleType.MOTORCYCLE);
    }
}
exports.MediumSpot = MediumSpot;
