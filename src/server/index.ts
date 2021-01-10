import * as  express from 'express';
import Router from '../routes/index';
import {Socket} from 'socket.io';
import * as cors from 'cors';
import Database from '../database/index';
Database;
import * as dotenv from 'dotenv';

const app = express();
const server = require('http').Server(app)
const io = require("socket.io")(server , {
    // cors: {
    //   origin: "http://localhost:8080",
    //   methods: ["GET", "POST"]
    // }
  });
dotenv.config(); 
let connectUser = {};

io.on('connection', (socket: Socket) => {
    socket.on('userOn', (data) => {
        connectUser = data
    })
});

app.use((req: any, res: express.Response ,next: express.NextFunction)=>{
    req.io = io;
    req.connectUser = connectUser
   return next()
});
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(Router);

export default server;