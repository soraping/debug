process.stdin
  .on("data", chunk => {
    console.log("new data available");
    console.log(`chunk read: (${chunk.length}) \n "${chunk.toString()}"`);
  })
  .on("end", () => process.stdout.write("end of stream"));
