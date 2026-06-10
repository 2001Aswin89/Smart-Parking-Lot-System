import mongoose, { Schema } from "mongoose";
import { SpotType } from "../enums/SpotType";
import { ParkingSpotDocument } from "../types/ParkingSpotDocument";


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
export const ParkingSpotModel =
    mongoose.model<ParkingSpotDocument>(
        "ParkingSpot",
        ParkingSpotSchema
    );