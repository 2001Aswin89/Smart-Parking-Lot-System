import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./database/connection";
import { validateEnv } from "./config/validateEnv";

async function bootstrap() {
    validateEnv();

    await connectDB();

    app.listen(env.port, () => {
        console.log(
            `Server running on port ${env.port}`,
        );
    });
}

bootstrap();