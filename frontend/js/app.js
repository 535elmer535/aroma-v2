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
    nombre: "te verde",
    descripcion: "natural",
    precio: 10,
  },
  {
    id: 6,
    nombre: "helado",
    descripcion: "lite sabor fresa",
    precio: 16,
  },
];

// const id = 2;
// const resultado = productos.find((p) => p.id === id);

let carrito = [];

function actualizarcontador() {
  const contador = document.getElementById("cart-count");
  contador.textContent = carrito.length;

  // cambiar el color del contador del carrito
  if (carrito.length > 0) {
    contador.style.color = "red";
  } else {
    contador.style.color = "black";
  }
}

function renderizarproductos() {
  // crear contenedor de cada producto
  const contenedor = document.getElementById("products-container");

  contenedor.innerHTML = "";

  productos.forEach(function (producto) {
    contenedor.innerHTML += `<div class="product-card">
<h3>${producto.nombre}</h3>

<p class="product-description">${producto.descripcion}</p>
<span class="product-price">Bs. ${producto.precio}</span>

<br>

<button class="btn-add" data-id="${producto.id}">agregar al carrito</button>

</div>`;
  });

  // funcionamineto botones

  const botones = document.querySelectorAll(".btn-add");

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      // console.log("producto agregado:", id);

      const producto = productos.find((p) => p.id === id);
      carrito.push(producto);

      // console.log(producto.nombre);

      alert(producto.nombre + "añadido");

      actualizarcontador();
    });
  });
}
renderizarproductos();
