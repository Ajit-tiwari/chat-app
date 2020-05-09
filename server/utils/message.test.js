var expect = require('expect');

var { genrateMessage} = require('./message.js');

describe('genrateMessage',()=>{
    it('Should Genrate correct msg obj',()=>{
        var from = 'jen';
        var text = 'Some Msg';

        var message = genrateMessage(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
    });
});