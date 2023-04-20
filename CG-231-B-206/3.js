Archivo: programa.js 

// Obtener el contexto del canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Parámetros de la esfera y las transformaciones
var R = 100; // Radio inicial de la esfera
var Sx = 2; // Factor de escala en x
var Sy = 1.5; // Factor de escala en y
var Sz = 0.5; // Factor de escala en z
var Rx = Math.PI / 4; // Ángulo de rotación en x (45 grados)
var Ry = Math.PI / 6; // Ángulo de rotación en y (30 grados)
var Rz = Math.PI / 3; // Ángulo de rotación en z (60 grados)
var Tx = 200; // Dimensión de traslación en x
var Ty = 100; // Dimensión de traslación en y
var Tz = 0; // Dimensión de traslación en z

// Aplicar las transformaciones a la esfera
var matrizTraslacion = matrizTraslacion3D(Tx, Ty, Tz);
var matrizEscala = matrizEscala3D(Sx, Sy, Sz);
var matrizRotacion = matrizRotacionX3D(Rx).concat(matrizRotacionY3D(Ry)).concat(matrizRotacionZ3D(Rz));
var matrizTransformacion = multiplicarMatrices(matrizTraslacion, matrizEscala, matrizRotacion);

// Calcular los puntos transformados de la esfera
var puntosTransformados = [];
for (var i = 0; i < esfera.puntos.length; i++) {
  var punto = multiplicarMatrizPorVector(matrizTransformacion, esfera.puntos[i]);
  puntosTransformados.push(punto);
}

// Dibujar la esfera transformada en el canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#000000';
ctx.lineWidth = 1;
ctx.beginPath();
for (var i = 0; i < puntosTransformados.length; i++) {
  var x = puntosTransformados[i][0] + canvas.width / 2;
  var y = puntosTransformados[i][1] + canvas.height / 2;
  if (i === 0) {
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
  }
}
ctx.closePath();
ctx.stroke();