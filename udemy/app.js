const { log } = require("console");
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);

  return res.end("Hello from the server!");
});

server.listen(3000);
