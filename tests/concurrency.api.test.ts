import request from "supertest";

import app from "../src/app";

import { FloorModel } from "../src/schemas/FloorSchema";
import { ParkingSpotModel } from "../src/schemas/ParkingSpotSchema";
import { TicketModel } from "../src/schemas/TicketSchema";

import { SpotType } from "../src/enums/SpotType";
import { VehicleType } from "../src/enums/VehicleType";
import { TicketStatus } from "../src/enums/TicketStatus";

describe("Concurrency API", () => {
    beforeEach(async () => {
        await FloorModel.create({
            floorNumber: 1,
            isActive: true,
        });

        await ParkingSpotModel.create({
            spotNumber: "F1-M01",
            floorNumber: 1,
            type: SpotType.MEDIUM,
            occupied: false,
        });
    });

    it("should not allocate the same spot to multiple vehicles during concurrent parking", async () => {
        const requests =
            await Promise.allSettled([
                request(app)
                    .post("/api/parking/park")
                    .send({
                        vehicleNumber: "KL08AA1111",
                        vehicleType: VehicleType.CAR,
                    }),

                request(app)
                    .post("/api/parking/park")
                    .send({
                        vehicleNumber: "KL08BB2222",
                        vehicleType: VehicleType.CAR,
                    }),

                request(app)
                    .post("/api/parking/park")
                    .send({
                        vehicleNumber: "KL08CC3333",
                        vehicleType: VehicleType.CAR,
                    }),
            ]);

        const responses =
            requests
                .filter(
                    (
                        result,
                    ): result is PromiseFulfilledResult<request.Response> =>
                        result.status === "fulfilled",
                )
                .map(
                    (result) => result.value,
                );

        const successfulResponses =
            responses.filter(
                (response) => response.status === 201,
            );

        const failedResponses =
            responses.filter(
                (response) => response.status === 400,
            );

        expect(successfulResponses.length).toBe(1);
        expect(failedResponses.length).toBe(2);

        const tickets =
            await TicketModel.find({
                status: TicketStatus.ACTIVE,
            });

        expect(tickets.length).toBe(1);

        const occupiedSpots =
            await ParkingSpotModel.find({
                occupied: true,
            });

        expect(occupiedSpots.length).toBe(1);

        expect(
            occupiedSpots[0].spotNumber,
        ).toBe("F1-M01");

        expect(
            tickets[0].spotId,
        ).toBe(
            occupiedSpots[0]._id.toString(),
        );
    });

    it("should allocate different spots to concurrent vehicles when enough spots are available", async () => {
        await ParkingSpotModel.create([
            {
                spotNumber: "F1-M02",
                floorNumber: 1,
                type: SpotType.MEDIUM,
                occupied: false,
            },
            {
                spotNumber: "F1-M03",
                floorNumber: 1,
                type: SpotType.MEDIUM,
                occupied: false,
            },
        ]);

        const responses =
            await Promise.all([
                request(app)
                    .post("/api/parking/park")
                    .send({
                        vehicleNumber: "KL08AA1111",
                        vehicleType: VehicleType.CAR,
                    }),

                request(app)
                    .post("/api/parking/park")
                    .send({
                        vehicleNumber: "KL08BB2222",
                        vehicleType: VehicleType.CAR,
                    }),

                request(app)
                    .post("/api/parking/park")
                    .send({
                        vehicleNumber: "KL08CC3333",
                        vehicleType: VehicleType.CAR,
                    }),
            ]);

        const successfulResponses =
            responses.filter(
                (response) => response.status === 201,
            );

        expect(successfulResponses.length).toBe(3);

        const spotIds =
            successfulResponses.map(
                (response) => response.body.data.spotId,
            );

        const uniqueSpotIds =
            new Set(spotIds);

        expect(uniqueSpotIds.size).toBe(3);

        const occupiedSpots =
            await ParkingSpotModel.find({
                occupied: true,
            });

        expect(occupiedSpots.length).toBe(3);
    });
});