import dotenv from "dotenv";

const envFile =
    process.env.NODE_ENV === "test"
        ? ".env.test"
        : ".env";

dotenv.config({
    path: envFile,
});

export const env = {
    nodeEnv:
        process.env.NODE_ENV || "development",

    port:
        Number(process.env.PORT) || 3000,

    mongoUri:
        process.env.MONGODB_URI || "",
};