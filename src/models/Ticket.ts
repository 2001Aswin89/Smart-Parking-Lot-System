export class Ticket {
    constructor(
        private readonly id: string,
        private readonly vehicleNumber: string,
        private readonly spotId: string,
        private readonly entryTime: Date,
    ) { }

    getId(): string {
        return this.id;
    }

    getVehicleNumber(): string {
        return this.vehicleNumber;
    }

    getSpotId(): string {
        return this.spotId;
    }

    getEntryTime(): Date {
        return this.entryTime;
    }
}