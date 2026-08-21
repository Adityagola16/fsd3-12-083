import {writeFile,appendFile} from "fs/promises";
// await appendFile("hello.txt", "\nFS Hello is my World");
//await writeFile("hello.txt", "FS Hello is my World");
const content = await writeFile("hello.txt", "utf-8");
console.log(content);