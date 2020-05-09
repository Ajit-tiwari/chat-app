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

    socket.emit('newMessasge',{
        from: 'Mike',
        text: 'heyy',
        createdAt: 56
    });

    socket.on('createMsg',(msg)=>{
        console.log('createMsg',msg);
    })

    socket.on('disconnect', () => {
        console.log('tab is closed');
    });
});



app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server is running at ${port} port`);
});