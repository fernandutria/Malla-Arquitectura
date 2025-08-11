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

      // Ignorar ramos sin id o con clase no-check
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

  // ----- MODO OSCURO -----
  const btnModoOscuro = document.getElementById("modoOscuroBtn");
  if (btnModoOscuro) {
    btnModoOscuro.addEventListener("click", () => {
      document.body.classList.toggle("modo-oscuro");
    });
  }

  // ----- ZOOM -----
  const btnZoomMas = document.getElementById("zoomMas");
  const btnZoomMenos = document.getElementById("zoomMenos");
  let escala = 1;

  function aplicarZoom() {
    document.querySelector(".contenedor-malla").style.transform = `scale(${escala})`;
    document.querySelector(".contenedor-malla").style.transformOrigin = "0 0";
  }

  if (btnZoomMas) {
  btnZoomMas.addEventListener("click", () => {
    if (escala < 2) {    // límite máximo
      escala += 0.1;
      aplicarZoom();
    }
  });
}

if (btnZoomMenos) {
  btnZoomMenos.addEventListener("click", () => {
    if (escala > 0.5) {  // límite mínimo
      escala -= 0.1;
      aplicarZoom();
    }
  });
}
