const path = require('path');
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { genrateMessage, genrateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js')
const {User} = require('./utils/users');
var app = express();
var server = http.createServer(app);

var io = socketIO(server);
var users = new User();
io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.on('join',(params, callback)=>{
        if(!isRealString(params.name)||!isRealString(params.room)){
            return callback('Name and Room Name are req');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
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
        var user=users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMsg',genrateMessage('Admin: ',`${user.name} has left the chat`));
        }
    });
});



app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server is running at ${port} port`);
});