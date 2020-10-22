function Juego(){
	this.partidas={};
	this.crearPartida=function(num,owner){
		//comprobar límites de num, no dejar crear partida sin los limites
		if((num>=4)&&(num<=10)){
			let codigo=this.obtenerCodigo();
			if (!this.partidas[codigo]){
				this.partidas[codigo]=new Partida(num,owner.nick,codigo);
				owner.partida=this.partidas[codigo];
			}
			return codigo;
		} else {
			console.log("El numero de jugadores debe estar entre 4 y 10");
		}
	}
	this.unirAPartida=function(codigo,nick){
		if (this.partidas[codigo]){
			this.partidas[codigo].agregarUsuario(nick);
		}
	}
	
	this.obtenerCodigo=function(){
		let cadena="ABCDEFGHIJKLMNOPQRSTUVXYZ";
		let letras=cadena.split('');
		let maxCadena=cadena.length;
		let codigo=[];
		for(i=0;i<6;i++){
			codigo.push(letras[randomInt(1,maxCadena)-1]);
		}
		return codigo.join('');
	}
	this.eliminarPartida=function(codigo){
		delete this.partidas[codigo];
	}
}

function Partida(num,owner,codigo){
	this.maximo=num;
	this.nickOwner=owner;
	this.codigo=codigo;
	this.fase=new Inicial();
	this.usuarios={};
	this.tareas=["jardines","calles","mobiliario","basuras"]; 
	this.agregarUsuario=function(nick){
		this.fase.agregarUsuario(nick,this)
	}
	this.puedeAgregarUsuario=function(nick){
		let nuevo=nick;
		let contador=1;
		while(this.usuarios[nuevo]){
			nuevo=nick+contador;
			contador=contador+1;
		}
		this.usuarios[nuevo]=new Usuario(nuevo);
		this.usuarios[nuevo].partida=this;
		//this.comprobarMinimo();
	}
	this.comprobarMinimo=function(){
		return Object.keys(this.usuarios).length>=4
	}
	this.comprobarMaximo=function(){
		return Object.keys(this.usuarios).length<this.maximo
	}
	this.iniciarPartida=function(){
		this.fase.iniciarPartida(this);
	}
	this.puedeAbandonarPartida=function(){

	}
	this.abandonarPartida=function(nick){
		this.fase.abandonarPartida(nick,this);
	}
	this.eliminarUsuario=function(nick){
		delete this.usuarios[nick];
	}
	this.puedeIniciarPartida=function(){
		if(this.fase.nombre="completado"){
			this.fase=new Jugando();
		} else{
			console.log("Aun no hay suficientes jugadores");
		}
	}
	this.agregarUsuario(owner);
	this.asignarTareas=function(){
		for(nick in this.usuarios){
			let numTarea="";
			numTarea = Math.floor((Math.random() * this.tareas.length) + 0);
			this.usuarios[nick].encargo=this.tareas[numTarea];
		}
	}
	this.asignarImpostor=function(){
		let numAleatorio="";
		numAleatorio = Math.floor((Math.random() * (Object.keys(this.usuarios)).length)+ 0);
		console.log(numAleatorio);
		let num=0;			
		for(nick in this.usuarios){
			if(num==numAleatorio){
				this.usuarios[nick].impostor=true;
			} 
			num++;
		}
	}
	this.numeroImpostoresVivos=function(){
		let cont=0;
		for (var key in this.usuarios) {
			if (this.usuarios[key].impostor && this.usuarios[key].estado.vida=="vivo"){
				cont++;
			}
		}
		return cont;
	}
	this.numeroCiudadanosVivos=function(){
		let numVivos=0;
		for(nick in this.usuarios){
			if(this.usuarios[nick].estado.vida=="vivo" && this.usuarios[nick].impostor==false){
				numVivos++;
			} 
		}
		return numVivos;
	}
	this.gananImpostores=function(){
		//comprobar si impostores vivos >= ciudadanos vivos
		//devuelve true o false pq es una comparacion
		//cambiar fase a final en caso de true
	}
	this.gananCiudadanos=function(){
		//comprobar numero impostores vivos es 0
	}
	this.votar=function(){
		this.usuarios[sospechoso].esVotado();
	}
	this.masVotado=function(){
		//let ...
		let max=0;
		//usr=undefined;
		//Recorre los usuarios vivos y comprueba si max < votos de ese usuario
		//en caso de cierto => actualiza max y guarda el usuario en una variable
	}
	this.numeroSkips=function(){
		//numero de usuarios que han hecho skip
		//recorrer usuarios vivos, incrementar contador si skip de ese usuario es tru
		//usuario tiene votos, skip como nuevos atributos
	}
	this.reiniciarContadores=function(){
	//recorrer usuarios y poner votos a 0 y skip a false
	}
	this.comprobarVotacion=function(){
		let elegido=this.masVotado();
		if (elegido && elegido.votos>this.numeroSkips()){
			elegido.esAtacado();
		}
	}
	this.comprobarFinal=function(){
		if this.gananImpostores(){
			this.finPartida();
		} else if this.gananCiudadanos(){
			this.finPartida()
		}
	}
	this.finPartida=function(){
		this.fase=new Final();
	}
}

function Inicial(){
	this.nombre="inicial";
	this.agregarUsuario=function(nick,partida){
		partida.puedeAgregarUsuario(nick);
		if (partida.comprobarMinimo()){
			partida.fase=new Completado();
		}		
	}
	this.iniciarPartida=function(partida){
		console.log("Faltan jugadores");
	}
	this.abandonarPartida=function(nick,partida){
		partida.eliminarUsuario(nick);
		//comprobar si no quedan usr
	}
	this.atacar=function(nick,partida){
		console.log("partida no comenzada");
	}
	this.lanzarVotacion=function(partida){}
}

function Completado(){
	this.nombre="completado";
	this.iniciarPartida=function(partida){
		partida.puedeIniciarPartida();
		//partida.fase=new Jugando();
		partida.asignarTareas();
		partida.asignarImpostor();
	}
	this.agregarUsuario=function(nick,partida){
		if (partida.comprobarMaximo()){
			partida.puedeAgregarUsuario(nick);
		}
		else{
			console.log("Lo siento, numero máximo")
		}
	}
	this.abandonarPartida=function(nick,partida){
		partida.eliminarUsuario(nick);
		if (!partida.comprobarMinimo()){
			partida.fase=new Inicial();
		}
	}
		this.atacar=function(nick,partida){
			console.log("aun no se puede atacar");
	}
	this.lanzarVotacion=function(partida){}
}

function Jugando(){
	this.nombre="jugando";
	this.agregarUsuario=function(nick,partida){
		console.log("La partida ya ha comenzado");
	}
	this.iniciarPartida=function(partida){
	}
	this.abandonarPartida=function(nick,partida){
		partida.eliminarUsuario(nick);
		//comprobar si termina la partida
	}
	this.atacar=function(nick,partida){
		if (partida.usuarios[nick].estado.vida=="vivo"){
			partida.usuarios[nick].estado = new Muerto();
		}
	}
	this.lanzarVotacion=function(partida){}
}

function Votacion(){
	this.final="votacion";
	this.agregarUsuario=function(nick,partida){}
	this.iniciarPartida=function(partida){}
	this.abandonarPartida=function(nick,partida){}
	this.atacar=function(nick,partida){}
	this.lanzarVotacion=function(partida){}
}

function Final(){
	this.final="final";
	this.agregarUsuario=function(nick,partida){}
	this.iniciarPartida=function(partida){}
	this.abandonarPartida=function(nick,partida){}
	this.atacar=function(nick,partida){}
	this.lanzarVotacion=function(partida){}
}


function Vivo(){
	this.vida="vivo";
}
function Muerto(){
	this.vida="muerto";

}

function Usuario(nick,juego){
	this.nick=nick;
	this.juego=juego;
	this.partida;
	this.impostor=false;//un aleatorio que elija uno de los usuarios de la partida y le asigna true a ese.
	this.encargo="ninguno";
	this.estado=new Vivo();
	this.votos=0;
	this.skip=false;
	this.haVotado=false;
	this.crearPartida=function(num){
		return this.juego.crearPartida(num,this);
	}
	this.iniciarPartida=function(){
		this.partida.iniciarPartida();
	}
	this.abandonarPartida=function(){
		this.partida.abandonarPartida(this.nick);
		if(this.partida.numeroJugadores()>=0){
			console.log(this.nick,"era el último jugador");
		}
	}
	this.atacar=function(nick){
		if(this.impostor==true){
			this.partida.fase.atacar(nick,this.partida);
		}
	}
}

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

function inicio(){
	juego=new Juego();
	var usr=new Usuario("pepe",juego);
	var codigo=usr.crearPartida(4);

	if(codigo!=null){
		juego.unirAPartida(codigo,"luis");
		juego.unirAPartida(codigo,"luisa");
		juego.unirAPartida(codigo,"luisito");
		juego.unirAPartida(codigo,"pepe2");

		usr.iniciarPartida();
	}else{
		console.log("Cambie el numero de jugadores");
	}

}