const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./web-socket");

const server = http.createServer(app);

initializeSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
