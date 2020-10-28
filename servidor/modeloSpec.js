var modelo=require("./modelo.js");

describe("El juego del impostor", function() {
  var juego;
  var usr;

  beforeEach(function() {
  	juego=new modelo.Juego();
  	usr=new modelo.Usuario("pepe",juego);
  });

  it("comprobar valores iniciales del juego", function() {
  	expect(Object.keys(juego.partidas).length).toEqual(0);
  	expect(usr.nick).toEqual("pepe");
  	expect(usr.juego).not.toBe(undefined);
  });
  it("comprobar valores de la partida",function(){
  	var codigo=juego.crearPartida(3,usr);
  	expect(codigo).toEqual("fallo");
  	codigo=juego.crearPartida(11,usr);
  	expect(codigo).toEqual("fallo");
  })

  describe("el usr Pepe crea una partida de 4 jugadores",function(){
	var codigo;
	beforeEach(function() {
	  	codigo=usr.crearPartida(4);
	  	fase = new modelo.Inicial();
	});

	it("se comprueba la partida",function(){ 	
	  	expect(codigo).not.toBe(undefined);
	  	expect(juego.partidas[codigo].nickOwner).toEqual(usr.nick);
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
		usr.iniciarPartida();
		expect(juego.partidas[codigo].fase.nombre).toEqual("jugando");
	});

	describe("durante la partida...",function(){
		var partida;
		beforeEach(function(){
			codigo=usr.crearPartida(4);
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
		partida.usuarios["pepe"].abandonarPartida();
		expect(partida.numeroJugadores()).toEqual(0);
		juego.eliminarPartida(codigo);	
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
		usr.iniciarPartida();
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
		usr.iniciarPartida();
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
		usr.iniciarPartida();
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

		it("votaciones: todos salta el voto, nadie muere, la partida sigue",function(){

		});
		it("votaciones: impostor pillado, la partida termina, gana el pueblo",function(){

		});
		
		
		
	});
  });
})
