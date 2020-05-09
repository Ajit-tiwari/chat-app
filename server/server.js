const path = require('path');
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
var app = express();
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.emit('newMsg',{
        from: 'Admin',
        text: 'Welcome To chat App',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMsg',{
        from: 'Admin',
        text: 'New User Joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMsg',(msg)=>{
        console.log('createMsg',msg);

        // io.emit('newMsg',{
        //     from: msg.from,
        //     text: msg.text,
        //     createdAr: new Date().getTime()
        // });
        socket.broadcast.emit('newMsg',{
            from: msg.from,
            text: msg.text,
            createdAr: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log('tab is closed');
    });
});



app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server is running at ${port} port`);
});