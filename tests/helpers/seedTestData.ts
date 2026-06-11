import { FloorModel } from "../../src/schemas/FloorSchema";
import { ParkingSpotModel } from "../../src/schemas/ParkingSpotSchema";

import { SpotType } from "../../src/enums/SpotType";

export const seedTestParkingData = async () => {
    await FloorModel.create([
        {
            floorNumber: 1,
            isActive: true,
        },
        {
            floorNumber: 2,
            isActive: true,
        },
    ]);

    await ParkingSpotModel.create([
        {
            spotNumber: "F1-S01",
            floorNumber: 1,
            type: SpotType.SMALL,
            occupied: false,
        },
        {
            spotNumber: "F1-M01",
            floorNumber: 1,
            type: SpotType.MEDIUM,
            occupied: false,
        },
        {
            spotNumber: "F1-L01",
            floorNumber: 1,
            type: SpotType.LARGE,
            occupied: false,
        },
        {
            spotNumber: "F2-M01",
            floorNumber: 2,
            type: SpotType.MEDIUM,
            occupied: false,
        },
    ]);
};