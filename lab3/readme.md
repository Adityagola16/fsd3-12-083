# file system (fs module)
fs module directly communicate with os . the common operations on a file or folder are 
1. file -> rightFile ,readFile ,opend fxn
2. File metadat 
call fxn are promise so it must be called with awate keyword 
Append wrok -> appendFile() adds content to the end without deleting the existing content.
writeFile->writeFile() creates/overwrites the file and delete all other file before run.
=> if a fxn uses using await keyword then the fxn must be async