function clienteWS(){
	this.socket=undefined;
	this.nick=undefined;
	this.codigo=undefined;
		this.ini=function(){
		this.socket=io.connect(); //hace una peticion de conexion al servidor que ha creado esto
		this.lanzarSocketSrv();
	}
	this.crearPartida=function(numero,nick){
		this.nick=nick;
		this.socket.emit("crearPartida",numero,nick);
	}
	this.unirAPartida=function(nick,codigo){
		this.nick=nick;
		this.socket.emit("unirAPartida",nick,codigo);
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
	//servidor WS dentro del cliente
	this.lanzarSocketSrv=function(){
		var cli=this;
		this.socket.on('connect', function(){			
			console.log("conectado al servidor de WS");
		});
		this.socket.on('partidaCreada',function(data){
			cli.codigo=data.codigo;
			console.log(data);
			//pruebasWS();
		});
		this.socket.on('unidoAPartida',function(data){
			cli.codigo=data.codigo;
			console.log(data);
		});
		this.socket.on('nuevoJugador',function(nick){
			console.log(nick+" se une a la partida");
			//cli.iniciarPartida();
		});
		this.socket.on('partidaIniciada',function(fase){
			console.log("Partida esta en fase: "+fase);
		});
		this.socket.on('recibirListaPartidasDisponibles',function(lista){
			console.log(lista);
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

	ws2.unirAPartida("Juani",codigo);
	ws3.unirAPartida("Juana",codigo);
	ws4.unirAPartida("Juanan",codigo);

	//ws.iniciarPartida();
	//ws.lanzarVotacion();

}
function saltarVotos(){
	ws.saltarVoto();
	ws1.saltarVoto();
	ws2.saltarVoto();
	ws3.saltarVoto();

}
function votaciones(){
	ws.votar("juan");
	ws1.votar("juan");
	ws2.votar("juan");
	ws3.votar("juan");
}
function votaciones2(){
	ws.votar("pepe");
}