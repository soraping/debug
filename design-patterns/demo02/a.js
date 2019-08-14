exports.loaded = false;

const b = require("./b");

module.exports = {
  loaded: true,
  bWasLoaded: b.loaded
};
