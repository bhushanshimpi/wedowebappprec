const http = require("http");
const app = require("./src/bin/www");
var CONFIG = require("./src/config/config");

const port = CONFIG.port || 9000;

console.log("Server started at : " + port);
const server = http.createServer(app);

server.listen(port);
