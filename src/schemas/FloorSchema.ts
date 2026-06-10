import {
    Schema,
    model,
} from "mongoose";

import { FloorDocument } from "../types/FloorDocument";

const floorSchema =
    new Schema<FloorDocument>(
        {
            floorNumber: {
                type: Number,
                required: true,
                unique: true,
            },
            isActive: {
                type: Boolean,
                default: true,
            },
        },
        {
            timestamps: true,
        }
    );

export const FloorModel =
    model<FloorDocument>(
        "Floor",
        floorSchema,
    );