import http from "http";

const server = http.createServer((req, res) => {
  console.log("server hit by client ");
  res.write("hello client");
  res.end();
});

server.listen(4444, () => console.log("Server is running...."));
