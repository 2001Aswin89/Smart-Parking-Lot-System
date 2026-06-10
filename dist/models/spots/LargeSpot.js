"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LargeSpot = void 0;
const ParkingSpot_1 = require("./ParkingSpot");
const SpotType_1 = require("../../enums/SpotType");
class LargeSpot extends ParkingSpot_1.ParkingSpot {
    constructor(id) {
        super(id, SpotType_1.SpotType.LARGE);
    }
    canFit(vehicle) {
        return true;
    }
}
exports.LargeSpot = LargeSpot;
