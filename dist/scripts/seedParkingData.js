"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = require("../database/connection");
const FloorSchema_1 = require("../schemas/FloorSchema");
const ParkingSpotSchema_1 = require("../schemas/ParkingSpotSchema");
const SpotType_1 = require("../enums/SpotType");
const seedConfig = [
    {
        floorNumber: 1,
        small: 5,
        medium: 10,
        large: 2,
    },
    {
        floorNumber: 2,
        small: 5,
        medium: 10,
        large: 2,
    },
    {
        floorNumber: 3,
        small: 2,
        medium: 5,
        large: 5,
    },
];
const createSpotNumber = (floorNumber, type, index) => {
    const prefixMap = {
        [SpotType_1.SpotType.SMALL]: "S",
        [SpotType_1.SpotType.MEDIUM]: "M",
        [SpotType_1.SpotType.LARGE]: "L",
    };
    return `F${floorNumber}-${prefixMap[type]}${String(index).padStart(2, "0")}`;
};
const seedFloors = async () => {
    for (const config of seedConfig) {
        await FloorSchema_1.FloorModel.updateOne({
            floorNumber: config.floorNumber,
        }, {
            $setOnInsert: {
                floorNumber: config.floorNumber,
                isActive: true,
            },
        }, {
            upsert: true,
        });
    }
};
const seedSpotsForFloor = async (floorNumber, type, count) => {
    for (let index = 1; index <= count; index += 1) {
        const spotNumber = createSpotNumber(floorNumber, type, index);
        await ParkingSpotSchema_1.ParkingSpotModel.updateOne({
            spotNumber,
        }, {
            $setOnInsert: {
                spotNumber,
                floorNumber,
                type,
                occupied: false,
            },
        }, {
            upsert: true,
        });
    }
};
const seedParkingData = async () => {
    await (0, connection_1.connectDB)();
    await seedFloors();
    for (const config of seedConfig) {
        await seedSpotsForFloor(config.floorNumber, SpotType_1.SpotType.SMALL, config.small);
        await seedSpotsForFloor(config.floorNumber, SpotType_1.SpotType.MEDIUM, config.medium);
        await seedSpotsForFloor(config.floorNumber, SpotType_1.SpotType.LARGE, config.large);
    }
    console.log("Parking floors and spots seeded successfully");
    await mongoose_1.default.connection.close();
};
seedParkingData()
    .catch(async (error) => {
    console.error("Failed to seed parking data", error);
    await mongoose_1.default.connection.close();
    process.exit(1);
});
