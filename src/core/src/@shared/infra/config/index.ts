import { config as readEnv } from "dotenv";
import { join } from "path";

type Config = {
  db: {
    vendor: any;
    host: string;
    logging: boolean;
  };
};

function makeConfig(envFile): Config {
  const output = readEnv({ path: envFile });

  return {
    db: {
      vendor:
        (output.parsed?.DB_VENDOR as any) ||
        (process.env.NODE_ENV == "test" ? "sqlite" : null),
      host:
        output.parsed?.DB_HOST ||
        (process.env.NODE_ENV == "test" ? ":memory:" : null),
      logging:
        output.parsed?.DB_LOGGING === "true" ||
        (process.env.NODE_ENV == "test" ? false : null),
    },
  };
}

console.log(process.env.NODE_ENV);

const envTestingFile = join(__dirname, "../../../../.env.test");
export const configTest = makeConfig(envTestingFile);
