var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createMsg', {
    //     text: 'fghgjhjcvjh',
    //     from: 'Ajit'
    // });
});

socket.on('disconnect', function () {
    console.log('disconnected to server');
});

//custom Event   ... on is used for listening event
socket.on('newMsg', function (msg) {    
    console.log('New msg ',msg);
})