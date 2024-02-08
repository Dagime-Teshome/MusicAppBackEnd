const filterRouter = require("express").Router();
const { response } = require("../app");
const Song = require("../models/song_model"); // Assuming you have a Song model

filterRouter.post("/", async (request, response) => {
  const { searchTerm, genre } = request.body;
  let matchedSongs;
  if (searchTerm && genre !== "All") {
    // Search by both title/artist and genre
    matchedSongs = await Song.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { artist: { $regex: searchTerm, $options: "i" } },
      ],
      genre: genre,
    });
  } else if (searchTerm) {
    // Search by title/artist only
    matchedSongs = await Song.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { artist: { $regex: searchTerm, $options: "i" } },
      ],
    });
  } else if (genre !== "All") {
    // Filter by genre only
    matchedSongs = await Song.find({ genre: genre });
  } else {
    // Fetch all songs if both search term and genre are not provided
    matchedSongs = await Song.find();
  }

  response.status(200).json(matchedSongs);
});

filterRouter.get("/genres", async (request, response) => {
  const uniqueGenres = await Song.distinct("genre");
  response.status(201).json(uniqueGenres);
});

module.exports = filterRouter;
