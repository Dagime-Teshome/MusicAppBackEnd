const infoLogger = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.info(...params);
  }
};

const errorLogger = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

module.exports = {
  infoLogger,
  errorLogger,
};
