const path = require('path');
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { genrateMessage, genrateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js')

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.on('join',(params, callback)=>{
        if(!isRealString(params.name)||!isRealString(params.room)){
            callback('Name and Room Name are req');
        }

        socket.join(params.room);
        socket.emit('newMsg', genrateMessage("Admin", "Welcome to chat App"));

        socket.broadcast.to(params.room).emit('newMsg', genrateMessage("Admin", `${params.name} has Joined`));

        callback();
    });

    socket.on('createMsg',(msg,callback)=>{
        console.log('createMsg',msg);
        io.emit('newMsg',genrateMessage(msg.from, msg.text));
        callback('this is from server');
        // io.emit('newMsg',{
        //     from: msg.from,
        //     text: msg.text,
        //     createdAr: new Date().getTime()
        // });
        //socket.broadcast.emit('newMsg', genrateMessage(msg.from,msg.text));
    });

    socket.on('createLocationMsg',(cords)=>{
        io.emit('LocationMsg',genrateLocationMessage('Admin',cords.lat,cords.long));
    });

    socket.on('disconnect', () => {
        console.log('tab is closed');
    });
});



app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server is running at ${port} port`);
});