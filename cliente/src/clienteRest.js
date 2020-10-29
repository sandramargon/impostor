function clienteRest(){
	this.crearPartida=function(num,owner){
		$.getJSON("/crearPartida/"+num+"/"+owner,function(data){    
    		console.log(data);
		});

	this.unirAPartida=function(nick,codigo){
		$.getJSON("/unirAPartida/"+nick+"/"+codigo,function(data){    
    		console.log(data);
		});

	this.listaPartidas=function(){
		$.getJSON("/listaPartidas",function(lista){    
    		console.log(lista);
		});

}}}}