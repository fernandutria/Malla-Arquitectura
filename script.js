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

      // Si es electivo, no bloquearlo
      if (esElectivo) {
        if (aprobados.includes(id)) {
          ramo.classList.add("aprobado");
        }
      } else {
        // Si tiene prerequisito y no está aprobado → bloqueado
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
      // Si está bloqueado, no hacer nada
      if (ramo.classList.contains("bloqueado")) return;

      const id = ramo.dataset.id;
      // Si el ramo no tiene ID (como algunos electivos), lo ignoramos
      if (!id) return;

      // Alternar aprobado / no aprobado
      if (aprobados.includes(id)) {
        aprobados = aprobados.filter(x => x !== id);
      } else {
        aprobados.push(id);
      }

      // Guardar en localStorage
      localStorage.setItem("aprobados", JSON.stringify(aprobados));

      // Actualizar interfaz
      actualizarEstado();
    });
  });

  // Estado inicial
  actualizarEstado();
});
