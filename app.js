var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var cons = require('consolidate');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

const PORT = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.render('index');
});;

app.get('/fecha', function(req, res){
  res.send(new Date() + '<br><a href="/">Volver</a>');
});

app.post('/post', function(req, res){
  var reqBody = req.body;

  reqBody.T1 = reqBody.T1.slice(4,12).toUpperCase().charAt(3);
  reqBody.T2 = reqBody.T2.slice(4,12).toUpperCase().charAt(3);
  reqBody.T3 = reqBody.T3.slice(4,12).toUpperCase().charAt(3);
  reqBody.T4 = reqBody.T4.slice(4,12).toUpperCase().charAt(3);

  console.log(reqBody);

  res.send(reqBody);
});

app.listen(PORT, function(){
  console.log("Listening on PORT: "+PORT);
})
