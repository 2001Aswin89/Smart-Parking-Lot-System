"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitService = void 0;
const TicketStatus_1 = require("../enums/TicketStatus");
const BadRequestError_1 = require("../errors/BadRequestError");
const NotFoundError_1 = require("../errors/NotFoundError");
class ExitService {
    ticketRepository;
    parkingSpotRepository;
    pricingStrategy;
    constructor(ticketRepository, parkingSpotRepository, pricingStrategy) {
        this.ticketRepository = ticketRepository;
        this.parkingSpotRepository = parkingSpotRepository;
        this.pricingStrategy = pricingStrategy;
    }
    async exitVehicle(ticketId) {
        if (!ticketId) {
            throw new BadRequestError_1.BadRequestError("Ticket id is required");
        }
        const ticket = await this.ticketRepository.findById(ticketId);
        if (!ticket) {
            throw new NotFoundError_1.NotFoundError("Ticket not found");
        }
        if (ticket.status !==
            TicketStatus_1.TicketStatus.ACTIVE) {
            throw new BadRequestError_1.BadRequestError("Ticket already closed");
        }
        const exitTime = new Date();
        const fee = this.pricingStrategy.calculateFee(ticket.entryTime, exitTime, ticket.vehicleType);
        const updatedTicket = await this.ticketRepository.updateStatus(ticket._id.toString(), TicketStatus_1.TicketStatus.ACTIVE, {
            exitTime,
            fee,
            status: TicketStatus_1.TicketStatus.CLOSED,
        });
        if (!updatedTicket) {
            throw new BadRequestError_1.BadRequestError("Ticket already closed");
        }
        const releasedSpot = await this.parkingSpotRepository.update(ticket.spotId, {
            occupied: false,
        });
        if (!releasedSpot) {
            throw new NotFoundError_1.NotFoundError("Parking spot linked to ticket not found");
        }
        return updatedTicket;
    }
}
exports.ExitService = ExitService;
