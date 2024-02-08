const Song = require("../models/song_model");
const { errorLogger, infoLogger } = require("./logger");

const errorHandler = (error, request, response, next) => {
  console.log("from middle", error.name);
  errorLogger(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "Document not found") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown Endpoint" });
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
