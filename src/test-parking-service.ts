import mongoose from "mongoose";
import { connectDB } from "./database/connection";


import { env } from "./config/env";

import { VehicleType } from "./enums/VehicleType";

import { MongoParkingSpotRepository }
    from "./repositories/MongoParkingSpotRepository";

import { MongoTicketRepository }
    from "./repositories/MongoTicketRepository";

import { NearestSpotAllocator }
    from "./allocators/NearestSpotAllocator";

import { ParkingService }
    from "./services/ParkingService";

async function main() {

    // await mongoose.connect(
    //     env.MONGODB_URI,
    // );  
    await connectDB();
    const spotRepository =
        new MongoParkingSpotRepository();

    const ticketRepository =
        new MongoTicketRepository();

    const allocator =
        new NearestSpotAllocator(
            spotRepository,
        );

    const parkingService =
        new ParkingService(
            allocator,
            spotRepository,
            ticketRepository,
        );

    const ticket =
        await parkingService.parkVehicle(
            "KL-07-AB-1234",
            VehicleType.CAR,
        );

    console.log(ticket);

    await mongoose.disconnect();
}

main();