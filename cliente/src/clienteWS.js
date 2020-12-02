function clienteWS(){
	this.socket=undefined;
	this.nick=undefined;
	this.codigo=undefined;
	this.owner=false;
	this.ini=function(){
		this.socket=io.connect(); //hace una peticion de conexion al servidor que ha creado esto
		this.lanzarSocketSrv();
	}
	this.crearPartida=function(numero,nick){
		this.nick=nick;
		this.socket.emit("crearPartida",numero,nick);
	}
	this.unirAPartida=function(codigo,nick){
		//this.nick=nick;
		this.socket.emit("unirAPartida",codigo,nick);
	}
	this.iniciarPartida=function(){
		this.socket.emit("iniciarPartida",this.nick,this.codigo);
	}
	this.listaPartidasDisponibles=function(){
		this.socket.emit("listaPartidasDisponibles");
	}
	this.listaPartidas=function(){
		this.socket.emit("listaPartidas");
	}
	this.estoyDentro=function(){
		this.socket.emit("estoyDentro",this.nick,this.codigo);

	}
	this.lanzarVotacion=function(){
		this.socket.emit("lanzarVotacion",this.nick,this.codigo);
	}
	this.saltarVoto=function(){
		this.socket.emit("saltarVoto",this.nick,this.codigo);
	}
	this.votar=function(){
		this.socket.emit("votar",this.nick,this.codigo,sospechoso);
	}
	this.obtenerEncargo=function(){
		this.socket.emit("obtenerEncargo",this.nick,this.codigo);
	}
	this.matar=function(){
		this.socket.emit("matar",this.nick,this.codigo,ciudadano);
	}
	this.movimiento=function(direccion){
		this.socket.emit("movimiento",this.nick,this.codigo,this,numJugador,direccion);
	}
	//servidor WS dentro del cliente
	this.lanzarSocketSrv=function(){
		var cli=this;
		this.socket.on('connect', function(){			
			console.log("conectado al servidor de WS");
		});
		this.socket.on('partidaCreada',function(data){
			cli.codigo=data.codigo;
			console.log(data);
			if(data.codigo != "fallo"){
				cli.owner=true;
				cli.numJugador=0;
				cw.mostrarEsperandoRival();
			}
			//pruebasWS();
		});
		this.socket.on('unidoAPartida',function(data){
			cli.codigo=data.codigo;
			cli.nick=data.nick; //
			cli.numJugador=data.numJugador;
			console.log(data);
			cw.mostrarEsperandoRival(); //
		});
		this.socket.on('nuevoJugador',function(nick){
			console.log(nick+" se une a la partida");
			//cli.iniciarPartida();
		});
		this.socket.on('esperando',function(fase){
			console.log('esperando: '+fase);
		});
		this.socket.on('partidaIniciada',function(fase){
			console.log("Partida esta en fase: "+fase);
			if(fase=="jugando"){
				cli.obtenerEncargo();
				cw.limpiar();
				lanzarJuego();
			}
		});
		this.socket.on('recibirListaPartidasDisponibles',function(lista){
			console.log(lista);
			if(!cli.codigo){
				cw.mostrarUnirAPartida(lista);
			}
		});
		this.socket.on('recibirListaPartidas',function(lista){
			console.log(lista);
		});
		this.socket.on("votacion",function(data){
			console.log(data);
		});
		this.socket.on("finalVotacion",function(data){
			console.log(data);
		});
		this.socket.on("haVotado",function(data){
			console.log(data);
		});
		this.socket.on("recibirEncargo",function(data){
			console.log(data);
		});
		this.socket.on("final",function(data){
			console.log(data);
		});
		this.socket.on("muereInocente",function(data){
			console.log(data);
		});
		this.socket.on("dibujarRemoto",function(lista){
			console.log(lista);
			for(var i=0;i<lista.length;i++){
				if(lista[i].nick!=cli.nick){
					lanzarJugadorRemoto(lista[i].nick,lista[i].numJugador);
				}
			}
		});
		this.socket.on("moverRemoto",function(datos){
			moverRemoto(datos.direccion,datos.nick,datos.numJugador);
		});
	}
	this.ini();
}
//boton actualizar = rest lista de partidas
var ws2,ws3,ws4;
function pruebasWS(){
	ws2=new clienteWS();
	ws3=new clienteWS();
	ws4=new clienteWS();
	var codigo=ws.codigo;

	ws2.unirAPartida(codigo,"Juani");
	ws3.unirAPartida(codigo,"Juana");
	ws4.unirAPartida(codigo,"Juanan");

	//ws.iniciarPartida();
	//ws.lanzarVotacion();

}
function saltarVotos(){
	ws.saltarVoto();
	ws2.saltarVoto();
	ws3.saltarVoto();
	ws4.saltarVoto();

}
function votaciones(){
	ws.votar("juan");
	ws2.votar("juan");
	ws3.votar("juan");
	ws4.votar("juan");
}
function votaciones2(){
	ws.votar("sa");
}