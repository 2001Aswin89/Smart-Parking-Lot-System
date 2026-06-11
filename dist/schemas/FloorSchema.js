"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorModel = void 0;
const mongoose_1 = require("mongoose");
const floorSchema = new mongoose_1.Schema({
    floorNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.FloorModel = (0, mongoose_1.model)("Floor", floorSchema);
