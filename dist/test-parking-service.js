"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = require("./database/connection");
const VehicleType_1 = require("./enums/VehicleType");
const MongoParkingSpotRepository_1 = require("./repositories/MongoParkingSpotRepository");
const MongoTicketRepository_1 = require("./repositories/MongoTicketRepository");
const NearestSpotAllocator_1 = require("./allocators/NearestSpotAllocator");
const ParkingService_1 = require("./services/ParkingService");
async function main() {
    // await mongoose.connect(
    //     env.MONGODB_URI,
    // );  
    await (0, connection_1.connectDB)();
    const spotRepository = new MongoParkingSpotRepository_1.MongoParkingSpotRepository();
    const ticketRepository = new MongoTicketRepository_1.MongoTicketRepository();
    const allocator = new NearestSpotAllocator_1.NearestSpotAllocator(spotRepository);
    const parkingService = new ParkingService_1.ParkingService(allocator, spotRepository, ticketRepository);
    const ticket = await parkingService.parkVehicle("KL-07-AB-1234", VehicleType_1.VehicleType.CAR);
    console.log(ticket);
    await mongoose_1.default.disconnect();
}
main();
