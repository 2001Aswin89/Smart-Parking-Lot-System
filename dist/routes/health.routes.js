"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Parking API running",
    });
});
exports.default = router;
