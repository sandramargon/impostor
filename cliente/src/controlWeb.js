function controlWeb($) {
    this.mostrarCrearPartida = function() {
        var cadena = '<div id="mostrarCrearPartida">';
        cadena = cadena + '<div class="form-group">';
        cadena = cadena + '<label for="nick" style="color:white">Nick:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '</div>';
        cadena = cadena + '<div class="form-group">';
        cadena = cadena + '<label for="num" style="color:white">Número:</label>';
        cadena = cadena + '<input type="number" min="4" max="10" value="4" class="form-control" id="num">';
        cadena = cadena + '</div>';
        cadena = cadena + '<button type="button" class="btn btn-warning" id="btnCrearPartida">Crear Partida</button>';
        cadena = cadena + '</div>';

        $('#crearPartida').append(cadena);

        $('#btnCrearPartida').on('click', function() {
            var nick = $('#nick').val();
            var num = $('#num').val();
            $('#mostrarCrearPartida').remove();
            if(nick!="" && num){
            	ws.crearPartida(num,nick);
        	}
        });
    }
    this.limpiar=function(){
    	$('#mER').remove();
    	$('#mostrarCrearPartida').remove();
    	$('#mUAP').remove();
    }
    this.mostrarEsperandoRival = function() {
    	//$('#mER').remove();
    	//this.limpiar();    	
    	$('#mUAP').remove();
    	$('#mER').remove();

        var cadena = '<div id="mER">';
        cadena=cadena+'<h2 style="color:black"><strong>Please wait...</strong></h2>'
    	cadena=cadena+'<img src="cliente/img/impRun.gif">';
		cadena = cadena + '</div>';
        $('#esperando').append(cadena);
    } 

    this.mostrarUnirAPartida = function(lista) {
    	$('mUAP').remove();
    	var cadena='<div id=mUAP">';
    	cadena=cadena+'<div class="list-group">';
    	for(var i=0; i<lista.length;i++){
			var maximo=lista[i].maximo;
			var numJugadores=maximo-lista[i].huecos;
			cadena = cadena + '<a href="#" value="' + lista[i].codigo + '" class="list-group-item">' + lista[i].codigo + ' huecos: <span class="badge badge-warning">'+numJugadores+'/'+maximo+'</span></a>';    	
		}
    	cadena=cadena+'</div>';
    	cadena=cadena+'<button type="button" class="btn btn-warning" id="btnUnir" >Unir a Partida</button>';
    	cadena=cadena+'</div>';

    	$('#unirAPartida').append(cadena);

 		StoreValue = []; 
    	$('.list-group a').click(function(){
        	StoreValue = [];
        	StoreValue.push($(this).attr('value')); // add text to array
    	});


    	$('#btnUnir').on('click', function() {
            var nick = $('#nick').val();
            var codigo=StoreValue[0];
            $('#mUAP').remove();
            if(nick!="" && codigo){
            	ws.unirAPartida(codigo,nick);
            }
            
        });
    }
}//badgets