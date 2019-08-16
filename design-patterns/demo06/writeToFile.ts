import ToFileStream from "./toFileStream";
const tfs = new ToFileStream();

tfs.write({ path: "file1.txt", content: "hello" });
tfs.write({ path: "file2.txt", content: "nodejs" });
tfs.write({ path: "file3.txt", content: "stream" });

tfs.end(() => console.log("all files created"));
