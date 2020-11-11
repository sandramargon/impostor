var modelo=require("./modelo.js");
function servidorWS(){
	this.enviarRemitente=function(socket,mens,datos){
        socket.emit(mens,datos);
    }
    this.enviarRemitente=function(socket,mens,datos){
        socket.emit(mens,datos);
    }
	this.enviarATodos=function(io,nombre,mens,datos){
        io.sockets.in(nombre).emit(mens,datos);
    }
    this.enviarATodosMenosRemitente=function(socket,nombre,mens,datos){
        socket.broadcast.to(nombre).emit(mens,datos);
    }

	this.lanzarSocketSrv=function(io,juego){
		var cli=this;
		io.on('connection',function(socket){		    
		    socket.on('crearPartida', function(numero,nick) {
		        //var usr=new modelo.Usuario(nick);
				var codigo=juego.crearPartida(numero,nick);
				socket.join(codigo);	
		       	cli.enviarRemitente(socket,"partidaCreada",{"codigo":codigo,"owner":nick});		        		        
		    });
		    socket.on('unirAPartida',function(nick,codigo){
		    	//nick nulo o codigo nulo
		    	var res=juego.unirAPartida(nick,codigo);
		    	socket.join(codigo);
		    	var owner=juego.partidas[codigo].nickOwner;
		    	console.log("Usuario "+nick+" se une a partida "+codigo);
		    	cli.enviarRemitente(socket,"unirAPartida",{"codigo":codigo,"owner":owner});
		    	cli.enviarATodosMenosRemitente(socket,codigo,"nuevoJugador",nick);
		    });
		    socket.on('iniciarPartida',function(nick,codigo){
		    	//iniciar partida ToDo
		    	//Controlar si nick es el owner
		    	//cli.enviarATodos(socket,codigo,"partidaIniciada",fase);
		    	juego.iniciarPartida(nick,codigo);
		    	var fase=juego.partidas[codigo].fase.nombre;
		    	cli.enviarATodos(io, codigo, "partidaIniciada", fase);
		    });
		    socket.on('listaPartidasDisponibles',function(){
		    	var lista=juego.listaPartidasDisponibles();
		    	cli.enviarRemitente(socket,"recibirListaPartidasDisponibles",lista);
		    });
		    socket.on('listaPartidasDisponibles',function(){
		    	var lista=juego.listaPartidasDisponibles();
		    	cli.enviarRemitente(socket,"recibirListaPartidas",lista);
		    });
		    socket.on('lanzarVotacion',function(nick,codigo){
		    	juego.lanzarVotacion(nick,codigo);
		    	var partida=juego.partidas[codigo];
		    	cli.enviarATodos(io, codigo, "votacion", partida.fase.nombre);
		    });
		    socket.on('saltarVoto',function(nick,codigo){
		    	var partida=juego.partidas[codigo];
		    	juego.saltarVoto(nick,codigo);
		    	if(partida.todosHanVotado()){
		    		var data={"elegido":partida.elegido,"fase":partida.fase.nombre};
		    		cli.enviarATodos(io, codigo, "finalVotacion", data);
		    	}
		    	else{
		    		cli.enviarATodos(io, codigo, "haVotado", partida.listaHanVotado());
		    	}
		    });
		    socket.on('votar',function(nick,codigo,sospechoso){
		    	var partida=juego.partidas[codigo];
		    	juego.votar(nick,codigo,sospechoso);
		    	if(partida.todosHanVotado()){
		    		var data={"elegido":partida.elegido,"fase":partida.fase.nombre};
		    		cli.enviarATodos(io, codigo, "finalVotacion", data);
		    	}
		    	else{
		    		cli.enviarATodos(io, codigo, "haVotado", partida.listaHanVotado());
		    	}
		    });
		    socket.on('obtenerEncargo',function(nick,codigo){
		    	cli.enviarRemitente(socket,"recibirEncargo",juego.obtenerEncargo(nick,codigo));
		    });
		     
		});
	}
}



module.exports.servidorWS=servidorWS;