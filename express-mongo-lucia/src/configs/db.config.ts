import mongoose from "mongoose";
import { env } from "../utils/env.util";
import { logger } from "../utils/logger.util";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(env.DB_URL, {
      dbName: "express-api-mongo-lucia",
    });

    logger.info(`📡[Mongodb]: DB Connected host: ${conn.connection.host}`);
  } catch (error) {
    logger.error(error);
  }
};
