// ============================================================================
// 1. CLASE LIBRO
// ============================================================================

/**
 * Clase que representa un libro
 */
class Libro {
  constructor(titulo, autor, anioPublicacion, genero, isbn) {
    this.titulo = titulo;
    this.autor = autor;
    this.anioPublicacion = anioPublicacion;
    this.genero = genero;
    this.isbn = isbn;
  }
}

// ============================================================================
// 2. CLASE BIBLIOTECA (Patrón Singleton)
// ============================================================================

/**
 * Clase Biblioteca con patrón Singleton
 * Solo permite una instancia única
 */
class Biblioteca {
  static instancia = null;

  constructor() {
    if (Biblioteca.instancia) {
      return Biblioteca.instancia;
    }
    this.libros = [];
    this.cargarDesdeLocalStorage();
    Biblioteca.instancia = this;
  }

  /**
   * Obtener la única instancia de la biblioteca (Singleton)
   */
  static obtenerInstancia() {
    if (!Biblioteca.instancia) {
      Biblioteca.instancia = new Biblioteca();
    }
    return Biblioteca.instancia;
  }

  // ------------------------------------------------------------------------
  // Métodos CRUD
  // ------------------------------------------------------------------------

  /**
   * Añadir un libro a la colección
   */
  añadirLibro(libro) {
    // Verificar que no exista el ISBN
    const existe = this.libros.some((l) => l.isbn === libro.isbn);
    if (existe) {
      alert("Ya existe un libro con ese ISBN");
      return false;
    }
    this.libros.push(libro);
    this.guardarEnLocalStorage();
    return true;
  }

  /**
   * Buscar libro por título o ISBN usando filter()
   */
  buscarLibro(criterio) {
    return this.libros.filter((libro) => libro.titulo.toLowerCase().includes(criterio.toLowerCase()) || libro.isbn.includes(criterio));
  }

  /**
   * Listar todos los libros
   */
  listarTodosLosLibros() {
    return this.libros;
  }

  /**
   * Eliminar un libro por ISBN
   */
  eliminarLibro(isbn) {
    const index = this.libros.findIndex((libro) => libro.isbn === isbn);
    if (index !== -1) {
      this.libros.splice(index, 1);
      this.guardarEnLocalStorage();
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------------------
  // LocalStorage - Persistencia de datos
  // ------------------------------------------------------------------------

  /**
   * Guardar libros en localStorage
   */
  guardarEnLocalStorage() {
    localStorage.setItem("bibliotecaLibros", JSON.stringify(this.libros));
  }

  /**
   * Cargar libros desde localStorage
   */
  cargarDesdeLocalStorage() {
    const datos = localStorage.getItem("bibliotecaLibros");
    if (datos) {
      const librosData = JSON.parse(datos);
      this.libros = librosData.map((l) => new Libro(l.titulo, l.autor, l.anioPublicacion, l.genero, l.isbn));
    }
  }

  // ------------------------------------------------------------------------
  // 3. Estadísticas usando map(), filter(), reduce()
  // ------------------------------------------------------------------------

  /**
   * Obtener estadísticas de la biblioteca
   */
  obtenerEstadisticas() {
    if (this.libros.length === 0) {
      return null;
    }

    return {
      total: this.libros.length,
      librosPorGenero: this.contarPorGenero(),
      mediaAntiguedad: this.calcularMediaAntiguedad(),
    };
  }

  /**
   * Contar libros por género usando reduce()
   */
  contarPorGenero() {
    return this.libros.reduce((acc, libro) => {
      acc[libro.genero] = (acc[libro.genero] || 0) + 1;
      return acc;
    }, {});
  }

  /**
   * Calcular media de antigüedad usando map() y reduce()
   */
  calcularMediaAntiguedad() {
    const anioActual = new Date().getFullYear();
    // Usar map() para obtener las antigüedades
    const antiguedades = this.libros.map((libro) => anioActual - libro.anioPublicacion);
    // Usar reduce() para sumar y calcular la media
    const suma = antiguedades.reduce((acc, edad) => acc + edad, 0);
    return Math.round(suma / this.libros.length);
  }
}

// ============================================================================
// 5. INTERFAZ DE USUARIO
// ============================================================================

// Obtener instancia única de la biblioteca
const biblioteca = Biblioteca.obtenerInstancia();

// Elementos del DOM
const formLibro = document.getElementById("formLibro");
const btnBuscar = document.getElementById("btnBuscar");
const btnListarTodos = document.getElementById("btnListarTodos");
const btnEstadisticas = document.getElementById("btnEstadisticas");
const listaLibros = document.getElementById("listaLibros");
const estadisticas = document.getElementById("estadisticas");

// Event Listeners
formLibro.addEventListener("submit", añadirLibro);
btnBuscar.addEventListener("click", buscarLibros);
btnListarTodos.addEventListener("click", listarTodos);
btnEstadisticas.addEventListener("click", mostrarEstadisticas);

/**
 * Añadir un libro desde el formulario
 */
function añadirLibro(e) {
  e.preventDefault();

  const libro = new Libro(
    document.getElementById("titulo").value,
    document.getElementById("autor").value,
    parseInt(document.getElementById("anioPublicacion").value),
    document.getElementById("genero").value,
    document.getElementById("isbn").value
  );

  if (biblioteca.añadirLibro(libro)) {
    alert("Libro añadido correctamente");
    formLibro.reset();
    listarTodos();
  }
}

/**
 * Buscar libros
 */
function buscarLibros() {
  const criterio = document.getElementById("busqueda").value;
  if (!criterio) {
    alert("Introduce un criterio de búsqueda");
    return;
  }
  const resultados = biblioteca.buscarLibro(criterio);
  mostrarLibros(resultados);
}

/**
 * Listar todos los libros
 */
function listarTodos() {
  const libros = biblioteca.listarTodosLosLibros();
  mostrarLibros(libros);
  estadisticas.innerHTML = "";
}

/**
 * Mostrar libros en la interfaz
 */
function mostrarLibros(libros) {
  if (libros.length === 0) {
    listaLibros.innerHTML = '<p class="vacio">No hay libros para mostrar</p>';
    return;
  }

  listaLibros.innerHTML = libros
    .map(
      (libro) => `
        <div class="libro">
            <h3>${libro.titulo}</h3>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Año:</strong> ${libro.anioPublicacion}</p>
            <p><strong>Género:</strong> ${libro.genero}</p>
            <p><strong>ISBN:</strong> ${libro.isbn}</p>
            <button onclick="eliminarLibro('${libro.isbn}')">Eliminar</button>
        </div>
    `
    )
    .join("");
}

/**
 * Eliminar un libro
 */
function eliminarLibro(isbn) {
  if (confirm("¿Eliminar este libro?")) {
    biblioteca.eliminarLibro(isbn);
    listarTodos();
  }
}

/**
 * Mostrar estadísticas
 */
function mostrarEstadisticas() {
  const stats = biblioteca.obtenerEstadisticas();

  if (!stats) {
    estadisticas.innerHTML = '<p class="vacio">No hay datos</p>';
    return;
  }

  // Mostrar libros por género
  const generosHTML = Object.entries(stats.librosPorGenero)
    .map(([genero, cantidad]) => `${genero}: ${cantidad}`)
    .join(", ");

  estadisticas.innerHTML = `
        <div class="stat"><strong>Total de libros:</strong> ${stats.total}</div>
        <div class="stat"><strong>Libros por género:</strong> ${generosHTML}</div>
        <div class="stat"><strong>Media de antigüedad:</strong> ${stats.mediaAntiguedad} años</div>
    `;
}

// Mostrar libros al cargar
listarTodos();

// ============================================================================
// LIBROS PRECARGADOS (si no hay datos en localStorage)
// ============================================================================

/**
 * Inicializar con libros de ejemplo si la biblioteca está vacía
 */
function inicializarLibrosEjemplo() {
  if (biblioteca.listarTodosLosLibros().length === 0) {
    const librosEjemplo = [
      new Libro("Cien años de soledad", "Gabriel García Márquez", 1967, "Ficción", "978-0-06-088328-7"),
      new Libro("1984", "George Orwell", 1949, "Ciencia Ficción", "978-0-452-28423-4"),
      new Libro("El Quijote", "Miguel de Cervantes", 1605, "Ficción", "978-84-376-0494-7"),
      new Libro("Clean Code", "Robert C. Martin", 2008, "Técnico", "978-0-13-235088-4"),
      new Libro("El Hobbit", "J.R.R. Tolkien", 1937, "Fantasía", "978-0-547-92822-7"),
    ];

    librosEjemplo.forEach((libro) => biblioteca.añadirLibro(libro));
    listarTodos();
    console.log("✅ Libros de ejemplo cargados");
  }
}

// Inicializar libros de ejemplo
inicializarLibrosEjemplo();
