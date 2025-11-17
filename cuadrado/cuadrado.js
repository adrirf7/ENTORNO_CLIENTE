const generarCuadrado = (n) => {
  for (let i = 0; i < n; i++) {
    let fila = "";
    for (let j = 0; j < n; j++) {
      fila += "* ";
    }
    console.log(fila);
  }
};

generarCuadrado(5);
