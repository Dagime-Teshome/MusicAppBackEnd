const app = express();
const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
require("express-async-errors");
const songsRouter = require("./controllers/songs_controller");
const statsRouter = require("./controllers/stats_controller");
const filterRouter = require("./controllers/filter_controller");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { infoLogger, errorLogger } = require("./utils/logger");

infoLogger("connecting to", config.url);

mongoose
  .connect(config.url)
  .then(() => {
    infoLogger("connected to MongoDB");
  })
  .catch((error) => {
    errorLogger("error connecting to MongoDB:", error.message);
  });

app.use(express.static("dist"));
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use("/api/songs", songsRouter);
app.use("/api/stats", statsRouter);
app.use("/api/filter", filterRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
