import request from "supertest";

import app from "../src/app";

import { seedTestParkingData } from "./helpers/seedTestData";

import { VehicleType } from "../src/enums/VehicleType";

describe("Availability API", () => {
    beforeEach(async () => {
        await seedTestParkingData();
    });

    it("should return availability grouped by floor", async () => {
        const response =
            await request(app)
                .get("/api/availability");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);

        expect(response.body.data[0]).toMatchObject({
            floorNumber: 1,
            isActive: true,
            totalSpots: 3,
            availableSpots: 3,
            occupiedSpots: 0,
        });
    });

    it("should update availability after parking a vehicle", async () => {
        await request(app)
            .post("/api/parking/park")
            .send({
                vehicleNumber: "KL08AB1234",
                vehicleType: VehicleType.CAR,
            });

        const response =
            await request(app)
                .get("/api/availability");

        const floorOne =
            response.body.data.find(
                (floor: { floorNumber: number }) =>
                    floor.floorNumber === 1,
            );

        expect(floorOne.totalSpots).toBe(3);
        expect(floorOne.availableSpots).toBe(2);
        expect(floorOne.occupiedSpots).toBe(1);
    });
});