import { TicketStatus }
    from "../enums/TicketStatus";

import { ITicketRepository }
    from "../interfaces/repositories/ITicketRepository";

import { IParkingSpotRepository }
    from "../interfaces/repositories/IParkingSpotRepository";

import { IPricingStrategy }
    from "../interfaces/pricing/IPricingStrategy";

import { TicketDocument }
    from "../types/TicketDocument";

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

        const ticket =
            await this.ticketRepository.findById(
                ticketId,
            );

        if (!ticket) {
            throw new Error(
                "Ticket not found",
            );
        }

        if (
            ticket.status !==
            TicketStatus.ACTIVE
        ) {
            throw new Error(
                "Ticket already closed",
            );
        }

        const exitTime = new Date();

        const fee =
            this.pricingStrategy.calculateFee(
                ticket.entryTime,
                exitTime,
            );

        const updatedTicket =
            await this.ticketRepository.update(
                ticket._id.toString(),
                {
                    exitTime,
                    fee,
                    status:
                        TicketStatus.CLOSED,
                },
            );

        await this.parkingSpotRepository.update(
            ticket.spotId,
            {
                occupied: false,
            },
        );

        if (!updatedTicket) {
            throw new Error(
                "Failed to update ticket",
            );
        }

        return updatedTicket;
    }
}