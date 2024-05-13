import mongoose from "mongoose";
import config from "config";
import Logger from "./logger";

async function connect() {
  const dbUri = config.get("dbUri") as string;

  try {
    await mongoose.connect(dbUri);
    Logger.info("Conectado ao banco de dados!");
  } catch (error) {
    Logger.error("Não foi possível conectar ao banco de dados!", error);
    process.exit(1);
  }
}

export default connect;
