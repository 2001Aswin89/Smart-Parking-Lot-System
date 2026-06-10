import { TicketModel } from "../schemas/TicketSchema";

import { ITicketRepository } from "../interfaces/repositories/ITicketRepository";

import { TicketDocument } from "../types/TicketDocument";

export class MongoTicketRepository
    implements ITicketRepository {
    async findById(
        id: string,
    ): Promise<TicketDocument | null> {
        return TicketModel.findById(id);
    }

    async create(
        data: Partial<TicketDocument>,
    ): Promise<TicketDocument> {
        return TicketModel.create(data);
    }

    async update(
        id: string,
        data: Partial<TicketDocument>,
    ): Promise<TicketDocument | null> {
        return TicketModel.findByIdAndUpdate(
            id,
            data,
            { new: true },
        );
    }
}