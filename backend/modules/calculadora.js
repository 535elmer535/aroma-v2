// Calcular subtotal
function calcularSubtotal(precio, cantidad) {
  return precio * cantidad;
}

// Calcular IVA (13%)
function calcularIVA(subtotal) {
  return subtotal * 0.13;
}

// Calcular total
function calcularTotal(subtotal) {
  return subtotal + calcularIVA(subtotal);
}

// Formatear moneda
function formatearMoneda(numero) {
  return `Bs. ${numero.toFixed(2)}`;
}

// Exportar funciones
module.exports = {
  calcularSubtotal,
  calcularIVA,
  calcularTotal,
  formatearMoneda,
};
