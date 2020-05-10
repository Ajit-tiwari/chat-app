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
    var li =jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`)

    jQuery('#msg').append(li);

});

socket.on('LocationMsg',function(msg){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Loaction</a>');
    li.text(`${msg.from}:`);
    a.attr('href',msg.url);
    li.append(a);
    jQuery('#msg').append(li);
})

jQuery('#msg_form').on('submit',function(e){
    e.preventDefault();
    var msgTxtBox = jQuery('[name=message]');
    socket.emit('createMsg',{
        from: 'user',
        text: msgTxtBox.val()
    },function(){
        msgTxtBox.val('');
    });
});


var locationButton = jQuery('#location');

locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert(' GeoLocation Not supported');
    }

    locationButton.attr('disabled', 'disabled').text('sending location...');
    
    navigator.geolocation.getCurrentPosition(function(pos){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMsg',{
            lat: pos.coords.latitude,
            long: pos.coords.longitude
        });
    }, function(err){
            locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch Location');
    })
})