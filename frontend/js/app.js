// function mostrarvista(vista) {
//   document.getElementById("view-home").classList.remove("active");
//   document.getElementById("view-menu").classList.remove("active");
//   document.getElementById("view-contact").classList.remove("active");

//   document.getElementById("view-" + vista).classList.add("active");
// }

const enlaces = document.querySelectorAll(".nav-link");
enlaces.forEach(function (enlace) {
  enlace.addEventListener("click", function (evento) {
    evento.preventDefault();

    const vista = enlace.dataset.view;

    document.querySelectorAll(".view").forEach(function (seccion) {
      seccion.classList.remove("active");
    });

    document.getElementById("view-" + vista).classList.add("active");
  });
});

// const persona = [
// {

//   id:1,
//   nombre:"carlos",
//   apellido:"gusman",
//   edad:21,
// },

// {

//   id:2,
//   nombre:"mariel",
//   apellido:"gusman",
//   edad:35,
// },

// ];

const productos = [
  {
    id: 1,
    nombre: "cafe americano",
    descripcion: "cafe negro clasico",
    precio: 12,
  },

  {
    id: 2,
    nombre: "capuccino",
    descripcion: "espresso con leche",
    precio: 18,
  },

  {
    id: 3,
    nombre: "pie de limon",
    descripcion: "postre de limon",
    precio: 20,
  },

  {
    id: 4,
    nombre: "yogurt",
    descripcion: "lite sabor fresa",
    precio: 15,
  },

  {
    id: 5,
    nombre: "te",
    descripcion: "lite sabor fresa",
    precio: 15,
  },
  {
    id: 6,
    nombre: "helado",
    descripcion: "lite sabor fresa",
    precio: 15,
  },
];

// console.log(productos[2].nombre);
// console.log(productos[2].precio);

function renderizarproductos() {
  const contenedor = document.getElementById("products-container");

  contenedor.innerHTML = "";

  productos.forEach(function (producto) {
    contenedor.innerHTML += `<div class="product-card">
<h3>${producto.nombre}</h3>
<p>${producto.descripcion}</p>
<span class="product-price">${producto.precio}</span>
</div>`;
  });
}

renderizarproductos();
