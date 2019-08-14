const http = require("http");
const Chance = require("chance");
const chance = new Chance();

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });

    function generateMore() {
      while (chance.bool({ likelihood: 95 })) {
        let shouldContinue = res.write(
          chance.string({ length: 16 * 1024 - 1 })
        );
        if (!shouldContinue) {
          console.log("backpressure");
          return res.once("drain", generateMore);
        }
      }
      res.end("\n The end...\n", () => console.log("all data was sent"));
    }
    generateMore();
  })
  .listen(8080, () => console.log("listen port 8080"));
