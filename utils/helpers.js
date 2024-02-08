const Song = require("../models/song_model");

async function generateStats() {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct("artist").exec();
    const totalAlbums = await Song.distinct("album").exec();
    const totalGenres = await Song.distinct("genre").exec();

    const popularArtist = await Song.aggregate([
      { $group: { _id: "$artist", totalSongs: { $sum: 1 } } },
      { $sort: { totalSongs: -1 } },
      { $limit: 1 },
    ]);

    const popularGenre = await Song.aggregate([
      { $group: { _id: "$genre", totalSongs: { $sum: 1 } } },
      { $sort: { totalSongs: -1 } },
      { $limit: 1 },
    ]);

    const leastPopularArtist = await Song.aggregate([
      { $group: { _id: "$artist", totalSongs: { $sum: 1 } } },
      { $sort: { totalSongs: 1 } },
      { $limit: 1 },
    ]);

    const leastPopularGenre = await Song.aggregate([
      { $group: { _id: "$genre", totalSongs: { $sum: 1 } } },
      { $sort: { totalSongs: 1 } },
      { $limit: 1 },
    ]);

    return {
      totalSongs,
      totalArtists: totalArtists.length,
      totalAlbums: totalAlbums.length,
      totalGenres: totalGenres.length,
      popularArtist: popularArtist.length > 0 ? popularArtist[0] : null,
      popularGenre: popularGenre.length > 0 ? popularGenre[0] : null,
      leastPopularArtist:
        leastPopularArtist.length > 0 ? leastPopularArtist[0] : null,
      leastPopularGenre:
        leastPopularGenre.length > 0 ? leastPopularGenre[0] : null,
    };
  } catch (error) {
    console.error("Error generating statistics:", error);
    throw error;
  }
}

module.exports = { generateStats };
