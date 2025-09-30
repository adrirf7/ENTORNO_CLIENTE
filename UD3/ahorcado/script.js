let palabraOriginal;
let palabraOculta;
let intentos = 1;
let palabras = [];

window.onload = function () {
  //Llamada a la funcion para generar una palabra al inciar la pagina
  generarPalabra();
};

function generarPalabra() {
  fetch("palabras.json")
    .then((res) => res.json())
    .then((data) => {
      palabras = data.palabras;

      //Extraer una palabra aleatoria del json
      let indice = Math.floor(Math.random() * palabras.length);
      palabraOriginal = palabras[indice];

      palabraOriginal.palabra = palabraOriginal.palabra.toLowerCase(); //Convertir la palabra a minusculas

      //Ocultar la palabra
      palabraOculta = Array(palabraOriginal.palabra.length).fill("_");

      const resultadoDiv = document.getElementById("palabra");
      const tipo_gramatical = document.getElementById("tipo_gramatical");
      const categoria_semantica = document.getElementById(
        "categoria_semantica"
      );

      resultadoDiv.textContent =
        palabraOculta.join(" ") + palabraOriginal.palabra; //Mostrar la palabra oculta
      tipo_gramatical.textContent = palabraOriginal.tipo_gramatical; //Mostrar el tipo de la palabra
      categoria_semantica.textContent = palabraOriginal.categoria_semantica; //Mostar la categoria de la palabra
    });
}

function comprobarPalabra() {
  const mensajeIncorrecto = document.getElementById("mensajeIncorrecto");
  const img = document.getElementById("imgAhorcado");
  const letraInput = document.getElementById("letraInput"); //Entrada del formulario

  letra = letraInput.value;

  //Control de errores para el fromulario
  if (!letra) {
    alert("Ingresa una letra");
    return;
  } else if (!isNaN(letra)) {
    alert("Entrada Invalida: Ingrese una letra");
    return;
  }

  letra.toLowerCase(); //Convertir la palabra a minuscula
  letraInput.value = "";
  let acierto = false;

  //Recorre la palabra y compara cada letra con el input del usuario
  for (let i = 0; i < palabraOriginal.palabra.length; i++) {
    if (palabraOriginal.palabra[i] === letra) {
      palabraOculta[i] = palabraOriginal.palabra[i];
      acierto = true;
    }
  }

  const resultadoDiv = document.getElementById("palabra");
  resultadoDiv.textContent = palabraOculta.join(" "); //Actualiza la palabra con las letras que haya acertado, manteniendo el resto ocultas

  if (!acierto && intentos < 7) {
    mensajeIncorrecto.classList.remove("d-none"); //Muestra mensaje
    intentos++;
    img.src = `./img/ahorcado0${intentos}.png`; //Incrementa la imagen en funcion de los intentos

    if (intentos === 7) {
      mensajeIncorrecto.classList.add("d-none"); //Elimina el mensaje de equivocacion
      document.getElementById("overlayDerrota").style.display = "flex"; //Muestra el overlay de la derrota
      //Muestra la palabra que no acerto el usuario con la primera letra en mayuscula
      const palabraDerrota = document.getElementById("palabraDerrota");
      palabraDerrota.textContent =
        palabraOriginal.palabra.charAt(0).toUpperCase() +
        palabraOriginal.palabra.slice(1);
      return;
    }
  } else if (acierto) {
    mensajeIncorrecto.classList.add("d-none"); //Elimina el mensaje de fallo
    //Si la lapabra no contiene ningun "_" significa que ha sido acertada
    if (!palabraOculta.includes("_")) {
      document.getElementById("overlayVictoria").style.display = "flex"; //Muestra el overlay de la victoria
      return;
    }
  }
}

function cerrarOverlay(id) {
  document.getElementById(id).style.display = "none"; //Cierra el overlay
  generarPalabra(); //Genera una nueva palabra
}
