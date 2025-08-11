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
