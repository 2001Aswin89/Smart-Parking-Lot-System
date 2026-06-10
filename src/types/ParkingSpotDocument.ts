import { Document } from "mongoose";
import { SpotType } from "../enums/SpotType";

export interface ParkingSpotDocument extends Document {
    spotNumber: string;
    floorNumber: number;
    type: SpotType;
    occupied: boolean;

    createdAt: Date;
    updatedAt: Date;
}