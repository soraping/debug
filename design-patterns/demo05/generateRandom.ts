import RandomStream from "./randomStream";

const randomStream = new RandomStream();

randomStream.on("readable", () => {
  let chunk;
  while ((chunk = randomStream.read()) != null) {
    console.log(`chunk received: ${chunk.toString()}`);
  }
});
