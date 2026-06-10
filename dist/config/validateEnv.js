"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = validateEnv;
const env_1 = require("./env");
function validateEnv() {
    if (!env_1.env.mongoUri) {
        throw new Error("MONGODB_URI environment variable is missing");
    }
}
