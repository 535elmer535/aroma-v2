// ============================================================
// AROMA CAFÉ — app.js
// Lógica SPA: navegación, productos y carrito de compras.
// ============================================================

// ==========================
// NAVEGACIÓN SPA
// ==========================
const enlaces = document.querySelectorAll(".nav-link");

enlaces.forEach(function (enlace) {
  enlace.addEventListener("click", function (evento) {
    evento.preventDefault();

    const vista = enlace.dataset.view;

    // Oculta todas las vistas
    document.querySelectorAll(".view").forEach(function (seccion) {
      seccion.classList.remove("active");
    });

    // Muestra la vista seleccionada
    document.getElementById("view-" + vista).classList.add("active");
  });
});

// ==========================
// PRODUCTOS
// Cada producto tiene: id, nombre, descripcion, precio,
// imagen (URL) y categoria para el filtro.
// ==========================
const productos = [
  {
    id: 1,
    nombre: "Café Americano",
    descripcion: "Café negro clásico, intenso y puro",
    precio: 12,
    categoria: "bebidas",
    imagen:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
  },
  {
    id: 2,
    nombre: "Capuccino",
    descripcion: "Espresso con leche espumosa y canela",
    precio: 18,
    categoria: "bebidas",
    imagen:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80",
  },
  {
    id: 3,
    nombre: "Pie de Limón",
    descripcion: "Postre fresco con merengue y crema",
    precio: 16,
    categoria: "postres",
    imagen:
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&q=80",
  },
  {
    id: 4,
    nombre: "Brownie",
    descripcion: "Brownie húmedo de chocolate oscuro",
    precio: 10,
    categoria: "postres",
    imagen:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
  },
  {
    id: 5,
    nombre: "Té Verde",
    descripcion: "Infusión natural, relajante y antioxidante",
    precio: 10,
    categoria: "bebidas",
    imagen:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
  },
  {
    id: 6,
    nombre: "Helado de Fresa",
    descripcion: "Helado artesanal, sabor fresa natural",
    precio: 16,
    categoria: "postres",
    imagen:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80",
  },
];

// ==========================
// ESTADO DEL CARRITO
// ==========================
let carrito = [];

function guardarcarrito() {
  localStorage.setItem("aroma_carrito", JSON.stringify(carrito));
}

function cargarcarrito() {
  const carritoguardado = localStorage.getItem("aroma_carrito");
  if (carritoguardado) {
    carrito = JSON.parse(carritoguardado);
  }
}

// ==========================
// RENDER PRODUCTOS
// Genera las cards con imagen, nombre, descripción,
// precio y botón "Agregar al carrito".
// ==========================
function renderizarProductos() {
  const contenedor = document.getElementById("products-container");
  contenedor.innerHTML = "";

  productos.forEach(function (producto) {
    contenedor.innerHTML += `
      <div class="product-card">

        <!-- Imagen del producto -->
        <div class="product-card__img-wrap">
          <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
            class="product-card__img"
            loading="lazy"
          />
          <!-- Etiqueta de categoría -->
          <span class="product-card__tag">${producto.categoria}</span>
        </div>

        <!-- Información -->
        <div class="product-card__body">
          <h3 class="product-card__name">${producto.nombre}</h3>
          <p class="product-card__desc">${producto.descripcion}</p>

          <div class="product-card__footer">
            <span class="product-price">Bs. ${producto.precio}</span>
            <button class="btn-add" data-id="${producto.id}" aria-label="Agregar ${producto.nombre} al carrito">
              + Agregar
            </button>
          </div>
        </div>

      </div>
    `;
  });

  // Asigna el evento click a cada botón "Agregar"
  document.querySelectorAll(".btn-add").forEach(function (boton) {
    boton.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      const producto = productos.find((p) => p.id === id);
      const existente = carrito.find((p) => p.id === producto.id);

      if (existente) {
        // Si ya existe, incrementa la cantidad
        existente.cantidad += 1;
      } else {
        // Si es nuevo, lo agrega con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
      }
      guardarcarrito();
      actualizarContador();
      renderizarCarrito();

      // Microinteracción: feedback visual en el botón
      this.textContent = "✓ Agregado";
      this.classList.add("btn-add--added");
      const btn = this;
      setTimeout(function () {
        btn.textContent = "+ Agregar";
        btn.classList.remove("btn-add--added");
      }, 1200);
    });
  });
}

// ==========================
// CONTADOR DEL CARRITO (badge)
// Muestra el total de líneas de producto en el badge
// y dispara la animación de pulso.
// ==========================
function actualizarContador() {
  const contador = document.getElementById("cart-count");
  contador.textContent = carrito.length;

  // Reinicia la animación de pulso
  contador.classList.remove("bump");
  void contador.offsetWidth; // fuerza reflow para reiniciar la animación
  contador.classList.add("bump");
}

// ==========================
// RENDER CARRITO
// Muestra cada item con:
//   - Imagen miniatura
//   - Nombre y precio unitario
//   - Controles − cantidad +
//   - Subtotal
//   - Botón eliminar (×)
// Al final: total general y botón de checkout.
// ==========================
function renderizarCarrito() {
  const contenedor = document.getElementById("cart-container");
  contenedor.innerHTML = "";

  // Estado vacío
  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty__icon">🛒</span>
        <p class="cart-empty__title">Tu carrito está vacío</p>
        <p class="cart-empty__sub">Explora el menú y agrega tus productos favoritos</p>
      </div>
    `;
    return;
  }

  // Renderiza cada item del carrito
  carrito.forEach(function (producto) {
    const subtotal = producto.precio * producto.cantidad;

    contenedor.innerHTML += `
      <div class="cart-item" data-id="${producto.id}">

        <!-- Miniatura del producto -->
        <img
          src="${producto.imagen}"
          alt="${producto.nombre}"
          class="cart-item__img"
        />

        <!-- Nombre y precio unitario -->
        <div class="cart-item__info">
          <strong class="cart-item__name">${producto.nombre}</strong>
          <span class="cart-item__unit">Bs. ${producto.precio} c/u</span>
        </div>

        <!-- Controles de cantidad: − número + -->
        <div class="cart-item__controls">
          <button
            class="qty-btn qty-btn--minus"
            data-id="${producto.id}"
            aria-label="Disminuir cantidad de ${producto.nombre}"
          >−</button>

          <span class="qty-value">${producto.cantidad}</span>

          <button
            class="qty-btn qty-btn--plus"
            data-id="${producto.id}"
            aria-label="Aumentar cantidad de ${producto.nombre}"
          >+</button>
        </div>

        <!-- Subtotal del item -->
        <span class="cart-item__subtotal">Bs. ${subtotal}</span>

        <!-- Botón eliminar -->
        <button
          class="cart-item__remove"
          data-id="${producto.id}"
          aria-label="Eliminar ${producto.nombre} del carrito"
          title="Eliminar"
        >×</button>

      </div>
    `;
  });

  // Total general
  const total = carrito.reduce(function (acc, p) {
    return acc + p.precio * p.cantidad;
  }, 0);

  contenedor.innerHTML += `
    <div class="cart-summary">
      <div class="cart-summary__total">
        <span>Total del pedido</span>
        <strong>Bs. ${total}</strong>
      </div>
      <button class="btn-checkout">
        Finalizar pedido →
      </button>
    </div>
  `;

  // ---- Eventos de los controles de cantidad ----

  // Botón MENOS: disminuye 1; si llega a 0, elimina el item
  document.querySelectorAll(".qty-btn--minus").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      const item = carrito.find((p) => p.id === id);

      if (item.cantidad > 1) {
        item.cantidad -= 1;
      } else {
        // Elimina el producto si la cantidad llega a 0
        carrito = carrito.filter((p) => p.id !== id);
      }
      guardarcarrito();
      actualizarContador();
      renderizarCarrito();
    });
  });

  // Botón MÁS: incrementa 1
  document.querySelectorAll(".qty-btn--plus").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      const item = carrito.find((p) => p.id === id);
      item.cantidad += 1;
      cargarcarrito();
      actualizarContador();
      renderizarCarrito();
    });
  });

  // Botón ELIMINAR: quita el item completamente
  document.querySelectorAll(".cart-item__remove").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      carrito = carrito.filter((p) => p.id !== id);
      guardarcarrito();
      actualizarContador();
      renderizarCarrito();
    });
  });

  // Botón CHECKOUT: alerta de confirmación (placeholder)
  const btnCheckout = contenedor.querySelector(".btn-checkout");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", function () {
      alert(
        `¡Pedido confirmado! Total: Bs. ${total}\nGracias por tu compra en Aroma Café ☕`,
      );
    });
  }
}

function inicializarformulariocontacto() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("contact-name");
    const email = document.getElementById("contact-email");
    const mensaje = document.getElementById("contact-message");

    const errornombre = document.getElementById("error-name");
    const erroremail = document.getElementById("error-email");
    const errormensaje = document.getElementById("error-message");

    const exito = document.getElementById("form-success");

    errornombre.textContent = "";
    erroremail.textContent = "";
    errormensaje.textContent = "";
    exito.textContent = "";

    let valido = true;
    if (nombre.value.trim() === "") {
      errornombre.textContent = "el nombre es obligatorio";
      valido = false;
    }

    if (email.value.trim() === "") {
      erroremail.textContent = "el correo es obligatorio";
      valido = false;
    }

    if (mensaje.value.trim() === "") {
      errormensaje.textContent = "el mensaje es obligatorio";
      valido = false;
    }

    exito.textContent = "mensaje enviado";
  });
}

// ==========================
// INICIALIZAR
// ==========================
cargarcarrito();
renderizarProductos();
renderizarCarrito();
actualizarContador();
