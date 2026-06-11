import { TicketDocument } from "../../types/TicketDocument";
import { TicketStatus } from "../../enums/TicketStatus";

export interface ITicketRepository {
    findAll(): Promise<TicketDocument[]>;

    findById(
        id: string,
    ): Promise<TicketDocument | null>;

    findActiveByVehicleNumber(
        vehicleNumber: string,
    ): Promise<TicketDocument | null>;

    create(
        data: Partial<TicketDocument>,
    ): Promise<TicketDocument>;

    update(
        id: string,
        data: Partial<TicketDocument>,
    ): Promise<TicketDocument | null>;

    updateStatus(
        id: string,
        currentStatus: TicketStatus,
        data: Partial<TicketDocument>,
    ): Promise<TicketDocument | null>;
}