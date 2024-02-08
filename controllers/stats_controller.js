const StatRouter = require("express").Router();
const { generateStats } = require("../utils/helpers");

StatRouter.get("/", async (req, res) => {
  try {
    const stats = await generateStats();
    res.json(stats);
  } catch (error) {
    console.error("Error processing statistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = StatRouter;
