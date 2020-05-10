var socket = io();

function scrollToBottom(){
    var msg = jQuery('#msg');
    var newMsg = msg.children('li:last-child');
    var clientHeight=msg.prop('clientHeight');
    var scrollTop = msg.prop('scrollTop');
    var scrollHeight = msg.prop('scrollHeight');
    var newMsgHeight = newMsg.innerHeight();
    var lastMsgHeight = newMsg.prev().innerHeight();

    if(clientHeight + scrollTop + newMsgHeight + lastMsgHeight>=scrollHeight){
        msg.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    
    var params = jQuery.deparam(window.location.search);

    socket.emit('join',params,function(err){
        if(err)
        {
            alert(err);
            window.location.href='/';
        }else{
            console.log('no error');
        }
    })

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
    var formattedTime=moment(msg.createdAt).format('h:mm a');
    // var li =jQuery('<li></li>');
    // li.text(`${msg.from} ${formattedTime}: ${msg.text}`)

    // jQuery('#msg').append(li);
    var template = jQuery('#msg-template').html();
    var html = Mustache.render(template,{
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });

    jQuery('#msg').append(html);
    scrollToBottom();
});

socket.on('LocationMsg',function(msg){

    var formattedTime=moment(msg.createdAt).format('h:mm a');
    var template = jQuery('#location-template').html();
    var html = Mustache.render(template,{
        from: msg.from,
        createdAt: formattedTime,
        url: msg.url
    });
    // var formattedTime = moment(msg.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Loaction</a>');
    // li.text(`${msg.from} ${formattedTime}: `);
    // a.attr('href',msg.url);
    // li.append(a);
    jQuery('#msg').append(html);
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