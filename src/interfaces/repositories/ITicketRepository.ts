import { TicketDocument } from "../../types/TicketDocument";
<<<<<<< HEAD
import { TicketStatus } from "../../enums/TicketStatus";

export interface ITicketRepository {
    findAll(): Promise<TicketDocument[]>;

=======

export interface ITicketRepository {
>>>>>>> origin/development
    findById(
        id: string,
    ): Promise<TicketDocument | null>;

<<<<<<< HEAD
    findActiveByVehicleNumber(
        vehicleNumber: string,
    ): Promise<TicketDocument | null>;

=======
>>>>>>> origin/development
    create(
        data: Partial<TicketDocument>,
    ): Promise<TicketDocument>;

    update(
        id: string,
        data: Partial<TicketDocument>,
    ): Promise<TicketDocument | null>;
<<<<<<< HEAD

    updateStatus(
        id: string,
        currentStatus: TicketStatus,
        data: Partial<TicketDocument>,
    ): Promise<TicketDocument | null>;
=======
>>>>>>> origin/development
}