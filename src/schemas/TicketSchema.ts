import mongoose, { Schema } from "mongoose";

import { VehicleType } from "../enums/VehicleType";
import { TicketStatus } from "../enums/TicketStatus";

const TicketSchema = new Schema(
    {
        vehicleNumber: {
            type: String,
            required: true,
        },

        vehicleType: {
            type: String,
            enum: Object.values(VehicleType),
            required: true,
        },

        spotId: {
            type: String,
            required: true,
        },

        entryTime: {
            type: Date,
            required: true,
        },

        exitTime: {
            type: Date,
            default: null,
        },

        fee: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: Object.values(TicketStatus),
            default: TicketStatus.ACTIVE,
        },
    },
    {
        timestamps: true,
    },
);

export const TicketModel =
    mongoose.model(
        "Ticket",
        TicketSchema,
    );