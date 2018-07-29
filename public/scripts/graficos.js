var chart;

$.ajax({url: "https://iot-xyz.herokuapp.com/iot", success: function(result){
  clasificar(result);
}});

function clasificar(json){
  //Almacena los puntos
  var puntosMapa = new Puntos("Mapa");
  var puntosSirena = new Puntos("Sirena");
  var puntosTemperatura = new Puntos("Temperatura");
  var puntosPresion = new Puntos("Presion");
  //Se itera el json y se clasifican los datos
  var dato;
  var punto;
  var fecha;
  for(var i = 0; i < json.length; i++) {
    obj = json[i];
    fecha = new Date(obj["date"]);
    if("Sensor" in obj){
      if(obj["Sensor"] == "Presion+Temp_1" ){
        dato = obj["Valor"];
        punto = new Punto(dato,fecha);
        puntosPresion.agregarPunto(punto);
        dato = obj["Valor2"];
        punto = new Punto(dato,fecha);
        puntosTemperatura.agregarPunto(punto);
      }
    }
    else if("lat" in obj && "lon" in obj){
      dato = [ obj["lat"] , obj["lon"] ];
      punto = new Punto(dato,fecha);
      puntosMapa.agregarPunto(punto);
    }
    else if("ID" in obj){
      if(obj["ID"] == "Sirena1"){
        dato = obj["Estado"];
        punto = new Punto(dato,fecha);
        puntosSirena.agregarPunto(punto);
      }
    }
  }
  //Se grafican los datos
  puntosMapa.ordenarPuntos();
  puntosSirena.ordenarPuntos();
  puntosTemperatura.ordenarPuntos();
  dibujarMapa(puntosMapa.puntos);
  graficar(puntosSirena,"Fecha","Sirena","Estado","sirena");
  graficar(puntosTemperatura,"Fecha","Temperatura","Unidad","temperatura");
  graficar(puntosPresion,"Fecha","Presion","Unidad","presion");
}

function graficar(puntos,tituloX,tituloY,unidad,div) {
  //Se iteran los puntos y se obtiene los ejes
  var arrayFechas = new Array();
  var arrayValores = new Array();
  for(var i = 0; i < puntos.puntos.length; i++){
    arrayFechas.push(puntos.puntos[i].fecha);
    arrayValores.push( parseInt(puntos.puntos[i].valor,10) );
  }
  var jsonX = { categories : arrayFechas, title : { text : tituloX } };
  var series = [ { name: unidad, data: arrayValores } ];
  crearGrafico(jsonX,series,'line',tituloY, div);
}

function crearGrafico(serieX,serieY,tipoGrafico,tituloY, div){
  chart = new Highcharts.Chart({
			chart: {
				renderTo: div,
				defaultSeriesType: tipoGrafico
			},
			title: {
				text: 'Monitoreo de sensores'
			},
			subtitle: {
				text: 'IoT'
			},
			xAxis: serieX,
			yAxis: {
				title: {
					text: tituloY
				}
			},
			tooltip: {
				enabled: true,
				formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
						this.x +': '+ this.y +' '+this.series.name;
				}
			},
			plotOptions: {
				line: {
					dataLabels: {
						enabled: true
					},
					enableMouseTracking: true
				}
			},
			series: serieY,
		});
}
