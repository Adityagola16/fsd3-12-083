const { createReadStream } = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(`
            <h1>Home Page</h1>
            <a href="/product">Go to Product Enquiry</a>
        `);
  } else if (req.url === "/product") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const stream = createReadStream("product.html", {
      encoding: "utf-8",
    });

    stream.on("error", () => {
      res.statusCode = 500;
      res.end("Unable to load product.html");
    });

    stream.pipe(res);
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("prg6 is running on http://localhost:3000");
});
