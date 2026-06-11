import mongoose, { Schema } from "mongoose";
<<<<<<< HEAD

import { SpotType } from "../enums/SpotType";
import { ParkingSpotDocument } from "../types/ParkingSpotDocument";

=======
import { SpotType } from "../enums/SpotType";
import { ParkingSpotDocument } from "../types/ParkingSpotDocument";


>>>>>>> origin/development
const ParkingSpotSchema = new Schema(
    {
        spotNumber: {
            type: String,
            required: true,
            unique: true,
        },

        floorNumber: {
            type: Number,
            required: true,
        },

        type: {
            type: String,
            enum: Object.values(SpotType),
            required: true,
        },

        occupied: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

ParkingSpotSchema.index({
    floorNumber: 1,
    spotNumber: 1,
});

ParkingSpotSchema.index({
    floorNumber: 1,
    type: 1,
    occupied: 1,
});

export const ParkingSpotModel =
    mongoose.model<ParkingSpotDocument>(
        "ParkingSpot",
        ParkingSpotSchema,
    );