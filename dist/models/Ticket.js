"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
class Ticket {
    id;
    vehicleNumber;
    spotId;
    entryTime;
    constructor(id, vehicleNumber, spotId, entryTime) {
        this.id = id;
        this.vehicleNumber = vehicleNumber;
        this.spotId = spotId;
        this.entryTime = entryTime;
    }
    getId() {
        return this.id;
    }
    getVehicleNumber() {
        return this.vehicleNumber;
    }
    getSpotId() {
        return this.spotId;
    }
    getEntryTime() {
        return this.entryTime;
    }
}
exports.Ticket = Ticket;
