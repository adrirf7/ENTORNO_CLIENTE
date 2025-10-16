let nombre = "";

// Mostrar saludo si ya hay un nombre guardado
window.onload = () => {
  const guardado = localStorage.getItem("nombreUsuario");
  if (guardado) {
    document.getElementById("bienvenida").innerHTML = `Bienvenido de nuevo, <b>${guardado}</b>!`;
  }
};

// Función principal de saludo
const Saludo = () => {
  const saludoNombre = document.getElementById("bienvenida");
  const body = document.getElementById("body");
  const fecha = new Date();

  nombre = prompt("Introduce tu nombre");
  if (!nombre) {
    alert("Por favor introduce un nombre");
    return;
  }

  // Guardamos el nombre en localStorage
  localStorage.setItem("nombreUsuario", nombre);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // +1 porque enero = 0
  const year = fecha.getFullYear();

  //Colores para el texto y el body
  const coloresText = ["red", "blue", "green", "orange", "purple", "pink"];
  const coloresBody = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5", "#FFD433"];

  //Extraemos un color aleatorio para cada uno
  let randomText = coloresText[Math.floor(Math.random() * coloresText.length)];
  let randomBody = coloresBody[Math.floor(Math.random() * coloresBody.length)];

  //Establecemos el color aleatorio extraido
  saludoNombre.style.color = randomText;
  body.style.backgroundColor = randomBody;

  let salida = `Bienvenido ${nombre}. Hoy es ${dia}/${mes}/${year}`;
  saludoNombre.innerHTML = salida; //Mostrar la salida
};

// Abrir popup
const PopUp = () => {
  window.open("PopUp.html", "popup", "width=400,height=300");
};

// Borrar datos de localStorage
const BorrarDatos = () => {
  localStorage.clear();
  alert("Datos borrados correctamente");
  document.getElementById("bienvenida").innerHTML = "";
};

// Recargar la página
const Recargar = () => {
  location.reload();
};
