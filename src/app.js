import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";

import config from "./config/config.js";
import { __dirname } from "./utils.js";
import initializePassport from "./config/passport.config.js";

import usersRouter from "./routes/api/users.router.js";
import ordersRouter from "./routes/api/orders.router.js";
import customersRouter from "./routes/api/customers.router.js";

import "./dao/dbMongoConfig.js";

const app = express();

app.use(cors());

app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

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
