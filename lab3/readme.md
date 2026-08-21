# file system (fs module)
fs module directly communicate with os . the common operations on a file or folder are 
1. file -> rightFile ,readFile ,opend fxn
2. File metadat 
call fxn are promise so it must be called with awate keyword 
Append wrok -> appendFile() adds content to the end without deleting the existing content.
writeFile->writeFile() creates/overwrites the file and delete all other file before run.
=> if a fxn uses using await keyword then the fxn must be async




lab3..=>
#http module it is built in node.js module which allows developers to create web server and web client without installing any ecternal package.
one o the most important module in node.js, originally designed for building scalable network applicatrion and web server.
1. create web servers
2. hhandle client request.
3. build rest apis
4. non-blocking I/O
5. foundation of ecpress.js