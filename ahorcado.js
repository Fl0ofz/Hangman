var hombre = new Array("___\n", "   |\n", "   O\n", "  /", "|", "\\\n", "  /", " \\\n", "___")
var palabra
var libreriaPalabras = new Array("c a c h e", "j a v a s c r i p t", "m a l w a r e", "r a n s o m w a r e", "c o r t a f u e g o s",
"n a v e g a d o r", "a r c h i v o", "k e y l o g g e r", "u s b", "x a m p p",
"b l o g g e r", "t i n k e r c a d", "a r d u i n o", "b i t b l o q", "t i m e t o a s t",
"t o k e n", "d e s c o n e c t a r", "p a y p a l", "i n t e r n e t", "d o m i n i o",
"o f f i c e", "h i p e r v i n c u l o", "e n l a c e", "s c r i p t", "o r d e n a d o r", "e x c e l", "o f i m a t i c a", "a r r a y",
"d i s c o r d", "g o o g l e", "m i c r o s o f t", "f i r e f o x", "o p e r a", "c h r o m e", "e d g e", "o n a n i g r a m a", "d a t a s e t", "p o w e r p o i n t", "c a n v a", "a m a z o n")
var partes = 0
var colNueva = 0
var jugando


function ObtienePalabra() {
   //obtiene la palabra para jugar de forma pseudoaleatoria
   var indice = Math.round ( Math.random() * 40 )
   var cadena = new String( libreriaPalabras[indice] )
   palabra = cadena.split(" ")

}


function DibujaHombre(visor, partes) {
   //dibuja el hombre ahorcado
   //partes indica el numero de partes a dibujar
   var dibujo = ""
   if (partes < 10)
      for(var x = 0; x < partes; x++) {
         dibujo += hombre[x]
      }
   visor.displayHombre.value = dibujo
}


function DibujaLetra(visor, letra) {
   //dibuja una letra de la palabra
   //posicion indica donde debe dibujar la letra
   var flag = false 
   //indica si se encontro la letra 
   //obtiene cadena actual
   var cadena = new String(visor.displayPalabra.value)
   //la separa en sus espacios
   var letrasCadena = cadena.split(" ")
   cadena = "" 
   for (var x = 0; x < palabra.length; x++) {
      if (palabra[x] == letra) {
         cadena += letra + " "
         flag = true
      } else
         cadena += letrasCadena[x] + " "
   }
   visor.displayPalabra.value = cadena
   return flag
}


function NuevaLetra(visor, letra) {
   //añade letra lista de letras
   visor.displayLetras.value += letra + " "
   //comprueba si ha de pasar a la siguiente fila
   if(colNueva == 3) {
      visor.displayLetras.value += "\n"
      colNueva = 0
   } else
      colNueva++
}


function Juega(visor, letra) {
   //comprueba si esta jugando
   if (jugando) {
      //ciclo de jugada
      //1. añade letra a la lista
      NuevaLetra(visor, letra)
      //2. dibuja la letra y comprueba si acierto
      var acierto = DibujaLetra(visor, letra)
      //3. si no acierto, dibuja hombre
      if (!acierto)
         DibujaHombre(visor, ++partes)
      //4. comprueba si fin
      if (partes == 9)
         FinJuego(false)
      else if (CompruebaPalabra(visor))
         FinJuego(true)
      } else {
         alert('Pulsa "Juego nuevo" para comenzar\nuna partida nueva.')
   }
}

function IniciaJuego(visor) {
   //inicializa visor y variables globales
   jugando = true
   partes = 0
   colNueva = 0
   ObtienePalabra()
   DibujaHombre(visor, partes)
   visor.displayPalabra.value = ""
   for (var x = 0; x < palabra.length; x++)
      visor.displayPalabra.value += "_ "
   visor.displayLetras.value = ""
}

function CompruebaPalabra(visor) {
   //comprueba si se completo toda la palabra
   var fin = true
   //obtiene cadena actual
   var cadena = new String(visor.displayPalabra.value)
   //la separa en sus espacios
   var letrasCadena = cadena.split(" ")
   for(var x = 0; x < letrasCadena.length; x++)
      if (letrasCadena[x] == "_")
         fin = false
   return fin
}


function FinJuego(resultado) {
   //indica que si se ha perdido o ganado
   var solucion = ""
   jugando = false 
   if (resultado) {
      document.visor.ganadas.value++
      alert("Felicidades, has acertado! :3")
   } else {
     document.visor.perdidas.value++
     //construye la palabra solucion
     for (var x = 0; x < palabra.length; x++)
        solucion += palabra[x]
     alert("Fallaste... :c\n La palabra era: " + solucion)
   }
}

function resetearBotones() {
  var botones = document.querySelectorAll('input[type="button"]');
  for (var i = 0; i < botones.length; i++) {
    botones[i].disabled = false;
    botones[i].style.backgroundColor = '#EFEFEF';
  }
}
