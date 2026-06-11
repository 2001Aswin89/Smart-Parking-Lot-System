"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorService = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const NotFoundError_1 = require("../errors/NotFoundError");
class FloorService {
    floorRepository;
    spotRepository;
    constructor(floorRepository, spotRepository) {
        this.floorRepository = floorRepository;
        this.spotRepository = spotRepository;
    }
    async closeFloor(floorNumber) {
        const floor = await this.floorRepository.findByFloorNumber(floorNumber);
        if (!floor) {
            throw new NotFoundError_1.NotFoundError("Floor not found");
        }
        const hasOccupiedSpots = await this.spotRepository.hasOccupiedSpotsOnFloor(floorNumber);
        if (hasOccupiedSpots) {
            throw new BadRequestError_1.BadRequestError("Cannot close floor. Vehicles are still parked on this floor.");
        }
        return this.floorRepository.update(floorNumber, {
            isActive: false,
        });
    }
    async openFloor(floorNumber) {
        const floor = await this.floorRepository.findByFloorNumber(floorNumber);
        if (!floor) {
            throw new NotFoundError_1.NotFoundError("Floor not found");
        }
        return this.floorRepository.update(floorNumber, {
            isActive: true,
        });
    }
}
exports.FloorService = FloorService;
