import request from "supertest";

import app from "../src/app";

import { seedTestParkingData } from "./helpers/seedTestData";

import { FloorModel } from "../src/schemas/FloorSchema";

import { VehicleType } from "../src/enums/VehicleType";

describe("Floor API", () => {
    beforeEach(async () => {
        await seedTestParkingData();
    });

    it("should return all floors", async () => {
        const response =
            await request(app)
                .get("/api/floors");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(2);
    });

    it("should create a new floor", async () => {
        const response =
            await request(app)
                .post("/api/floors")
                .send({
                    floorNumber: 3,
                });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.floorNumber).toBe(3);
        expect(response.body.data.isActive).toBe(true);
    });

    it("should reject duplicate floor creation", async () => {
        const response =
            await request(app)
                .post("/api/floors")
                .send({
                    floorNumber: 1,
                });

        expect(response.status).toBe(409);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Floor already exists");
    });

    it("should close a floor when there are no occupied spots", async () => {
        const response =
            await request(app)
                .patch("/api/floors/1/close");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.isActive).toBe(false);

        const floor =
            await FloorModel.findOne({
                floorNumber: 1,
            });

        expect(floor?.isActive).toBe(false);
    });

    it("should open a closed floor", async () => {
        await request(app)
            .patch("/api/floors/1/close");

        const response =
            await request(app)
                .patch("/api/floors/1/open");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.isActive).toBe(true);

        const floor =
            await FloorModel.findOne({
                floorNumber: 1,
            });

        expect(floor?.isActive).toBe(true);
    });

    it("should not close a floor if it has occupied spots", async () => {
        await request(app)
            .post("/api/parking/park")
            .send({
                vehicleNumber: "KL08AB1234",
                vehicleType: VehicleType.CAR,
            });

        const response =
            await request(app)
                .patch("/api/floors/1/close");

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe(
            "Cannot close floor. Vehicles are still parked on this floor.",
        );

        const floor =
            await FloorModel.findOne({
                floorNumber: 1,
            });

        expect(floor?.isActive).toBe(true);
    });

    it("should reject invalid floor number parameter", async () => {
        const response =
            await request(app)
                .patch("/api/floors/abc/close");

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it("should return 404 when closing a non-existing floor", async () => {
        const response =
            await request(app)
                .patch("/api/floors/99/close");

        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Floor not found");
    });
});