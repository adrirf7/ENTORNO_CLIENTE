let palabraOriginal;
let palabraOculta;
let intentos = 1;

window.onload = function () {
  generarPalabra();
};

function generarPalabra() {
  fetch("palabras.txt")
    .then((res) => res.text())
    .then((texto) => {
      const palabras = texto
        .split(/\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean);

      let indice = Math.floor(Math.random() * palabras.length);
      palabraOriginal = palabras[indice];
      palabraOculta = Array(palabraOriginal.length).fill("_");

      const resultadoDiv = document.getElementById("palabra");
      resultadoDiv.textContent = palabraOculta.join(" ");
    });
}

function comprobarPalabra() {
  const mensajeAdivinado = document.getElementById("mensajeAdivinado");
  const mensajeIncorrecto = document.getElementById("mensajeIncorrecto");
  const img = document.getElementById("imgAhorcado");

  const letraInput = document.getElementById("letraInput");
  letra = letraInput.value.toLowerCase();
  letraInput.value = "";
  let acierto = false;

  for (let i = 0; i < palabraOriginal.length; i++) {
    if (palabraOriginal[i] === letra) {
      palabraOculta[i] = palabraOriginal[i];
      acierto = true;
    }
  }

  const resultadoDiv = document.getElementById("palabra");
  resultadoDiv.textContent = palabraOculta.join(" ");

  if (!acierto) {
    mensajeIncorrecto.classList.remove("d-none");
    intentos++;
    img.src = `./img/ahorcado0${intentos}.png`;
  } else if (acierto) {
    mensajeIncorrecto.classList.add("d-none");
    if (!palabraOculta.includes("_")) {
      mensajeAdivinado.classList.remove("d-none");
    }
  }
}
