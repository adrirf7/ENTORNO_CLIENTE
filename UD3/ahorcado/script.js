let palabraOriginal;
let palabraOculta;
let intentos = 1;
let palabras = [];
let palabrasAcertadas = 0;
let palabrasFalladas = 0;
const img = document.getElementById("imgAhorcado");
const mensajeIncorrecto = document.getElementById("mensajeIncorrecto");

window.onload = function () {
  generarPalabra();
  mostrarAbecedario();
  Mostrarcontador();
};

function generarPalabra() {
  intentos = 1; //Reiniciar intentos
  reiniciarAbecedario(); //Reinicar el abecedario

  fetch("palabras.json")
    .then((res) => res.json())
    .then((data) => {
      palabras = data.palabras;

      //Extraer una palabra aleatoria del json
      let indice = Math.floor(Math.random() * palabras.length);
      palabraOriginal = palabras[indice];

      //Ocultar la palabra
      palabraOculta = Array(palabraOriginal.palabra.length).fill("_");

      const resultadoDiv = document.getElementById("palabra");
      const tipo_gramatical = document.getElementById("tipo_gramatical");
      const categoria_semantica = document.getElementById("categoria_semantica");
      resultadoDiv.textContent = palabraOculta.join(" "); //Mostrar la palabra oculta
      tipo_gramatical.textContent = palabraOriginal.tipo_gramatical; //Mostrar el tipo de la palabra
      categoria_semantica.textContent = palabraOriginal.categoria_semantica; //Mostar la categoria de la palabra

      img.src = "./img/ahorcado01.png"; //Resetea el ahorcado
      mensajeIncorrecto.classList.add("d-none"); //Limpia las alertas
    });
}

function comprobarPalabra() {
  const letraInput = document.getElementById("letraInput"); //Entrada del formulario

  letra = letraInput.value.toUpperCase();

  //Control de errores para el fromulario
  if (!letra) {
    alert("Ingresa una letra");
    return;
  } else if (!isNaN(letra)) {
    alert("Entrada Invalida: Ingrese una letra");
    return;
  }

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
    marcarletraIncorrecta(letra); //Marcar la letra incorrecta

    //Fin del juego
    if (intentos === 7) {
      mensajeIncorrecto.classList.add("d-none"); //Elimina el mensaje de equivocacion
      document.getElementById("overlayDerrota").style.display = "flex"; //Muestra el overlay de la derrota

      //Muestra la palabra que no acerto el usuario con la primera letra en mayuscula
      const palabraDerrota = document.getElementById("palabraDerrota");
      palabraDerrota.textContent = palabraOriginal.palabra;
      palabrasFalladas += 1; //Suma 1 al contador de palabras falladasa
      return;
    }
  } else if (acierto) {
    mensajeIncorrecto.classList.add("d-none"); //Elimina el mensaje de fallo
    //Si la lapabra no contiene ningun "_" significa que ha sido acertada
    if (!palabraOculta.includes("_")) {
      document.getElementById("overlayVictoria").style.display = "flex"; //Muestra el overlay de la victoria
      palabrasAcertadas += 1; //Suma 1 al contador de palabras acertadas
      return;
    }
  }
}

function cerrarOverlay(id) {
  document.getElementById(id).style.display = "none"; //Cierra el overlay
  generarPalabra(); //Genera una nueva palabra
  reiniciarAbecedario(); //Reinicar el abecedario
  Mostrarcontador(); //Actuializa el contador
}

function mostrarAbecedario() {
  const mostrarAbecedario = document.getElementById("mostrarAbecedario");
  const abecedario = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  abecedario.forEach((letra) => {
    const span = document.createElement("span");
    span.textContent = letra;
    span.id = `letra-${letra}`; //Asignar un id unico
    span.style.margin = "5px ";
    mostrarAbecedario.appendChild(span);
  });
}

function marcarletraIncorrecta(letra) {
  const span = document.getElementById(`letra-${letra}`);
  span.style.color = "#FF6467";
  span.style.textDecoration = "line-through";
}

function reiniciarAbecedario() {
  const mostrarAbecedario = document.getElementById("mostrarAbecedario");
  const spans = mostrarAbecedario.querySelectorAll("span");

  spans.forEach((span) => {
    span.style.color = "black"; // volver al color original
    span.style.textDecoration = "none"; // quitar el tachado
  });
}

function Mostrarcontador() {
  const aciertos = document.getElementById("aciertos");
  const fallos = document.getElementById("fallos");

  aciertos.textContent = "Palabras Acertadas: " + palabrasAcertadas;
  fallos.textContent = "Palabras Falladas: " + palabrasFalladas;
}
