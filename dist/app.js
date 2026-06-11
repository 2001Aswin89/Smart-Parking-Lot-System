"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
<<<<<<< HEAD
const parking_routes_1 = __importDefault(require("./routes/parking.routes"));
const spot_routes_1 = __importDefault(require("./routes/spot.routes"));
const floor_routes_1 = __importDefault(require("./routes/floor.routes"));
=======
>>>>>>> origin/development
const notFoundHandler_1 = require("./middleware/notFoundHandler");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Smart Parking Lot API",
    });
});
app.use("/health", health_routes_1.default);
<<<<<<< HEAD
app.use("/api/parking", parking_routes_1.default);
app.use("/api/spots", spot_routes_1.default);
app.use("/api/floors", floor_routes_1.default);
=======
>>>>>>> origin/development
app.use(notFoundHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
exports.default = app;
