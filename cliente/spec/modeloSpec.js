describe("El juego del impostor", function() {
  var juego;
  var usr;

  beforeEach(function() {
  	juego= new Juego();
  	usr=new Usuario("Pepe",juego);
  });

  it("inicialmente... ", function() {
	expect(Object.keys(juego.partidas).length).toEqual(0);
	expect(usr.nick).toEqual("Pepe");
	expect(usr.juego).not.toBe(undefined);
	});

  it("el usr Pepe crear un partida de 4 jugadores", function(){
  	var codigo=usr.crearPartida(4);
  	expect(codigo).not.toBe(undefined);
  	expect(juego.partidas[codigo].nickOwner).toEqual(usr.nick);
  	expect(juego.partidas[codigo].maximo).toEqual(4);
  	expect(juego.partidas[codigo].fase.nombre).toEqual("inicial");
	});
  it("varios usuarios se unen a la partida",function())


})