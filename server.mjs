import next from 'next';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let io = null;

app.prepare().then(() => {
  const httpServer = createServer(handler);
  console.log('@@@io1', io);
  io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('@@@@ connection', socket.id);
    // ...
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log('@@@io2', io);
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
