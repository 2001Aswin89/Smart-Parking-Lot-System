import { Document } from "mongoose";

export interface FloorDocument
    extends Document {
    floorNumber: number;
    isActive: boolean;
}