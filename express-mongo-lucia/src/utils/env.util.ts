import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { logger } from "./logger.util";

// load env vars
function findEnvFile(dir: string, depth: number = 0): string | null {
  const envFilePath = path.join(dir, ".env");
  if (fs.existsSync(envFilePath)) {
    return envFilePath;
  }
  if (depth < 2) {
    const parentDir = path.resolve(dir, "..");
    if (parentDir !== dir) {
      return findEnvFile(parentDir, depth + 1);
    }
  }
  return null;
}

const envFile = findEnvFile(__dirname);

if (envFile) {
  dotenv.config({ path: envFile });
  logger.info(`Loaded .env file from: ${envFile}`);
} else {
  logger.error(
    "No .env file found in the current directory or any parent directories."
  );
}

export const EnvConfigSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.string().min(1),

  DB_URL: z.string().min(1),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
});

export const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  DB_URL: process.env.DB_URL,

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
};

type EnvConfigInput = z.input<typeof EnvConfigSchema>;
type EnvConfigOutput = z.infer<typeof EnvConfigSchema>;
type EnvConfigSafeParseReturn = z.SafeParseReturnType<
  EnvConfigInput,
  EnvConfigOutput
>;

let env = process.env as EnvConfigOutput;

const parsed = EnvConfigSchema.safeParse(
  processEnv
) as EnvConfigSafeParseReturn;

if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

env = parsed.data as EnvConfigOutput;

export { env };
