import mongoose from "mongoose";

import { connectDB } from "../src/database/connection";

beforeAll(async () => {
    process.env.NODE_ENV = "test";

    await connectDB();
});

afterEach(async () => {
    const collections =
        mongoose.connection.collections;

    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});