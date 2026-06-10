"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoParkingSpotRepository = void 0;
const ParkingSpotSchema_1 = require("../schemas/ParkingSpotSchema");
class MongoParkingSpotRepository {
    async findAll() {
        return ParkingSpotSchema_1.ParkingSpotModel.find();
    }
    async findById(id) {
        return ParkingSpotSchema_1.ParkingSpotModel.findById(id);
    }
    async findAvailableByType(type) {
        return ParkingSpotSchema_1.ParkingSpotModel.find({
            type,
            occupied: false,
        });
    }
    async create(data) {
        return ParkingSpotSchema_1.ParkingSpotModel.create(data);
    }
    async update(id, data) {
        return ParkingSpotSchema_1.ParkingSpotModel.findByIdAndUpdate(id, data, { new: true });
    }
}
exports.MongoParkingSpotRepository = MongoParkingSpotRepository;
