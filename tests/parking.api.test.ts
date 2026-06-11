import request from "supertest";

import app from "../src/app";

import { seedTestParkingData } from "./helpers/seedTestData";

import { ParkingSpotModel } from "../src/schemas/ParkingSpotSchema";
import { TicketModel } from "../src/schemas/TicketSchema";

import { VehicleType } from "../src/enums/VehicleType";
import { TicketStatus } from "../src/enums/TicketStatus";

describe("Parking API", () => {
    beforeEach(async () => {
        await seedTestParkingData();
    });

    it("should park a vehicle and create an active ticket", async () => {
        const response =
            await request(app)
                .post("/api/parking/park")
                .send({
                    vehicleNumber: "KL08AB1234",
                    vehicleType: VehicleType.CAR,
                });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.vehicleNumber).toBe("KL08AB1234");
        expect(response.body.data.vehicleType).toBe(VehicleType.CAR);
        expect(response.body.data.status).toBe(TicketStatus.ACTIVE);

        const occupiedSpot =
            await ParkingSpotModel.findById(
                response.body.data.spotId,
            );

        expect(occupiedSpot).not.toBeNull();
        expect(occupiedSpot?.occupied).toBe(true);
    });

    it("should reject duplicate active ticket for same vehicle", async () => {
        await request(app)
            .post("/api/parking/park")
            .send({
                vehicleNumber: "KL08AB1234",
                vehicleType: VehicleType.CAR,
            });

        const response =
            await request(app)
                .post("/api/parking/park")
                .send({
                    vehicleNumber: "KL08AB1234",
                    vehicleType: VehicleType.CAR,
                });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it("should exit a vehicle, close ticket, and free the spot", async () => {
        const parkResponse =
            await request(app)
                .post("/api/parking/park")
                .send({
                    vehicleNumber: "KL08AB1234",
                    vehicleType: VehicleType.CAR,
                });

        const ticketId =
            parkResponse.body.data._id;

        const spotId =
            parkResponse.body.data.spotId;

        const exitResponse =
            await request(app)
                .post(`/api/parking/exit/${ticketId}`);

        expect(exitResponse.status).toBe(200);
        expect(exitResponse.body.success).toBe(true);
        expect(exitResponse.body.data.status).toBe(TicketStatus.CLOSED);
        expect(exitResponse.body.data.fee).toBeGreaterThan(0);

        const releasedSpot =
            await ParkingSpotModel.findById(spotId);

        expect(releasedSpot?.occupied).toBe(false);
    });

    it("should reject parking request with invalid vehicle type", async () => {
        const response =
            await request(app)
                .post("/api/parking/park")
                .send({
                    vehicleNumber: "KL08AB1234",
                    vehicleType: "TRUCK",
                });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it("should reject exit request with invalid ticket id", async () => {
        const response =
            await request(app)
                .post("/api/parking/exit/invalid-ticket-id");

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it("should not allow exiting the same ticket twice", async () => {
        const parkResponse =
            await request(app)
                .post("/api/parking/park")
                .send({
                    vehicleNumber: "KL08AB1234",
                    vehicleType: VehicleType.CAR,
                });

        const ticketId =
            parkResponse.body.data._id;

        await request(app)
            .post(`/api/parking/exit/${ticketId}`);

        const secondExitResponse =
            await request(app)
                .post(`/api/parking/exit/${ticketId}`);

        expect(secondExitResponse.status).toBe(400);
        expect(secondExitResponse.body.success).toBe(false);

        const ticket =
            await TicketModel.findById(ticketId);

        expect(ticket?.status).toBe(TicketStatus.CLOSED);
    });
});