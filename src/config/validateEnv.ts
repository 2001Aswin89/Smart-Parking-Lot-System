import { env } from "./env";

export function validateEnv(): void {
    if (!env.mongoUri) {
        throw new Error(
            "MONGODB_URI environment variable is missing",
        );
    }
}