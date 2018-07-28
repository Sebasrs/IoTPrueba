var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, function(){
  console.log("Listening on PORT: "+PORT);
})
