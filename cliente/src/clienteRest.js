function clienteRest(){

	this.crearPartida=function(num,owner,callback){
		$.getJSON("/crearPartida/"+num+"/"+owner,function(data){    
    		console.log(data);
    		callback(data); //definida en las pruebas abajo
    		//parar ruleta
		});
		//ruleta
	}

	this.unirAPartida=function(nick,codigo){
		$.getJSON("/unirAPartida/"+nick+"/"+codigo,function(data){    
    		console.log(data);
		});
	}

	this.listaPartidasDisponibles=function(){
		$.getJSON("/listaPartidasDisponibles",function(lista){    
    		console.log(lista);
		});
	}

	this.iniciarPartida=function(nick,codigo){
		$.getJSON("/iniciarPartida/"+nick+"/"+codigo,function(data){    
    		console.log(data);
		});
	}
}

function pruebas(){
	var codigo=undefined;
	rest.crearPartida(3,"pepe",function(data){
		codigo=data.codigo;		
	});
	rest.crearPartida(4,"pepe",function(data){
		codigo=data.codigo;
		rest.unirAPartida("juan",codigo);
		rest.unirAPartida("juani",codigo);
		rest.unirAPartida("juana",codigo);
		rest.unirAPartida("juanma",codigo);
	});
	rest.crearPartida(5,"pepe",function(data){
		codigo=data.codigo;
		rest.unirAPartida("juan",codigo);
		rest.unirAPartida("juani",codigo);
		rest.unirAPartida("juana",codigo);
		rest.unirAPartida("juanma",codigo);
	});
	
//agregar otras partidas de 6, 7… hasta 10 jugadores
}
