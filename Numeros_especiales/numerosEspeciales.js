const nFlipantes = () => {
  let numerosFlipantes = [],
    contadorFlipantes = 0,
    numActual = 2;

  while (contadorFlipantes < 4) {
    let sumDivisores = 0;
    for (let i = 1; i < numActual; i++) {
      if (numActual % i === 0) {
        sumDivisores += i;
      }
    }

    if (sumDivisores === numActual) {
      numerosFlipantes.push(numActual);
      contadorFlipantes++;
    }

    numActual += 1;
  }

  for (let i = 0; i <= numerosFlipantes.length - 1; i++) {
    console.log(`N${i + 1} = ${numerosFlipantes[i]}`);
  }
};

nFlipantes();
