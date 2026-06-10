import express from "express";

import healthRoutes from "./routes/health.routes";
import parkingRoutes from "./routes/parking.routes";
import spotRoutes from "./routes/spot.routes";
import floorRoutes from "./routes/floor.routes";

import { notFoundHandler } from "./middleware/notFoundHandler";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.get("/", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Smart Parking Lot API",
    });
});
app.use("/health", healthRoutes);
app.use(
    "/api/parking",
    parkingRoutes,
);

app.use(
    "/api/spots",
    spotRoutes,
);
app.use(
    "/api/floors",
    floorRoutes,
);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;