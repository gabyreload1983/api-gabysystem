import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";

import config from "./config/config.js";
import initializePassport from "./config/passport.config.js";
import logger from "./logger/logger.js";

import usersRouter from "./routes/users.router.js";
import ordersRouter from "./routes/orders.router.js";
import customersRouter from "./routes/customers.router.js";
import productsRouter from "./routes/products.router.js";

import "./dao/dbMongoConfig.js";
import { authToken } from "./utils.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use("/api/users", usersRouter);
app.use("/api/orders", authToken, ordersRouter);
app.use("/api/customers", authToken, customersRouter);
app.use("/api/products", authToken, productsRouter);
app.use("*", (req, res) =>
  res.status(404).send({ error: "error", message: "Page Not Found" })
);

const port = config.port;
app.listen(port, () => logger.info(`Listening on port ${port}`));
