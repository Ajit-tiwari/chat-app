const path = require('path');
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const express = require('express');

var app = express();

app.use(express.static(publicPath));

app.listen(port,()=>{
    console.log(`Server is running at ${port} port`);
})