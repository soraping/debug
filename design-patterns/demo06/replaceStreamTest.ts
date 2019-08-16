import ReplaceStream from "./replaceStream";

const re = new ReplaceStream("World", "Nodejs");

re.on("data", chunk => console.log(chunk.toString()));

re.write("Hello W");
re.write("orld!");
re.end();
