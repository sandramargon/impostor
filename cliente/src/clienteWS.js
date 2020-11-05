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
	}
	this.ini();
}
//boton actualizaar = rest lista de partidas

function pruebasWS(codigo){
	var ws2=new clienteWS();
	var ws3=new clienteWS();
	var ws4=new clienteWS();
	//var codigo=ws.codigo;

	ws2.unirAPartida("Juani",codigo);
	ws3.unirAPartida("Juana",codigo);
	ws4.unirAPartida("Juanan",codigo);

	//ws.iniciarPartida();
}