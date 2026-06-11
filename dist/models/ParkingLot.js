"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingLot = void 0;
class ParkingLot {
    constructor(id, floors) {
        this.id = id;
        this.floors = floors;
    }
    getId() {
        return this.id;
    }
    getFloors() {
        return this.floors;
    }
}
exports.ParkingLot = ParkingLot;
