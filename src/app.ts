require("dotenv").config();

import express from "express";
import config from "config";

import db from "../config/db";
import morganMiddleware from "./middleware/morganMiddleware";
import router from "./routes";
import Logger from "../config/logger";

const app = express();

app.use(express.json());
app.use(morganMiddleware);
app.use("/api/", router);

const port = config.get("port") as number;

app.listen(port, async () => {
  await db();

  Logger.info(`Server running on port ${port}`);
});
