// 8. Clase Usuario
class Usuario {
  constructor(nombre, edad, email, activo) {
    this.nombre = nombre;
    this.edad = edad;
    this.email = email;
    this.activo = activo;
  }

  // Método que retorna presentación
  presentar() {
    return "Hola, soy " + this.nombre + " y tengo " + this.edad + " años.";
  }
}

// 9. Array de objetos Usuario generado dinámicamente
const crearArrayUsuarios = (cantidad) => {
  let usuarios = [];
  for (let i = 0; i < cantidad; i++) {
    let nuevoUsuario = new Usuario("Usuario" + (i + 1), Math.floor(Math.random() * 50) + 18, "usuario" + (i + 1) + "@example.com", Math.random() > 0.5);
    usuarios.push(nuevoUsuario);
  }
  return usuarios;
};

// 10. Mostrar tarjetas usando datos de los objetos (métodos de la clase)
const mostrarTarjetasConClase = (usuarios) => {
  let contenedor = document.getElementById("contenedor-tarjetas");
  contenedor.innerHTML = "";

  usuarios.forEach(function (usuario) {
    let tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    let titulo = document.createElement("h2");
    titulo.textContent = usuario.nombre;

    let presentacion = document.createElement("p");
    presentacion.textContent = usuario.presentar();

    let email = document.createElement("p");
    email.textContent = "Email: " + usuario.email;

    let estado = document.createElement("p");
    estado.textContent = "Estado: " + (usuario.activo ? "Activo" : "Inactivo");

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(presentacion);
    tarjeta.appendChild(email);
    tarjeta.appendChild(estado);

    contenedor.appendChild(tarjeta);
  });
};

// Evento del botón
document.getElementById("generar-btn").addEventListener("click", function () {
  let usuarios = crearArrayUsuarios(5);
  mostrarTarjetasConClase(usuarios);
});

// Aplicar estilos al cargar
aplicarEstilos();
