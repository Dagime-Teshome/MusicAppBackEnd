const songRouter = require("express").Router();
const Song = require("../models/song_model");
const logger = require("../utils/logger");

songRouter.get("/", async (request, response) => {
  const songs = await Song.find({});
  response.json(songs);
});

songRouter.post("/", async (request, response) => {
  const { title, artist, genre, album } = request.body;
  const newSong = new Song({
    title: title,
    artist: artist,
    genre: genre,
    album: album,
  });
  const savedSong = await newSong.save();
  response.status(201).json(savedSong);
});

songRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const deletion = await Song.findByIdAndDelete(id);
  if (!deletion) {
    const error = new Error(`Bad Request`);
    error.name = "Document not found";
    error.statusCode = 404; // Set an appropriate status code
    throw error;
  }
  response.status(202).send("Deletion Successful");
});

songRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const song = await Song.findById(id);
  if (!song) {
    const error = new Error(`Bad Request`);
    error.name = "Document not found";
    error.statusCode = 404;
    throw error;
  }
  response.status(200).json(song);
});

songRouter.put("/:id", async (request, response) => {
  const { title, artist, genre, album } = request.body;
  const id = request.params.id;
  const song = {
    title: title,
    artist: artist,
    album: album,
    genre: genre,
  };
  let updateSong = await Song.findByIdAndUpdate(id, song, { new: true });
  if (!updateSong) {
    const error = new Error(`Bad Request`);
    error.name = "Document not found";
    error.statusCode = 404;
    throw error;
  }
  response.status(200).json(updateSong);
});

module.exports = songRouter;
