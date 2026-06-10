"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./database/connection");
const MongoParkingSpotRepository_1 = require("./repositories/MongoParkingSpotRepository");
const SpotType_1 = require("./enums/SpotType");
async function run() {
    await (0, connection_1.connectDB)();
    const repository = new MongoParkingSpotRepository_1.MongoParkingSpotRepository();
    const spot = await repository.create({
        spotNumber: "A2",
        floorNumber: 1,
        type: SpotType_1.SpotType.MEDIUM,
    });
    console.log(spot);
    process.exit(0);
}
run();
