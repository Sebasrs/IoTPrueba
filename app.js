var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var cons = require('consolidate');
//////Librerias MQTT
var mqtt = require('mqtt')
var url = require('url');
const path = require('path')
//Definiciones MQTT
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
var client  = mqtt.connect(mqtt_url)
var dato=""

//Listener MQTT Client
client.on('connect', function () {
  client.subscribe('presence')
  client.publish('presence', 'Hello mqtt')
})

client.on('message', function (topic, message) {
  // message is Buffer
  dato+=message.toString();
  console.log(message.toString())
 // client.end()
})
app.get('/pruebamqtt/', function (req, res) {
    client.publish('presence', 'Hello mqtt')
    res.send(dato);
});



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
