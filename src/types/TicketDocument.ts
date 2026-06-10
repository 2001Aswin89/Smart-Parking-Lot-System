import { Document } from "mongoose";

import { VehicleType } from "../enums/VehicleType";
import { TicketStatus } from "../enums/TicketStatus";

export interface TicketDocument extends Document {
    vehicleNumber: string;
    vehicleType: VehicleType;

    spotId: string;

    entryTime: Date;
    exitTime?: Date;

    fee: number;

    status: TicketStatus;

    createdAt: Date;
    updatedAt: Date;
}