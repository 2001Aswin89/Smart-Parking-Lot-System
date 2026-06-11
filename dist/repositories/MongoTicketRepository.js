"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoTicketRepository = void 0;
const TicketSchema_1 = require("../schemas/TicketSchema");
<<<<<<< HEAD
const TicketStatus_1 = require("../enums/TicketStatus");
class MongoTicketRepository {
    async findAll() {
        return TicketSchema_1.TicketModel.find()
            .sort({
            createdAt: -1,
        });
    }
    async findById(id) {
        return TicketSchema_1.TicketModel.findById(id);
    }
    async findActiveByVehicleNumber(vehicleNumber) {
        return TicketSchema_1.TicketModel.findOne({
            vehicleNumber,
            status: TicketStatus_1.TicketStatus.ACTIVE,
        });
    }
=======
class MongoTicketRepository {
    async findById(id) {
        return TicketSchema_1.TicketModel.findById(id);
    }
>>>>>>> origin/development
    async create(data) {
        return TicketSchema_1.TicketModel.create(data);
    }
    async update(id, data) {
<<<<<<< HEAD
        return TicketSchema_1.TicketModel.findByIdAndUpdate(id, data, {
            returnDocument: "after",
        });
    }
    async updateStatus(id, currentStatus, data) {
        return TicketSchema_1.TicketModel.findOneAndUpdate({
            _id: id,
            status: currentStatus,
        }, data, {
            returnDocument: "after",
        });
=======
        return TicketSchema_1.TicketModel.findByIdAndUpdate(id, data, { new: true });
>>>>>>> origin/development
    }
}
exports.MongoTicketRepository = MongoTicketRepository;
