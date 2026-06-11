"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSpot = void 0;
class ParkingSpot {
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.occupied = false;
    }
    occupy() {
        this.occupied = true;
    }
    free() {
        this.occupied = false;
    }
    isOccupied() {
        return this.occupied;
    }
    getId() {
        return this.id;
    }
    getType() {
        return this.type;
    }
}
exports.ParkingSpot = ParkingSpot;
