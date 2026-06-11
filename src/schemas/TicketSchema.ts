import mongoose, { Schema } from "mongoose";

import { VehicleType } from "../enums/VehicleType";
import { TicketStatus } from "../enums/TicketStatus";
import { TicketDocument } from "../types/TicketDocument";

const TicketSchema = new Schema(
    {
        vehicleNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
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

TicketSchema.index(
    {
        vehicleNumber: 1,
        status: 1,
    },
    {
        unique: true,
        partialFilterExpression: {
            status: TicketStatus.ACTIVE,
        },
    },
);

TicketSchema.index({
    spotId: 1,
    status: 1,
});

export const TicketModel =
    mongoose.model<TicketDocument>(
        "Ticket",
        TicketSchema,
    );
