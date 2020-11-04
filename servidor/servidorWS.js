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
		        var usr=new modelo.Usuario(nick);
				var codigo=juego.crearPartida(numero,usr);
				socket.join(codigo);	
		       	cli.enviarRemitente(socket,"partidaCreada",{"codigo":codigo,"owner":nick});		        		        
		    });
		    socket.on('unirAPartida',function(nick,codigo){
		    	//nick nulo o codigo nulo
		    	var res=juego.unirAPartida(nick,codigo);
		    	socket.join(codigo);
		    	var owner=juego.juego.partidas[codigo].nickOwner;
		    	console.log("Usuario "+nick+" se une a partida "+codigo);
		    	cli.enviarRemitente(socket,"unirAPartida",{"codigo":codigo,"owner":owner});
		    	cli.enviarATodosMenosRemitente(socket,codigo,"nuevoJugador",nick);
		    });
		    socket.on('iniciarPartida',function(nick,codigo){
		    	//iniciar partida ToDo
		    	//Controlar si nick es el owner
		    	//cli.enviarATodos(socket,codigo,"partidaIniciada",fase);
		    });
		});
	}
}



module.exports.servidorWS=servidorWS;