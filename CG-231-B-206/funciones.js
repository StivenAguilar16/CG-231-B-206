
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Parámetros de la esfera y las transformaciones
var R = 1; // Radio inicial de la esfera
var Sx = 0.5; // Factor de escala en x
var Sy = 0.5; // Factor de escala en y
var Sz = 3; // Factor de escala en z
var Rx = 0; // Ángulo de rotación en x (0 grados)
var Ry = 0; // Ángulo de rotación en y (0 grados)
var Rz = 0; // Ángulo de rotación en z (0 grados)
var Tx = 0; // Dimensión de traslación en x
var Ty = 0; // Dimensión de traslación en y
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

// Dibujar la esfera transformada 
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#000000';
ctx.lineWidth = 1;
ctx.beginPath();
for (var i = 0; i < puntosTransformados.length; i++) {
  var x = puntosTransformados[i][0] + canvas.width / 2;
  var y = -puntosTransformados[i][1] + canvas.height / 2; // Invertir el eje y para ajustar a la rejilla
  if (i === 0) {
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
  }
}
ctx.closePath();
ctx.stroke();