"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingFloor = void 0;
class ParkingFloor {
    constructor(floorNumber, spots) {
        this.floorNumber = floorNumber;
        this.spots = spots;
    }
    getFloorNumber() {
        return this.floorNumber;
    }
    getSpots() {
        return this.spots;
    }
}
exports.ParkingFloor = ParkingFloor;
