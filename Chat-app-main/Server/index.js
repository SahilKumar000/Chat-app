import express from "express";
import bodyParser from 'body-parser';
import router from "./src/Routes/Users.js";
import { testMiddleware } from "./Middlewares/index.js"
import cors from 'cors';
import http from "http";
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(testMiddleware("xyz"));

const PORT = 5000;

// ----------------------------------------------------------------------------------------

io.on('connection', (socket) => {
    console.log('⚡️: User Connected', socket.id);
    socket.join("");
    socket.on('chat', (res, room) => {
        if (room === "") {
            console.log("Recived from client (Global)-> ", res)
            socket.to("").emit("sending_to_client", { data: res, socket_id: socket.id }); // For all
        }
        else {
            console.log(`Recived from client (`, room, ')-> ', res)
            socket.to(room).emit("sending_to_client", { data: res, socket_id: socket.id });
        }
    })

    socket.on('join_room', (room) => {
        socket.join(room);
        io.emit('Updating_client_group', room);
    });

    socket.on("leave", (room) => {
        socket.leave(room);
        console.log("Removed from room");
    })
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    })
})

// ----------------------------------------------------------------------------------------

app.use('/api', router);

server.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`);
});
