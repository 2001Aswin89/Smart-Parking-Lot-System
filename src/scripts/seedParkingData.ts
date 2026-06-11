import mongoose from "mongoose";

import { connectDB } from "../database/connection";

import { FloorModel } from "../schemas/FloorSchema";
import { ParkingSpotModel } from "../schemas/ParkingSpotSchema";

import { SpotType } from "../enums/SpotType";

type SpotSeedConfig = {
    floorNumber: number;
    small: number;
    medium: number;
    large: number;
};

const seedConfig: SpotSeedConfig[] = [
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

const createSpotNumber = (
    floorNumber: number,
    type: SpotType,
    index: number,
): string => {
    const prefixMap: Record<SpotType, string> = {
        [SpotType.SMALL]: "S",
        [SpotType.MEDIUM]: "M",
        [SpotType.LARGE]: "L",
    };

    return `F${floorNumber}-${prefixMap[type]}${String(index).padStart(2, "0")}`;
};

const seedFloors = async () => {
    for (const config of seedConfig) {
        await FloorModel.updateOne(
            {
                floorNumber: config.floorNumber,
            },
            {
                $setOnInsert: {
                    floorNumber: config.floorNumber,
                    isActive: true,
                },
            },
            {
                upsert: true,
            },
        );
    }
};

const seedSpotsForFloor = async (
    floorNumber: number,
    type: SpotType,
    count: number,
) => {
    for (let index = 1; index <= count; index += 1) {
        const spotNumber =
            createSpotNumber(
                floorNumber,
                type,
                index,
            );

        await ParkingSpotModel.updateOne(
            {
                spotNumber,
            },
            {
                $setOnInsert: {
                    spotNumber,
                    floorNumber,
                    type,
                    occupied: false,
                },
            },
            {
                upsert: true,
            },
        );
    }
};

const seedParkingData = async () => {
    await connectDB();

    await seedFloors();

    for (const config of seedConfig) {
        await seedSpotsForFloor(
            config.floorNumber,
            SpotType.SMALL,
            config.small,
        );

        await seedSpotsForFloor(
            config.floorNumber,
            SpotType.MEDIUM,
            config.medium,
        );

        await seedSpotsForFloor(
            config.floorNumber,
            SpotType.LARGE,
            config.large,
        );
    }

    console.log(
        "Parking floors and spots seeded successfully",
    );

    await mongoose.connection.close();
};

seedParkingData()
    .catch(async (error) => {
        console.error(
            "Failed to seed parking data",
            error,
        );

        await mongoose.connection.close();

        process.exit(1);
    });