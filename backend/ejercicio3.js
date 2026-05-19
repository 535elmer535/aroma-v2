const fs = require("fs");

// Leer archivo JSON
const datos = fs.readFileSync("./data/pedidos.json", "utf-8");

// Convertir JSON a arreglo JavaScript
const pedidos = JSON.parse(datos);

// Agregar pedidos de prueba
pedidos.push(
  {
    id: 1,
    items: ["Capuccino", "Latte"],
    total: 45,
    estado: "Pendiente",
  },
  {
    id: 2,
    items: ["Espresso", "Brownie"],
    total: 30,
    estado: "Entregado",
  },
);

// Guardar archivo actualizado
fs.writeFileSync("./data/pedidos.json", JSON.stringify(pedidos, null, 2));

// Volver a cargar el archivo para verificar
const verificar = fs.readFileSync("./data/pedidos.json", "utf-8");

// Mostrar contenido final
console.log(JSON.parse(verificar));
