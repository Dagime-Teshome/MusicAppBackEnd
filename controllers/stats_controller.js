const StatRouter = require("express").Router();
const { generateStats } = require("../utils/helpers");

StatRouter.get("/", async (req, res) => {
  const stats = await generateStats();
  res.status(200).json(stats);
});

module.exports = StatRouter;
