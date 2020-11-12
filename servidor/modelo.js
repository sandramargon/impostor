//****JUEGO IMPOSTOR****//
function Juego(){
	this.partidas={};
	this.crearPartida=function(num,owner){
		//comprobar límites de num, no dejar crear partida sin los limites
		if((num>=4)&&(num<=10)){
			let codigo=this.obtenerCodigo();
			if (!this.partidas[codigo]){
				this.partidas[codigo]=new Partida(num,owner,codigo,this);
				//owner.partida=this.partidas[codigo];
			}
			return codigo;
		} else {
			let codigo="fallo";
			return codigo;
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
	this.listaPartidasDisponibles=function(){
		var lista=[];
		var huecos=0;
		for(var key in this.partidas){
			var partida=this.partidas[key];
			huecos=partida.obtenerHuecos();
			if(huecos>0)
			{
				lista.push({"codigo":partida.codigo,"huecos":huecos});
			}
		}
		return lista;
	}
	this.listaPartidas=function(){
		var lista=[];
		for(var key in this.partidas){
			var partida=this.partidas[key];
			var owner=partida.nickOwner;
				lista.push({"codigo":key,"owner":owner});
		}
		return lista;
	}
	this.iniciarPartida=function(nick,codigo){
		var owner=this.partidas[codigo].nickOwner;
		if(nick==owner){
			this.partidas[codigo].iniciarPartida();
		}
	}
	this.lanzarVotacion=function(nick,codigo){
		var usr=this.partidas[codigo].usuarios[nick];
		usr.lanzarVotacion();
	}
	this.saltarVoto=function(nick,codigo){
		var usr=this.partidas[codigo].usuarios[nick];
		usr.saltarVoto();
	}
	this.votar=function(nick,codigo,sospechoso){
		var usr=this.partidas[codigo].usuarios[nick];
		//usr=this.partidas[codigo].obtenerUsuario(nick)
		usr.votar(sospechoso);
	}
	this.obtenerEncargo=function(nick,codigo){
		var res={};
		var encargo=juego.partidas[codigo].usuarios[nick].tareas;
		var impostor=juego.partidas[codigo].usuarios[nick].impostor;
		res={"nick":nick,"encargo":encargo,"impostor":impostor};
		return res;
	}
	this.matar=function(nick,codigo,ciudadano){
		var usr=this.partidas[codigo].usuarios[nick];
		usr.matar(ciudadano);
	}
}

//****PARTIDA****//
function Partida(num,owner,codigo,juego){
	this.maximo=num;
	this.nickOwner=owner;
	this.codigo=codigo;
	this.juego=juego;
	this.fase=new Inicial();
	this.usuarios={};
	this.elegido="no hay nadie elegido";
	this.tareas=["jardines","calles","mobiliario","basuras"]; 

	this.obtenerHuecos=function(){
		return this.maximo-this.numeroJugadores();
	}
//funciones del juego
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
	this.iniciarPartida=function(){
		this.fase.iniciarPartida(this);
	}
	this.puedeIniciarPartida=function(){
		if(this.fase.nombre="completado"){
			this.fase=new Jugando();
			this.asignarTareas();
			this.asignarImpostor();
		} else{
			console.log("Aun no hay suficientes jugadores");
		}
	}
	this.abandonarPartida=function(nick){
		this.fase.abandonarPartida(nick,this);
	}
	this.puedeAbandonarPartida=function(nick){
		this.eliminarUsuario(nick);
		if(!this.comprobarMinimo()){
			this.fase = new Inicial();
		}
		if(this.numeroJugadores()<=0){
			this.juego.eliminarPartida(this.codigo);
		}
	}
	this.eliminarUsuario=function(nick){
		delete this.usuarios[nick];
	}

//funciones obtener numeros
	this.numeroJugadores=function(){
		return Object.keys(this.usuarios).length;
	}
	this.comprobarMinimo=function(){
		return this.numeroJugadores()>=4;
	}
	this.comprobarMaximo=function(){
		return this.numeroJugadores()<=this.maximo;
	}	

//Impostor y Ciudadanos
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

//Votaciones
	this.lanzarVotacion=function(){
		this.fase.lanzarVotacion(this);
	}
	this.puedeLanzarVotacion=function(){
		this.reiniciarContadoresVotaciones();
		this.fase=new Votacion();
	}
	this.votar=function(sospechoso){
		this.fase.votar(sospechoso,this);
	}

	this.puedeVotar=function(sospechoso){
		this.usuarios[sospechoso].esVotado();
		this.comprobarVotacion();
	}
	this.masVotado=function(){
		let max=0;
		let usr = "no hay nadie mas votado";
		for(var key in this.usuarios){
			if(this.usuarios[key].estado.vida=="vivo"){
				if(max < this.usuarios[key].votos){
					max = this.usuarios[key].votos;
					usr = this.usuarios[key];
				}
			}
		}
		//comprobar que solo hay 1 más votado 
		return usr;
	}

	this.numeroSkips=function(){
		let skips=0;
		for(var usr in this.usuarios){
			if(this.usuarios[usr].estado.vida=="vivo" && this.usuarios[usr].skip==true){
				skips++;
			}
		}
		return skips ;
	}
	this.todosHanVotado=function(){
		let res=true;
		for (var key in this.usuarios) {
			if (this.usuarios[key].estado.vida=="vivo" && !this.usuarios[key].haVotado){
				res=false;
				break;
			}
		}
		return res;
	}
	this.listaHanVotado=function(){
		var lista=[];
		for(var usr in this.usuarios){
			if(this.usuarios[usr].estado.vida=="vivo" && this.usuarios[usr].haVotado){
				lista.push(usr);
			}
		}
		return lista;
	}
	this.comprobarVotacion=function(){
	if(this.todosHanVotado()){
		let elegido=this.masVotado();
		if (elegido && elegido.votos>this.numeroSkips()){
			elegido.muere();
			this.elegido=elegido.nick;
		}
		this.finalVotacion();
		}
	}
	this.finalVotacion=function(){
		this.fase=new Jugando();
		//haVotado, skip, elegido
		this.comprobarFinal();
	}
	this.reiniciarContadoresVotaciones=function(){
	//recorrer usuarios y poner votos a 0 y skip a false
		this.elegido="no hay nadie elegido";
		for(var usr in this.usuarios){
			if(this.usuarios[usr].estado.vida=="vivo"){
				this.usuarios[usr].reiniciarContadoresVotaciones();
			}
		}
	}

//Ataque del Impostor y muertes
	this.matar=function(nick){
		if(this.usuarios[nick]){
			this.fase.matar(nick,this);
		}else{
			console.log("Usuario inexistente");
		}
	}
	this.puedeMatar=function(nick){
		this.usuarios[nick].muere();
		this.comprobarFinal();
	}

//funciones fin de juego
	this.gananImpostores=function(){
		if(this.numeroImpostoresVivos()>=this.numeroCiudadanosVivos()){
			this.fase = new Final();
			console.log("VICTORIA IMPOSTOR");
			return true;
		}
	}
	this.gananCiudadanos=function(){
		if(this.numeroImpostoresVivos()==0){
			this.fase = new Final();
			console.log("VICTORIA CIUDADANOS");
			return true;
		} 		
	}
	this.comprobarFinal=function(){
		if (this.gananImpostores()){
			this.finPartida();
		} else if (this.gananCiudadanos()){
			this.finPartida()
		}
	}
	this.finPartida=function(){
		this.fase=new Final();
		console.log("La partida ha finalizado");
	}

	this.agregarUsuario(owner);
}

//*****FASES JUEGO*****//
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
		partida.puedeAbandonarPartida(nick);
		//comprobar si no quedan usr
	}
	this.matar=function(nick,partida){
		console.log("Partida no comenzada");
	}
	this.lanzarVotacion=function(partida){}
	this.votar=function(sospechoso,partida){
		console.log("Partida no comenzada");
	}
}

function Completado(){
	this.nombre="completado";
	this.iniciarPartida=function(partida){
		partida.puedeIniciarPartida();
	}
	this.agregarUsuario=function(nick,partida){
		if (partida.comprobarMaximo()){
			partida.puedeAgregarUsuario(nick);
		}
		else{
			console.log("Lo siento, numero maximo");
		}
	}
	this.abandonarPartida=function(nick,partida){
		partida.puedeAbandonarPartida(nick);
	}
	this.matar=function(nick,partida){
		console.log("Aun no se puede atacar");
	}
	this.lanzarVotacion=function(partida){
			console.log("Aun no se puede votar");
	}
	this.votar=function(sospechoso,partida){
		console.log("Partida no comenzada");
	}
}

function Jugando(){
	this.nombre="jugando";
	this.agregarUsuario=function(nick,partida){
		console.log("La partida ya ha comenzado");
	}
	this.iniciarPartida=function(partida){}
	this.abandonarPartida=function(nick,partida){
		partida.puedeAbandonarPartida(nick);
		//comprobar si termina la partida
	}
	this.matar=function(nick,partida){
		partida.puedeMatar(nick);
	}
	this.lanzarVotacion=function(partida){
		partida.puedeLanzarVotacion();
	}
	this.votar=function(sospechoso,partida){
		console.log("Las votaciones aun no han comenzado");
	}
}

function Votacion(){
	this.nombre="votacion";
	this.agregarUsuario=function(nick,partida){}
	this.iniciarPartida=function(partida){}
	this.abandonarPartida=function(nick,partida){
		console.log("Espera, se esta votando");
	}
	this.matar=function(nick,partida){
		console.log("Se esta votando!");
	}
	this.lanzarVotacion=function(partida){
		console.log("Aun no ha terminado la votacion, no puedes empezar una nueva");
	}
	this.votar=function(sospechoso,partida){
		partida.puedeVotar(sospechoso);
	}
}

function Final(){
	this.nombre="final";
	this.agregarUsuario=function(nick,partida){
		console.log("La partida ya ha terminado");
	}
	this.iniciarPartida=function(partida){}
	this.abandonarPartida=function(nick,partida){
		console.log("La partida ya ha terminado");
	}
	this.matar=function(nick,partida){
		console.log("La partida ya ha terminado");
	}
	this.lanzarVotacion=function(partida){
		console.log("La partida ya ha terminado");
	}
	this.votar=function(sospechoso,partida){
		console.log("La partida ya ha terminado");
	}
}

//****ESTADOS JUGADORES****//
function Vivo(){
	this.vida="vivo";
	this.muere=function(usr){
		usr.estado=new Muerto();
		usr.partida.comprobarFinal();
	}
	this.lanzarVotacion=function(usr){
		usr.puedeLanzarVotacion();
	}
}

function Muerto(){
	this.vida="muerto";
	this.muere=function(usr){}
	this.lanzarVotacion=function(usr){}
}

//****USUARIO****//
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

//funciones de inicio
	this.crearPartida=function(num){
		return this.juego.crearPartida(num,this);
	}
	this.iniciarPartida=function(){
		this.partida.iniciarPartida(this.partida,this.nick);
	}
	this.abandonarPartida=function(){
		this.partida.abandonarPartida(this.nick);
		if(this.partida.numeroJugadores()>=0){
			console.log(this.nick,"era el ultimo jugador");
		}
	}

//funciones de muertes
	this.matar=function(nick){
		if(this.impostor==true){
			this.partida.fase.matar(nick,this.partida);
		}
	}
	this.muere=function(){
		this.estado.muere(this);
	}

//funciones votacion
	this.saltarVoto=function(){
		if(this.haVotado==false){
			this.skip=true;
			this.haVotado=true;
			this.partida.comprobarVotacion();
		} else{
			console.log("SALTASTE LA VOTACION");
		}
		
	}
	this.lanzarVotacion=function(){
		this.estado.lanzarVotacion(this);
	}
	this.puedeLanzarVotacion=function(){
		this.partida.lanzarVotacion();
	}
	this.votar=function(sospechoso){
		if(this.haVotado==false){
			this.haVotado=true;
			this.partida.votar(sospechoso);
		}else{
			console.log("YA HAS VOTADO!");
		}
	}
	this.esVotado=function(){
		this.votos++;
	}
	this.reiniciarContadoresVotaciones=function(){
		this.votos=0;
		this.haVotado=false;
		this.skip=false;
	}

}

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

// function inicio(){
// 	juego=new Juego();
// 	var usr=new Usuario("pepe",juego);
// 	var codigo=usr.crearPartida(4);

// 	if(codigo!=null){
// 		juego.unirAPartida(codigo,"luis");
// 		juego.unirAPartida(codigo,"luisa");
// 		juego.unirAPartida(codigo,"luisito");
// 		juego.unirAPartida(codigo,"pepe2");

// 		usr.iniciarPartida();
// 	}else{
// 		console.log("Cambie el numero de jugadores");
// 	}
// }

module.exports.Juego=Juego;
module.exports.Usuario=Usuario;
module.exports.Inicial=Inicial;