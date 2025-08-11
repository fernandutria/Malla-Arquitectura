document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

  function actualizarEstado() {
    ramos.forEach(ramo => {
      const id = ramo.dataset.id;
      const prereq = ramo.dataset.prereq;
      const esElectivo = ramo.classList.contains("electivo");

      // Quitar estilos previos
      ramo.classList.remove("aprobado", "bloqueado");

      // Ignorar ramos sin id o con clase no-check (no interactivos)
      if (!id || ramo.classList.contains("no-check")) {
        return;
      }

      if (esElectivo) {
        if (aprobados.includes(id)) {
          ramo.classList.add("aprobado");
        }
      } else {
        if (prereq && !aprobados.includes(prereq)) {
          ramo.classList.add("bloqueado");
        } else if (aprobados.includes(id)) {
          ramo.classList.add("aprobado");
        }
      }
    });
  }

  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado") || ramo.classList.contains("no-check")) return;

      const id = ramo.dataset.id;
      if (!id) return;

      if (aprobados.includes(id)) {
        aprobados = aprobados.filter(x => x !== id);
      } else {
        aprobados.push(id);
      }

      localStorage.setItem("aprobados", JSON.stringify(aprobados));
      actualizarEstado();
    });
  });

  actualizarEstado();
});
const btnDark = document.getElementById("btn-darkmode");

function activarModoOscuro() {
  document.body.classList.add("dark");
  localStorage.setItem("modoOscuro", "true");
}

function desactivarModoOscuro() {
  document.body.classList.remove("dark");
  localStorage.setItem("modoOscuro", "false");
}

btnDark.addEventListener("click", () => {
  if(document.body.classList.contains("dark")){
    desactivarModoOscuro();
  } else {
    activarModoOscuro();
  }
});

// Al cargar la página, carga la preferencia
if(localStorage.getItem("modoOscuro") === "true"){
  activarModoOscuro();
}
const grid = document.querySelector(".grid-malla");
const zoomIn = document.getElementById("zoom-in");
const zoomOut = document.getElementById("zoom-out");
let zoomLevel = 1;

zoomIn.addEventListener("click", () => {
  if (zoomLevel < 2) {  // máximo 2x zoom
    zoomLevel += 0.1;
    grid.style.transform = `scale(${zoomLevel})`;
  }
});

zoomOut.addEventListener("click", () => {
  if (zoomLevel > 0.5) { // mínimo 0.5x zoom
    zoomLevel -= 0.1;
    grid.style.transform = `scale(${zoomLevel})`;
  }
});
