import { connectDB }
    from "./database/connection";

import { MongoTicketRepository }
    from "./repositories/MongoTicketRepository";

import { MongoParkingSpotRepository }
    from "./repositories/MongoParkingSpotRepository";

import { HourlyPricingStrategy }
    from "./pricing/HourlyPricingStrategy";

import { ExitService }
    from "./services/ExitService";

async function main() {

    await connectDB();

    const ticketRepository =
        new MongoTicketRepository();

    const parkingSpotRepository =
        new MongoParkingSpotRepository();

    const pricingStrategy =
        new HourlyPricingStrategy();

    const exitService =
        new ExitService(
            ticketRepository,
            parkingSpotRepository,
            pricingStrategy,
        );

    const ticketId =
        "6a299c0db0776820b3e917dd";

    const result =
        await exitService.exitVehicle(
            ticketId,
        );

    console.log(result);
}

main();