const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, required: true },
  album: { type: String, required: true },
});

songSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// songSchema.plugin(uniqueValidator);
const Song = mongoose.model("Song", songSchema);
module.exports = Song;
