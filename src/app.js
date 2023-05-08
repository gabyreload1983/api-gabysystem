import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";

import config from "./config/config.js";
import initializePassport from "./config/passport.config.js";

import usersRouter from "./routes/users.router.js";
import ordersRouter from "./routes/orders.router.js";
import customersRouter from "./routes/customers.router.js";

import "./dao/dbMongoConfig.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/customers", customersRouter);
app.use("*", (req, res) =>
  res.status(404).send({ error: "error", message: "Page Not Found" })
);

const port = config.port;
app.listen(port, () => console.log(`Listening on port ${port}`));
