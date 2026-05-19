// ===============================================================
// EJERCICIO  1

const os = require("os");

// Mostrar información del sistema
console.log("Sistema:", os.platform(), os.arch());
console.log("version Node.js:", process.version);

// Memoria RAM total en GB
const memoriaGB = os.totalmem() / 1024 / 1024 / 1024;
console.log("Memoria RAM total:", memoriaGB.toFixed(2), "GB");

// Directorio actual
console.log("Directorio actual:", process.cwd());

// EJERCICIO 2
