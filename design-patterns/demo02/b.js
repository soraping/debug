exports.loaded = false;

const a = require("./a");

module.exports = {
  loaded: true,
  aWasLoaded: a.loaded
};
