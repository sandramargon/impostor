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
	this.unirAPartida=function(codigo,nick){
		//ToDo
		if(this.partidas[codigo]){
			this.partidas[codigo].agregarUsuario(nick);
		}
	}
	this.obtenerCodigo=function(){
		let cadena="ABCDEFGHIJKLMNOPQRSTUVXYZ";
		let letras=cadena.split('');
		let maxCadena=cadena.length;
		let codigo=[];
		for(i=0;i<6;i++){
			codigo.push(letras[randomInt(1,25)-1]);
		}
		return codigo.join('');
	}
}


function Partida(num, owner){
	this.maximo=num;
	this.nickOwner=owner;
	this.fase=new Inicial();
	this.numjugadores=0;
	//this.usuarios=[];//el index 0 será el owner
	this.usuarios={} //versión array asociativo

	this.agregarUsuario=function(nick){
		this.fase.agregarUsuario(nick,this);
	}

	this.puedeAgregarUsuario=function(nick){
		//comprobar nick unico
		//comprobar si maximo
		this.numjugadores++;
		if(this.numjugadores<=this.maximo){
			let nuevo=nick;
			let contador=1;
			while(this.usuarios[nuevo]){
				nuevo=nick+contador;
				contador=contador+1;
			}
			this.usuarios[nuevo]=new Usuario(nuevo);
		}	
	}
	this.agregarUsuario(owner);
}

function Inicial(){
	this.agregarUsuario=function(nick,partida){
		this.puedeAgregarUsuario(nick);
	}
}
function Jugando(){
	this.agregarUsuario=function(nick,partida){
		//this.puedeAgregarUsuario(nick);
	}
}
function Final(){
	this.agregarUsuario=function(nick,partida){
		//this.puedeAgregarUsuario(nick);
	}
}


function Usuario(nick){
	this.nick=nick;
}

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
} //funcion auxiliar
