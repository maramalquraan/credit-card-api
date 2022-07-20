import express from "express";
import { dbConnect } from "./config/db";
import apiRoutes from "./api/index";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Credit Card API!");
});

app.use("/api/", apiRoutes);

const server = app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

dbConnect();

export default server;
