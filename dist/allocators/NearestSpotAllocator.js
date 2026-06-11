"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearestSpotAllocator = void 0;
class NearestSpotAllocator {
    parkingSpotRepository;
    constructor(parkingSpotRepository) {
        this.parkingSpotRepository = parkingSpotRepository;
    }
    async allocateSpot(spotType) {
        const spots = await this.parkingSpotRepository
            .findAvailableByTypeOnActiveFloors(spotType);
        if (spots.length === 0) {
            return null;
        }
        return spots[0];
    }
    async reserveSpot(spotTypes) {
        return this.parkingSpotRepository
            .reserveNearestAvailableByTypesOnActiveFloors(spotTypes);
    }
}
exports.NearestSpotAllocator = NearestSpotAllocator;
