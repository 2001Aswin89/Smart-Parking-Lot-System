"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./database/connection");
const MongoTicketRepository_1 = require("./repositories/MongoTicketRepository");
const MongoParkingSpotRepository_1 = require("./repositories/MongoParkingSpotRepository");
const HourlyPricingStrategy_1 = require("./pricing/HourlyPricingStrategy");
const ExitService_1 = require("./services/ExitService");
async function main() {
    await (0, connection_1.connectDB)();
    const ticketRepository = new MongoTicketRepository_1.MongoTicketRepository();
    const parkingSpotRepository = new MongoParkingSpotRepository_1.MongoParkingSpotRepository();
    const pricingStrategy = new HourlyPricingStrategy_1.HourlyPricingStrategy();
    const exitService = new ExitService_1.ExitService(ticketRepository, parkingSpotRepository, pricingStrategy);
    const ticketId = "6a299c0db0776820b3e917dd";
    const result = await exitService.exitVehicle(ticketId);
    console.log(result);
}
main();
