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
