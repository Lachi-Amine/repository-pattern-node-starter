import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";
import { logger, requestLogger } from "./logger/index.js";

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/myapp")
.then(() => logger.info("MongoDB connected"))
.catch(err => logger.error(err));

app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/create", async (req, res) => {

  const user = new User({
    name: "Amine",
    email: "amine@test.com",
    age: 22
  });

  await user.save();

  res.send(user);
});


app.listen(3000, () => {
  logger.info("Server running on port 3000");
});
