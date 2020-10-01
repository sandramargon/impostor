function Juego(){
	this.partidas={};//que coleccion? es un array asociativo, un diccionario
	this.crearPartida=function(num,owner){ //le paso un numero de jugadores y un propietario
		//generar un código de 6 letras aleatorio
		let codigo=this.obtenerCodigo();
		//comprobar que no está en uso
		if(!this.partidas[codigo]){
			this.partidas[codigo]=new Partida(num,owner);
		}
		//crear el objeto partida: num owner
		//this.partidas[codigo]=nueva partida
	}
	this.unirAPartida=function(nik){
		//ToDo
	}
	this.obtenerCodigo=function(){
		let cadena="ABCDEFGHIJKLMNOPQRSTUVXYZ";
		let letras=cadena.split('');
		let codigo=[];
		for(i=0;i<6;i++){
			codigo.push(letras[randomInt(1,25)-1]);
		}
		return codigo.join('');
	}
}
function Partida(num, owner){
	this.maximo=num;
	this.owner=owner;

	this.usuarios=[];//el index 0 será el owner
	//this.usuarios={} //versión array asociativo
	this.agregarUsuario=function(nick){
		//ToDo
		//comprobar nick unico
		//comprobar si maximo
	}
	this.agregarUsuario(owner);
}
function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
} //funcion auxiliar
