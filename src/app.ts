import express from "express";

import healthRoutes from "./routes/health.routes";

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

app.use(notFoundHandler);
app.use(errorHandler);

export default app;