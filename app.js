var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.send("Tech Abuse API");
});

app.listen(PORT, function(){
  console.log("Listening on PORT: "+PORT);
})
