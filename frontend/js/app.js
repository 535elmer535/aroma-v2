// ==========================
// NAVEGACIÓN SPA
// ==========================
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

// ==========================
// PRODUCTOS
// ==========================
const productos = [
  {
    id: 1,
    nombre: "Café Americano",
    descripcion: "Café negro clásico",
    precio: 12,
  },
  {
    id: 2,
    nombre: "Capuccino",
    descripcion: "Café con leche espumosa",
    precio: 18,
  },
  {
    id: 3,
    nombre: "pie de limon",
    descripcion: "Café suave con leche",
    precio: 16,
  },
  {
    id: 4,
    nombre: "Brownie",
    descripcion: "Postre de chocolate",
    precio: 10,
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

// ==========================
// ESTADO DEL CARRITO
// ==========================
let carrito = [];

// ==========================
// RENDER PRODUCTOS
// ==========================
function renderizarProductos() {
  const contenedor = document.getElementById("products-container");

  contenedor.innerHTML = "";

  productos.forEach(function (producto) {
    contenedor.innerHTML += `
      <div class="product-card">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <span class="product-price">Bs. ${producto.precio}</span>

        <button class="btn-add" data-id="${producto.id}">
          Agregar al carrito
        </button>
      </div>
    `;
  });

  // EVENTOS BOTONES
  const botones = document.querySelectorAll(".btn-add");

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);

      const producto = productos.find((p) => p.id === id);

      // carrito.push(producto);
      const existente = carrito.find((p) => p.id === producto.id);

      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }

      actualizarContador();
      renderizarCarrito();
    });
  });
}

// ==========================
// CONTADOR CARRITO
// ==========================
function actualizarContador() {
  const contador = document.getElementById("cart-count");
  contador.textContent = carrito.length;
}

// ==========================
// RENDER CARRITO
// ==========================
function renderizarCarrito() {
  const contenedor = document.getElementById("cart-container");

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  // carrito.forEach(function (producto) {
  //   contenedor.innerHTML += `
  //     <div class="cart-item">
  //       <p>${producto.nombre} (x ${producto.cantidad})</p>
  //       <span>Bs. ${producto.precio}</span>

  //     </div>
  //   `;
  // });

  // opcion 1

  // carrito.forEach(function (producto) {
  //   const subtotal = producto.precio * producto.cantidad;

  //   contenedor.innerHTML += `
  //   <div class="cart-item">
  //     <p>${producto.nombre} (x ${producto.cantidad})</p>
  //     <span>Subtotal: Bs. ${subtotal}</span>
  //   </div>
  // `;
  // });

  // opcion 2

  carrito.forEach(function (producto) {
    const subtotal = producto.precio * producto.cantidad;

    contenedor.innerHTML += `
      <div class="cart-item">
        <p><strong>${producto.nombre}</strong></p>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>Precio: Bs. c</p>
        <p>Subtotal: Bs. ${subtotal}</p>
        <hr>
      </div>
    `;

    //     contenedor.innerHTML += `
    //   <table class="tabla-menu" border="1">

    //                     <thead>
    //                         <tr>
    //                             <th scope="col">${producto.nombre}</th>
    //  <p>Cantidad: ${producto.cantidad}</p>
    //                             <th scope="col">${producto.cantidad}</th>
    //                             <th scope="col">${producto.precio}</th>

    //                         </tr>
    //                     </thead>
    //    </table>`;
  });

  // original

  // const total = carrito.reduce((acc, producto) => {
  //   return acc + producto.precio * producto.cantidad;
  // }, 0);

  // contenedor.innerHTML += `<h3>Total: Bs. ${total}</h3>`;

  // opcion 1

  const total = carrito.reduce((acc, producto) => {
    return acc + producto.precio * producto.cantidad;
  }, 0);

  contenedor.innerHTML += `
    <h2 class="total-carrito">TOTAL: Bs. ${total}</h2>
  `;
}

// ==========================
// INICIALIZAR
// ==========================
renderizarProductos();
renderizarCarrito();
