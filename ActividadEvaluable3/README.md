# 📚 Sistema de Gestión de Biblioteca

Sistema de gestión de biblioteca desarrollado con JavaScript, HTML y CSS.

## 📋 Descripción

Proyecto que implementa un sistema completo para gestionar una biblioteca de libros utilizando:
- Programación Orientada a Objetos (POO)
- Patrón de diseño Singleton
- Operaciones funcionales (map, filter, reduce)
- Persistencia de datos con localStorage

## 🎯 Funcionalidades

### 1. Clase Libro
Representa un libro con las siguientes propiedades:
- Título
- Autor
- Año de publicación
- Género
- ISBN

### 2. Clase Biblioteca (Patrón Singleton)
Gestiona la colección de libros con los siguientes métodos:
- **Añadir libro**: Agrega un nuevo libro validando que el ISBN sea único
- **Buscar libro**: Búsqueda por título o ISBN usando `filter()`
- **Listar todos**: Muestra todos los libros de la biblioteca
- **Eliminar libro**: Elimina un libro por su ISBN
- **Estadísticas**: Genera estadísticas usando `map()` y `reduce()`

### 3. Operaciones Agregadas
- `filter()`: Para búsquedas y filtrado de libros
- `map()`: Para transformar datos y calcular antigüedades
- `reduce()`: Para contar libros por género y calcular promedios

### 4. Persistencia de Datos
- Almacenamiento automático en **localStorage**
- Los datos se guardan al añadir o eliminar libros
- Se cargan automáticamente al iniciar la aplicación

### 5. Libros Precargados
Si la biblioteca está vacía, se cargan automáticamente 5 libros de ejemplo:
- Cien años de soledad
- 1984
- El Quijote
- Clean Code
- El Hobbit

## 🚀 Cómo usar

1. Abrir el archivo `index.html` en un navegador web
2. Usar el formulario para añadir nuevos libros
3. Buscar libros por título o ISBN
4. Ver estadísticas de la biblioteca
5. Eliminar libros con el botón correspondiente

## 🔧 Estructura del Proyecto

```
ActividadEvaluable3/
├── index.html      # Interfaz de usuario
├── style.css       # Estilos CSS
├── script.js       # Lógica JavaScript
└── README.md       # Documentación
```

## 📊 Estadísticas Disponibles

- Total de libros en la biblioteca
- Distribución de libros por género
- Media de antigüedad de los libros

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript (ES6+)
- localStorage API

## 🐛 Depuración

Para depurar el código:
1. Abrir las herramientas de desarrollo del navegador (F12)
2. Usar la pestaña **Console** para ver logs
3. Usar la pestaña **Sources** para establecer breakpoints
4. Usar la pestaña **Application > Local Storage** para ver datos guardados

## 💡 Patrón Singleton

La clase Biblioteca implementa el patrón Singleton para garantizar que solo exista una instancia de la biblioteca en toda la aplicación:

```javascript
const biblioteca = Biblioteca.obtenerInstancia();
```

## 📝 Notas

- Los datos persisten entre sesiones gracias a localStorage
- El ISBN debe ser único para cada libro
- Todos los campos del formulario son obligatorios
- La búsqueda no distingue entre mayúsculas y minúsculas
