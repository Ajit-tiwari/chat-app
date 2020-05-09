var expect = require('expect');

var { genrateMessage, genrateLocationMessage} = require('./message.js');

describe('genrateMessage',()=>{
    it('Should Genrate correct msg obj',()=>{
        var from = 'jen';
        var text = 'Some Msg';

        var message = genrateMessage(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
    });
});

describe('GeoLocation',()=>{

    it('should gen geo loctaion',()=>{
        var from = 'Admin';
        var lat = 15;
        var long = 19;
        var url = `http://www.google.com/maps?q=${lat},${long}`;
        var msg = genrateLocationMessage(from,lat,long);

        expect(msg).toMatchObject({from, url});


    })
})