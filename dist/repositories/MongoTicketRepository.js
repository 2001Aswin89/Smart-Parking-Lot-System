"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoTicketRepository = void 0;
const TicketSchema_1 = require("../schemas/TicketSchema");
class MongoTicketRepository {
    async findById(id) {
        return TicketSchema_1.TicketModel.findById(id);
    }
    async create(data) {
        return TicketSchema_1.TicketModel.create(data);
    }
    async update(id, data) {
        return TicketSchema_1.TicketModel.findByIdAndUpdate(id, data, { new: true });
    }
}
exports.MongoTicketRepository = MongoTicketRepository;
