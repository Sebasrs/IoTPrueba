var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var path    = require("path");
var cons = require('consolidate');

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
  res.redirect('/');
});

app.listen(PORT, function(){
  console.log("Listening on PORT: "+PORT);
})
