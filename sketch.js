function setup() {
  createCanvas(750, 600);
}

function draw() {
  const partes = parseInt(document.getElementById("partes").value);

  background(204, 102, 0);
  pizzaPuntoPendiente(150, 350, 90, partes);
  pizzaAlgoritmoDDA(390, 350, 90, partes);
  pizzaAlgoritmoBresenham(630, 350, 90, partes);

  textSize(20);
  text("Punto Pendiente", 60, 200);
  fill(0, 102, 153);
  text("Algoritmo DDA", 310, 200);
  
  text("Brensenham", 560, 200);
}

function pizzaPuntoPendiente(x, y, r, partes) {
  algoritmoPuntoMedio(x, y, r);
  const angulo = TWO_PI / partes;
  const puntoMedio = floor(partes / 2);
  stroke(0);

  for (let i = 0; i < partes; i++) {
    const ang = angulo * i;
    const px = x + cos(ang) * r;
    const py = y + sin(ang) * r;
    if (i === puntoMedio) {
      strokeWeight(2);
      algoritmoPuntoPendiente(x, y, px, py);
    }
    strokeWeight(2);
    algoritmoPuntoPendiente(x, y, px, py);
  }
}

function pizzaAlgoritmoDDA(x, y, r, partes) {
  algoritmoPuntoMedio(x, y, r);
  const angulo = TWO_PI / partes;
  const puntoMedio = floor(partes / 2);

  strokeWeight(2);

  for (let i = 0; i < partes; i++) {
    const ang = angulo * i;
    const px = x + cos(ang) * r;
    const py = y + sin(ang) * r;
    if (i === puntoMedio) {
      strokeWeight(2);
      algoritmoDDA(x, y, px, py);
    }
    strokeWeight(2);
    algoritmoDDA(x, y, px, py);
  }
}

function pizzaAlgoritmoBresenham(x, y, r, partes) {
  algoritmoPuntoMedio(x, y, r);
  const angulo = TWO_PI / partes;
  const puntoMedio = floor(partes / 2);
  strokeWeight(2);

  for (let i = 0; i < partes; i++) {
    const ang = angulo * i;
    const px = x + cos(ang) * r;
    const py = y + sin(ang) * r;
    if (i === puntoMedio) {
      strokeWeight(2);
      algoritmoBresenham(x, y, px, py);
    }
    strokeWeight(2);
    algoritmoBresenham(x, y, px, py);
  }
}

function algoritmoPuntoPendiente(x1, y1, x2, y2) {
  if (x1 === x2) {
    let yStrt = y1 < y2 ? y1 : y2;
    let yEnd = y1 > y2 ? y1 : y2;

    for (let y = yStrt; y <= yEnd; y++) {
      point(x1, y);
    }
  } else {
    let xStrt = x1 < x2 ? x1 : x2;
    let xEnd = x1 > x2 ? x1 : x2;
    let m = (y2 - y1) / (x2 - x1);
    let b = y1 - m * x1;

    for (let x = xStrt; x <= xEnd; x++) {
      let y = m * x + b;
      point(x, y);
    }
  }
}

function algoritmoBresenham(x1, y1, x2, y2) {
  let dx = abs(x2 - x1);
  let dy = abs(y2 - y1);
  let xInc = x1 < x2 ? 1 : -1;
  let yInc = y1 < y2 ? 1 : -1;
  let error = dx - dy;
  let x = x1;
  let y = y1;

  for (let i = 0; i <= max(dx, dy); i++) {
    point(x, y);
    let error2 = 2 * error;

    if (error2 > -dy) {
      error -= dy;
      x += xInc;
    }

    if (error2 < dx) {
      error += dx;
      y += yInc;
    }
  }
}

function algoritmoDDA(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let steps = max(abs(dx), abs(dy));
  let xInc = dx / steps;
  let yInc = dy / steps;
  let x = x1;
  let y = y1;

  for (let i = 0; i <= steps; i++) {
    point(x, y);
    x += xInc;
    y += yInc;
  }
}

function algoritmoPuntoMedio(xc, yc, r) {
  let x = 0,
    y = r,
    p = 1 - r;

  point(xc + x, yc + y);
  point(xc + x, yc - y);
  point(xc - x, yc + y);
  point(xc - x, yc - y);

  while (x < y) {
    x++;
    if (p < 0) {
      p += 2 * x + 1;
    } else {
      y--;
      p += 2 * (x - y) + 1;
    }
    point(xc + x, yc + y);
    point(xc + x, yc - y);
    point(xc - x, yc + y);
    point(xc - x, yc - y);
    point(xc + y, yc + x);
    point(xc + y, yc - x);
    point(xc - y, yc + x);
    point(xc - y, yc - x);
  }
}
