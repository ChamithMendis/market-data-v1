const http = require('http');
const app = require('./app');
const setupWebSocket = require('./websocket/websocket');

const PORT = 3000;

const server = http.createServer(app);
setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
