import { connectDB } from "./database/connection";

import { MongoParkingSpotRepository } from "./repositories/MongoParkingSpotRepository";

import { SpotType } from "./enums/SpotType";

async function run() {
    await connectDB();

    const repository =
        new MongoParkingSpotRepository();

    const spot = await repository.create({
        spotNumber: "A2",
        floorNumber: 1,
        type: SpotType.MEDIUM,
    });

    console.log(spot);

    process.exit(0);
}

run();