// Importar funciones del módulo
const {
  calcularSubtotal,
  calcularIVA,
  calcularTotal,
  formatearMoneda,
} = require("./modules/calculadora");

// Datos
const precioCapuccino = 18;
const cantidad = 3;

// Cálculos
const subtotal = calcularSubtotal(precioCapuccino, cantidad);
const iva = calcularIVA(subtotal);
const total = calcularTotal(subtotal);

// Mostrar resultados
console.log("Subtotal:", formatearMoneda(subtotal));
console.log("IVA:", formatearMoneda(iva));
console.log("Total:", formatearMoneda(total));
