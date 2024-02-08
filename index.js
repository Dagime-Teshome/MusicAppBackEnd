const config = require("./utils/config");
const app = require("./app");
const { infoLogger } = require("./utils/logger");
const PORT = config.port;
PORT || 3001;

app.listen(PORT, () => {
  infoLogger(`Server listing on port:${config.port}`);
});
