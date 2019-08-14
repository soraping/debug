const logger = require("./logger");

logger.prototype.debug = msg => {
  console.debug(msg);
};

module.exports = logger;
