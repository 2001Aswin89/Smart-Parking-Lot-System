"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const connection_1 = require("./database/connection");
const validateEnv_1 = require("./config/validateEnv");
async function bootstrap() {
    (0, validateEnv_1.validateEnv)();
    await (0, connection_1.connectDB)();
    app_1.default.listen(env_1.env.port, () => {
        console.log(`Server running on port ${env_1.env.port}`);
    });
}
bootstrap();
