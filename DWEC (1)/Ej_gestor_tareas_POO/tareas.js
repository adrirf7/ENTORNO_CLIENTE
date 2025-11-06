// Función para generar ID único simple
function generarID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}


class Tarea {
  constructor(descripcion, prioridad = "media") {
    this.id = generarID();           // ID único para cada tarea
    this.id = crypto.randomUUID();
    this.descripcion = descripcion;
    this.prioridad = prioridad;
    this.completada = false;
    this.fechaCreacion = new Date();
  }

  marcarCompletada() { this.completada = true; }
  mostrarInfo() {
    return `${this.descripcion} [${this.prioridad}] - ${this.completada ? "✔️ completada" : "⏳ pendiente"} (${this.fechaCreacion.toLocaleDateString()})`;
  }
}

class GestorTareas {
  constructor() { this.tareas = []; }

  añadirTarea(tarea) { if (tarea instanceof Tarea) this.tareas.push(tarea); }

  buscarTareas(criterio) {
    return this.tareas.filter(t => t.descripcion.toLowerCase().includes(criterio.toLowerCase()));
  }

  eliminarTarea(id) { this.tareas = this.tareas.filter(t => t.id !== id); }

  listarTareas() { return this.tareas.map(t => t.mostrarInfo()); }

  obtenerEstadisticas() {
    const total = this.tareas.length;
    const completadas = this.tareas.filter(t => t.completada).length;
    const pendientes = total - completadas;
    const porPrioridad = this.tareas.reduce((acc, t) => { acc[t.prioridad] = (acc[t.prioridad]||0)+1; return acc; }, {});
    return { total, completadas, pendientes, porPrioridad };
  }

  static getInstance() {
    if (!GestorTareas._instancia) GestorTareas._instancia = new GestorTareas();
    return GestorTareas._instancia;
  }
}