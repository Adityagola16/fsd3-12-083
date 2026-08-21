// IF a function uses await keyword then the fxn must be async
import { log } from "console";
import { writeFile, appendFile, readFile } from "fs/promises";

const readData = async (filename) => {
  try {
    const data = await readFile(filename, "utf-8");
    return data;
  } catch (e) {
    console.log(e.message);
    console.log("File Not Found");
  } finally {
    console.log("Read Data Finished");
  }
};
const writeData = async (filename, content) => {
  await writeFile(filename, content);
};
const appendData = async (filename, content) => {
  await appendData(filename, content);
};
const data = await readData("file2.js");
console.log(data);
