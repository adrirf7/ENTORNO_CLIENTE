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
  const contenedor = document.querySelector("#contenedor-tarjetas");
  contenedor.innerHTML = "";

  usuarios.forEach(function (usuario) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    const titulo = document.createElement("h2");
    titulo.textContent = usuario.nombre;

    const presentacion = document.createElement("p");
    presentacion.textContent = usuario.presentar();

    const email = document.createElement("p");
    email.textContent = "Email: " + usuario.email;

    const estado = document.createElement("p");
    estado.textContent = "Estado: " + (usuario.activo ? "Activo" : "Inactivo");

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(presentacion);
    tarjeta.appendChild(email);
    tarjeta.appendChild(estado);

    contenedor.appendChild(tarjeta);
  });
};

// Evento del botón
document.querySelector("#generar-btn").addEventListener("click", () => {
  let usuarios = crearArrayUsuarios(5);
  mostrarTarjetasConClase(usuarios);
});
