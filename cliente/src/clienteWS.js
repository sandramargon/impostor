function clienteWS(){
	this.socket;

	this.crearPartida=function(numero,nick){
		this.socket.emit("crearPartida",numero,nick);
	}
	this.unirAPartida=function(nick,codigo){
		this.socket.emit("unirAPartida",nick,numero);
	}
	this.iniciarPartida=function(nick,codigo){
		this.socket-emit("iniciarPartida",nick,codigo);
	}
	this.ini=function(){
		//this.socket=io.connect(); //hace una peticion de conexion al servidor que ha creado esto
		//this.lanzarSocketSrv();
	}
	//servidor WS dentro del cliente
	this.lanzarSocketSrv=function(){
		var cli=this;
		this.socket.on('connect', function(){			
			console.log("conectado al servidor de WS");
		});
		this.socket.on('partidaCreada',function(data){
			console.log(data);
		});
		this.socket.on('unidoAPartida'function(data){
			console.log(data);
		});
		this.socket.on('nuevoJugador',function(nick){
			console.log(nick+" se une a la partida");
		});
		this.socket.on('partidaIniciada',function(fase){
			console.log("Partida esta en fase: "+fase);
		});
	}
	this.ini();
}
//boton actualizaar = rest lista de partidas