import next from 'next';
import http from 'node:http';
import { Server } from 'socket.io';

import { setSocketInstance } from './app/server/socket';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const httpServer = http.createServer(handler);
const io = new Server(httpServer);

setSocketInstance(io);

app.prepare().then(() => {
    io.on("connection", () => {
        // ...
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});