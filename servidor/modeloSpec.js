var modelo=require("./modelo.js");

describe("El juego del impostor", function() {
  var juego;
  //var usr;
  var nick;

  beforeEach(function() {
  	juego=new modelo.Juego();
  	//usr=new modelo.Usuario("pepe",juego);
  	nick="pepe";
  });

  it("comprobar valores iniciales del juego", function() {
  	expect(Object.keys(juego.partidas).length).toEqual(0);
  	expect(nick).toEqual("pepe");
  	//expect(usr.juego).not.toBe(undefined);
  });
  it("comprobar valores de la partida",function(){
  	var codigo=juego.crearPartida(3,nick);
  	expect(codigo).toEqual("fallo");
  	codigo=juego.crearPartida(11,nick);
  	expect(codigo).toEqual("fallo");
  })

  describe("el usr Pepe crea una partida de 4 jugadores",function(){
	var codigo;
	beforeEach(function() {
	  	codigo=juego.crearPartida(4,nick);
	  	fase = new modelo.Inicial();
	});

	it("se comprueba la partida",function(){ 	
	  	expect(codigo).not.toBe(undefined);
	  	expect(juego.partidas[codigo].nickOwner).toEqual(nick);
	  	expect(juego.partidas[codigo].maximo).toEqual(4);
	  	expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
	 	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(1);
	  });

	it("varios usuarios se unen a la partida",function(){
		juego.unirAPartida(codigo,"ana");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");
	  });

	it("Pepe inicia la partida",function(){
		juego.unirAPartida(codigo,"ana");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		juego.iniciarPartida(nick,codigo);
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
	});

	describe("durante la partida...",function(){
		var partida;
		beforeEach(function(){
			codigo=juego.crearPartida(4,nick);
	  		fase = new modelo.Inicial();
	  		partida = juego.partidas[codigo];
		});

		it("abandonar partida",function(){
		juego.unirAPartida(codigo,"ana");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		//usr.iniciarPartida();
		//expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		var partida=juego.partidas[codigo];
		partida.usuarios["tomas"].abandonarPartida();
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		partida.usuarios["isa"].abandonarPartida();
		partida.usuarios["ana"].abandonarPartida();
		partida.usuarios[nick].abandonarPartida();
		expect(partida.numeroJugadores()).toEqual(0);
		//juego.eliminarPartida(codigo);	
		expect(juego.partidas[codigo]).toBe(undefined);
		});

		it("comprobar que hay un impostor",function(){
		juego.unirAPartida(codigo,"ana");
		var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		juego.iniciarPartida(nick,codigo);
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		var impostor = juego.partidas[codigo].numeroImpostoresVivos();
		expect(impostor).toEqual(1);
		});

		it("el impostor ataca, muere un ciudadano",function(){
		juego.unirAPartida(codigo,"ana");
		var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		juego.iniciarPartida(nick,codigo);
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		var impostor = juego.partidas[codigo].numeroImpostoresVivos();
		expect(impostor).toEqual(1);
		var numJugadores = juego.partidas[codigo].numeroCiudadanosVivos();
		expect(numJugadores).toEqual(3);
		var imp;
		var ciu;
		for(key in juego.partidas[codigo].usuarios){
			if(juego.partidas[codigo].usuarios[key].impostor==true){
				imp=juego.partidas[codigo].usuarios[key];
			} else {
				ciu=juego.partidas[codigo].usuarios[key];
			}
		}
		imp.matar(ciu.nick);
		numJugadores = juego.partidas[codigo].numeroCiudadanosVivos();
		expect(numJugadores).toEqual(2);
		});

		it("ganan impostores",function(){
		juego.unirAPartida(codigo,"ana");
		var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(2);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
		juego.unirAPartida(codigo,"isa");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(3);
		expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");	  	
		juego.unirAPartida(codigo,"tomas");
	  	var num=Object.keys(juego.partidas[codigo].usuarios).length;
	  	expect(num).toEqual(4);
		expect(juego.partidas[codigo].fase.nombre).toEqual("completado");		
		juego.iniciarPartida(nick,codigo);
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
		var impostor = juego.partidas[codigo].numeroImpostoresVivos();
		expect(impostor).toEqual(1);
		var numJugadores = juego.partidas[codigo].numeroCiudadanosVivos();
		expect(numJugadores).toEqual(3);
		var imp;
		for(key in juego.partidas[codigo].usuarios){
			if(juego.partidas[codigo].usuarios[key].impostor==true){
				imp=juego.partidas[codigo].usuarios[key];
			}
		}
		for(key in juego.partidas[codigo].usuarios){
			if(juego.partidas[codigo].usuarios[key].impostor==false){
				imp.matar(juego.partidas[codigo].usuarios[key].nick);
			}
		}
		
		expect(juego.partidas[codigo].gananImpostores()).toBe(true);
		});

		it("votaciones: impostor pillado, la partida termina, gana el pueblo",function(){

		});
		describe("las votaciones",function(){
		beforeEach(function(){
			juego.unirAPartida(codigo,"ana");
			juego.unirAPartida(codigo,"isa");
			juego.unirAPartida(codigo,"tomas");
			juego.iniciarPartida(nick,codigo);
			});
			it("todos skipean",function(){
				var partida=juego.partidas[codigo];
				juego.lanzarVotacion(nick,codigo);
				expect(partida.fase.nombre).toEqual("votacion");
				juego.saltarVoto(nick,codigo);
				expect(partida.fase.nombre).toEqual("votacion");
				juego.saltarVoto("ana",codigo);
				expect(partida.fase.nombre).toEqual("votacion");
				juego.saltarVoto("isa",codigo);
				expect(partida.fase.nombre).toEqual("votacion");
				juego.saltarVoto("tomas",codigo);
				expect(partida.fase.nombre).toEqual("jugando");
			});
			it("se vota y mata a un inocente",function(){
				var partida=juego.partidas[codigo];
				juego.lanzarVotacion(nick,codigo);
				partida.usuarios[nick].impostor=true;
				partida.usuarios["ana"].impostor=false;
				partida.usuarios["isa"].impostor=false;
				partida.usuarios["tomas"].impostor=false;
				expect(partida.fase.nombre).toEqual("votacion");
				juego.votar(nick,codigo,"tomas");
				expect(partida.fase.nombre).toEqual("votacion");
				juego.votar("ana",codigo,"tomas");
				expect(partida.fase.nombre).toEqual("votacion");
				juego.votar("isa",codigo,"tomas");
				expect(partida.fase.nombre).toEqual("votacion");
				juego.votar("tomas",codigo,"isa");
				expect(partida.usuarios["tomas"].estado.vida).toEqual("muerto");
				expect(partida.fase.nombre).toEqual("jugando");
			});
			it("se vota y mata al impostor",function(){
				var partida=juego.partidas[codigo];
				juego.lanzarVotacion(nick,codigo);
				partida.usuarios[nick].impostor=true;
				partida.usuarios["ana"].impostor=false;
				partida.usuarios["isa"].impostor=false;
				partida.usuarios["tomas"].impostor=false;
				expect(partida.fase.nombre).toEqual("votacion");
				juego.votar(nick,codigo,"tomas");
				expect(partida.fase.nombre).toEqual("votacion");
				juego.votar("ana",codigo,nick);
				expect(partida.fase.nombre).toEqual("votacion");
				juego.votar("isa",codigo,nick);
				expect(partida.fase.nombre).toEqual("votacion");
				juego.votar("tomas",codigo,nick);
				expect(partida.usuarios[nick].estado.vida).toEqual("muerto");
				expect(partida.fase.nombre).toEqual("final");
			});
			it("impostor mata a todos y gana", function(){
				var partida=juego.partidas[codigo];

				partida.usuarios[nick].impostor=true;
				partida.usuarios["ana"].impostor=false;
				partida.usuarios["isa"].impostor=false;
				partida.usuarios["tomas"].impostor=false;
				
				juego.matar(nick,codigo,"ana");
				expect(partida.usuarios["ana"].estado.vida).toEqual("muerto");
				expect(partida.fase.nombre).toEqual("jugando");
				juego.matar(nick,codigo,"isa");
				expect(partida.usuarios["isa"].estado.vida).toEqual("muerto");
				expect(partida.fase.nombre).toEqual("final");

			})
		});
	});
  });
})
