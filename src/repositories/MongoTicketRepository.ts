import { TicketModel } from "../schemas/TicketSchema";

import { ITicketRepository } from "../interfaces/repositories/ITicketRepository";

import { TicketDocument } from "../types/TicketDocument";
import { TicketStatus } from "../enums/TicketStatus";

export class MongoTicketRepository
    implements ITicketRepository {

    async findAll(): Promise<TicketDocument[]> {
        return TicketModel.find()
            .sort({
                createdAt: -1,
            });
    }

    async findById(
        id: string,
    ): Promise<TicketDocument | null> {
        return TicketModel.findById(id);
    }

    async findActiveByVehicleNumber(
        vehicleNumber: string,
    ): Promise<TicketDocument | null> {
        return TicketModel.findOne({
            vehicleNumber,
            status: TicketStatus.ACTIVE,
        });
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
            {
                returnDocument: "after",
            },
        );
    }

    async updateStatus(
        id: string,
        currentStatus: TicketStatus,
        data: Partial<TicketDocument>,
    ): Promise<TicketDocument | null> {
        return TicketModel.findOneAndUpdate(
            {
                _id: id,
                status: currentStatus,
            },
            data,
            {
                returnDocument: "after",
            },
        );
    }
}