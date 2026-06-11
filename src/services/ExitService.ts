import { TicketStatus } from "../enums/TicketStatus";

import { ITicketRepository } from "../interfaces/repositories/ITicketRepository";

import { IParkingSpotRepository } from "../interfaces/repositories/IParkingSpotRepository";

import { IPricingStrategy } from "../interfaces/pricing/IPricingStrategy";

import { TicketDocument } from "../types/TicketDocument";

import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";

export class ExitService {

    constructor(
        private readonly ticketRepository:
            ITicketRepository,

        private readonly parkingSpotRepository:
            IParkingSpotRepository,

        private readonly pricingStrategy:
            IPricingStrategy,
    ) { }

    async exitVehicle(
        ticketId: string,
    ): Promise<TicketDocument> {

        if (!ticketId) {
            throw new BadRequestError(
                "Ticket id is required",
            );
        }

        const ticket =
            await this.ticketRepository.findById(
                ticketId,
            );

        if (!ticket) {
            throw new NotFoundError(
                "Ticket not found",
            );
        }

        if (
            ticket.status !==
            TicketStatus.ACTIVE
        ) {
            throw new BadRequestError(
                "Ticket already closed",
            );
        }

        const exitTime = new Date();

        const fee =
            this.pricingStrategy.calculateFee(
                ticket.entryTime,
                exitTime,
                ticket.vehicleType,
            );

        const updatedTicket =
            await this.ticketRepository.updateStatus(
                ticket._id.toString(),
                TicketStatus.ACTIVE,
                {
                    exitTime,
                    fee,
                    status:
                        TicketStatus.CLOSED,
                },
            );

        if (!updatedTicket) {
            throw new BadRequestError(
                "Ticket already closed",
            );
        }

        const releasedSpot =
            await this.parkingSpotRepository.update(
                ticket.spotId,
                {
                    occupied: false,
                },
            );

        if (!releasedSpot) {
            throw new NotFoundError(
                "Parking spot linked to ticket not found",
            );
        }

        return updatedTicket;
    }
}