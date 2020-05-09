var genrateMessage = (from,text) =>{
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};
var genrateLocationMessage = (from,lat,long)=>{
    return {
        url: `http://www.google.com/maps?q=${lat},${long}`,
        createdAt: new Date().getTime()
    };
};
module.exports = { genrateMessage, genrateLocationMessage};