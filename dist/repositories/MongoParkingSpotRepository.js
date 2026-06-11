"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoParkingSpotRepository = void 0;
const ParkingSpotSchema_1 = require("../schemas/ParkingSpotSchema");
const FloorSchema_1 = require("../schemas/FloorSchema");
class MongoParkingSpotRepository {
    async findAll() {
        return ParkingSpotSchema_1.ParkingSpotModel.find()
            .sort({
            floorNumber: 1,
            spotNumber: 1,
        });
    }
    async findById(id) {
        return ParkingSpotSchema_1.ParkingSpotModel.findById(id);
    }
    async findAvailableByType(type) {
        return ParkingSpotSchema_1.ParkingSpotModel.find({
            type,
            occupied: false,
        }).sort({
            floorNumber: 1,
            spotNumber: 1,
        });
    }
    async findAvailableByTypeOnActiveFloors(type) {
        const activeFloors = await FloorSchema_1.FloorModel.find({
            isActive: true,
        }).sort({
            floorNumber: 1,
        });
        const activeFloorNumbers = activeFloors.map((floor) => floor.floorNumber);
        return ParkingSpotSchema_1.ParkingSpotModel.find({
            type,
            occupied: false,
            floorNumber: {
                $in: activeFloorNumbers,
            },
        }).sort({
            floorNumber: 1,
            spotNumber: 1,
        });
    }
    async findNearestAvailableByTypesOnActiveFloors(types) {
        const activeFloors = await FloorSchema_1.FloorModel.find({
            isActive: true,
        }).sort({
            floorNumber: 1,
        });
        const activeFloorNumbers = activeFloors.map((floor) => floor.floorNumber);
        return ParkingSpotSchema_1.ParkingSpotModel.findOne({
            type: {
                $in: types,
            },
            occupied: false,
            floorNumber: {
                $in: activeFloorNumbers,
            },
        }).sort({
            floorNumber: 1,
            spotNumber: 1,
        });
    }
    async reserveNearestAvailableByTypesOnActiveFloors(types) {
        const activeFloors = await FloorSchema_1.FloorModel.find({
            isActive: true,
        }).sort({
            floorNumber: 1,
        });
        const activeFloorNumbers = activeFloors.map((floor) => floor.floorNumber);
        return ParkingSpotSchema_1.ParkingSpotModel.findOneAndUpdate({
            type: {
                $in: types,
            },
            occupied: false,
            floorNumber: {
                $in: activeFloorNumbers,
            },
        }, {
            occupied: true,
        }, {
            new: true,
            sort: {
                floorNumber: 1,
                spotNumber: 1,
            },
        });
    }
    async findByFloorNumbers(floorNumbers) {
        return ParkingSpotSchema_1.ParkingSpotModel.find({
            floorNumber: {
                $in: floorNumbers,
            },
        }).sort({
            floorNumber: 1,
            spotNumber: 1,
        });
    }
    async create(data) {
        return ParkingSpotSchema_1.ParkingSpotModel.create(data);
    }
    async update(id, data) {
        return ParkingSpotSchema_1.ParkingSpotModel.findByIdAndUpdate(id, data, {
            returnDocument: "after",
        });
    }
    async hasOccupiedSpotsOnFloor(floorNumber) {
        const spot = await ParkingSpotSchema_1.ParkingSpotModel.findOne({
            floorNumber,
            occupied: true,
        });
        return !!spot;
    }
}
exports.MongoParkingSpotRepository = MongoParkingSpotRepository;
