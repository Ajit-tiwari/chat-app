var moment = require('moment');

var genrateMessage = (from,text) =>{
    return {
        from,
        text,
        createdAt: moment().valueOf()

    };
};
var genrateLocationMessage = (from,lat,long)=>{
    return {
        from,
        url: `http://www.google.com/maps?q=${lat},${long}`,
        createdAt: moment().valueOf()
    };
};
module.exports = { genrateMessage, genrateLocationMessage};