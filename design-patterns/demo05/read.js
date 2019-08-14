process.stdin
  .on("readable", () => {
    let chunk;
    console.log("new data available");
    while ((chunk = process.stdin.read()) !== null) {
      console.log(`Chunk read: (${chunk.length}) \n "${chunk.toString()}"`);
    }
  })
  .on("end", () => process.stdout.write("end of stream"));
