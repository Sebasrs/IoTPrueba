function comparar(a,b){
  if(a.fecha > b.fecha){
    return 1;
  }
  if(a.fecha < b.fecha){
    return -1;
  }
  return 0;
}

class Punto{

  constructor(valor,fecha){
    this.valor = valor;
    this.fecha = fecha;
  }

}

class Puntos{

  constructor(tipo){
    this.tipo = tipo;
    this.puntos = new Array();
  }

  agregarPunto(punto){
    this.puntos.push(punto);
  }

  ordenarPuntos(){
    this.puntos.sort(comparar);
  }

}
