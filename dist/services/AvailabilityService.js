"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityService = void 0;
const SpotType_1 = require("../enums/SpotType");
class AvailabilityService {
    constructor(floorRepository, parkingSpotRepository) {
        this.floorRepository = floorRepository;
        this.parkingSpotRepository = parkingSpotRepository;
    }
    async getAvailability() {
        const floors = await this.floorRepository.findAll();
        const floorNumbers = floors.map((floor) => floor.floorNumber);
        const spots = await this.parkingSpotRepository.findByFloorNumbers(floorNumbers);
        return floors
            .sort((a, b) => a.floorNumber - b.floorNumber)
            .map((floor) => {
            const floorSpots = spots.filter((spot) => spot.floorNumber ===
                floor.floorNumber);
            return {
                floorNumber: floor.floorNumber,
                isActive: floor.isActive,
                totalSpots: floorSpots.length,
                availableSpots: floorSpots.filter((spot) => !spot.occupied).length,
                occupiedSpots: floorSpots.filter((spot) => spot.occupied).length,
                small: this.getTypeSummary(floorSpots, SpotType_1.SpotType.SMALL),
                medium: this.getTypeSummary(floorSpots, SpotType_1.SpotType.MEDIUM),
                large: this.getTypeSummary(floorSpots, SpotType_1.SpotType.LARGE),
            };
        });
    }
    getTypeSummary(spots, type) {
        const typeSpots = spots.filter((spot) => spot.type === type);
        return {
            total: typeSpots.length,
            available: typeSpots.filter((spot) => !spot.occupied).length,
            occupied: typeSpots.filter((spot) => spot.occupied).length,
        };
    }
}
exports.AvailabilityService = AvailabilityService;
