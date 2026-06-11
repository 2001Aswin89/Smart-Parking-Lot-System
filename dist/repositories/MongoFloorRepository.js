"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoFloorRepository = void 0;
const FloorSchema_1 = require("../schemas/FloorSchema");
class MongoFloorRepository {
    async findAll() {
        return FloorSchema_1.FloorModel.find();
    }
    async findByFloorNumber(floorNumber) {
        return FloorSchema_1.FloorModel.findOne({
            floorNumber,
        });
    }
    async create(data) {
        return FloorSchema_1.FloorModel.create(data);
    }
    async update(floorNumber, data) {
        return FloorSchema_1.FloorModel.findOneAndUpdate({ floorNumber }, data, {
            returnDocument: "after",
        });
    }
}
exports.MongoFloorRepository = MongoFloorRepository;
