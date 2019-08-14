class Logger {
  constructor(name) {
    this.name = name;
  }
  info(msg) {
    console.info(`[${this.name}] ${msg}`);
  }
}

module.exports = Logger;
