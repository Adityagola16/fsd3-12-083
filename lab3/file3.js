import { fstat } from "fs";
import {start } from "fs/promises";
const content = await start("file1.js");
console.log (file.size,fstat.size,"bytes");
console.log (`is Fiel: ${file.isFile()}`);
console.log (`is Folder: ${file.isFolder()}`);
console.log(`is syslink: ${fstat.isSymbolicLink()}`);
