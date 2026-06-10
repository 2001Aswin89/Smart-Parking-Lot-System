import { TicketDocument } from "../../types/TicketDocument";

export interface ITicketRepository {
    findById(
        id: string,
    ): Promise<TicketDocument | null>;

    create(
        data: Partial<TicketDocument>,
    ): Promise<TicketDocument>;

    update(
        id: string,
        data: Partial<TicketDocument>,
    ): Promise<TicketDocument | null>;
}