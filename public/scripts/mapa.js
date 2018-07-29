var map;

function dibujarMapa(datos){
  var coordenadas = new Array();
  for(var i = 0; i < datos.length; i++){
    var obj = datos[i];
    coordenadas.push( obj.valor );
  }
  console.log(coordenadas);
  mapboxgl.accessToken = 'pk.eyJ1IjoicGllcnJlMTMyNiIsImEiOiJjams1c3FxN3Exczc0M3ZydDBpaHhqOWN0In0.N8Ghi_mVD6xcQDZvuQ9Nyg';
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    zoom: 9,
    center: coordenadas[0]
  });

  map.on('load', function () {

    map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": coordenadas
                }
            }
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#888",
            "line-width": 8
        }
    });
  });

}
