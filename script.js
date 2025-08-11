// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Función para verificar si los requisitos están aprobados
  function requisitosAprobados(requisitos) {
    if (!requisitos) return true; // Sin requisitos es true
    const ids = requisitos.split(",");
    return ids.every(id => {
      const ramo = document.querySelector(`.ramo[data-id="${id.trim()}"]`);
      return ramo && ramo.classList.contains("aprobado");
    });
  }

  // Función para actualizar el estado visual y bloqueo de cada ramo
  function actualizarEstados() {
    ramos.forEach(ramo => {
      const requisitos = ramo.getAttribute("data-requisitos");
      if (requisitosAprobados(requisitos)) {
        // Disponible si no está aprobado
        if (!ramo.classList.contains("aprobado")) {
          ramo.classList.remove("bloqueado");
          ramo.style.pointerEvents = "auto";
        }
      } else {
        // Bloqueado
        ramo.classList.add("bloqueado");
        ramo.style.pointerEvents = "none";
        // Si estaba aprobado y ya no cumple requisitos, lo desbloqueamos (opcional)
        // ramo.classList.remove("aprobado");
      }
    });
  }

  // Cargar estado guardado (aprobados y notas)
  ramos.forEach((ramo, idx) => {
    const id = ramo.getAttribute("data-id");
    if (!id) return;

    // Estado aprobado guardado
    const aprobado = localStorage.getItem(`ramo-${id}-aprobado`);
    if (aprobado === "true") {
      ramo.classList.add("aprobado");
      ramo.classList.remove("bloqueado");
      ramo.style.pointerEvents = "auto";
    }

    // Cargar nota guardada
    const notaInput = ramo.querySelector(".nota");
    if (notaInput) {
      const notaGuardada = localStorage.getItem(`ramo-${id}-nota`);
      if (notaGuardada !== null) {
        notaInput.value = notaGuardada;
      }

      // Al cambiar la nota guardamos y si es >=4 marcamos aprobado
      notaInput.addEventListener("input", () => {
        let nota = notaInput.value.trim().replace(",", ".");
        nota = parseFloat(nota);

        if (!isNaN(nota) && nota >= 4) {
          if (!ramo.classList.contains("aprobado")) {
            // Verificar requisitos antes de aprobar
            if (requisitosAprobados(ramo.getAttribute("data-requisitos"))) {
              ramo.classList.add("aprobado");
              ramo.classList.remove("bloqueado");
              ramo.style.pointerEvents = "auto";
              localStorage.setItem(`ramo-${id}-aprobado`, "true");
            } else {
              alert(
                `No puedes aprobar "${ramo.textContent.trim()}" porque faltan aprobar prerrequisitos.`
              );
              notaInput.value = "";
            }
          }
        } else {
          // Si nota <4 o vacía, quitar aprobado
          if (ramo.classList.contains("aprobado")) {
            ramo.classList.remove("aprobado");
            localStorage.setItem(`ramo-${id}-aprobado`, "false");
          }
        }

        // Guardar nota
        localStorage.setItem(`ramo-${id}-nota`, notaInput.value);
        // Actualizar estados de otros ramos (porque dependencias pueden cambiar)
        actualizarEstados();
      });
    }

    // Click en el ramo para marcar/desmarcar aprobado
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) {
        // Mostrar cuáles prerrequisitos faltan
        const prereqs = ramo.getAttribute("data-requisitos").split(",");
        const faltantes = prereqs.filter(id => {
          const r = document.querySelector(`.ramo[data-id="${id.trim()}"]`);
          return !r || !r.classList.contains("aprobado");
        });
        alert(
          `No puedes aprobar "${ramo.textContent.trim()}" porque faltan aprobar: ${faltantes
            .map(f => {
              const r = document.querySelector(`.ramo[data-id="${f.trim()}"]`);
              return r ? r.textContent.trim() : f.trim();
            })
            .join(", ")}`
        );
        return;
      }

      if (ramo.classList.contains("aprobado")) {
        ramo.classList.remove("aprobado");
        localStorage.setItem(`ramo-${ramo.getAttribute("data-id")}-aprobado`, "false");
        // Limpiar nota al quitar aprobado
        const notaInput = ramo.querySelector(".nota");
        if (notaInput) {
          notaInput.value = "";
          localStorage.setItem(`ramo-${ramo.getAttribute("data-id")}-nota`, "");
        }
      } else {
        if (requisitosAprobados(ramo.getAttribute("data-requisitos"))) {
          ramo.classList.add("aprobado");
          localStorage.setItem(`ramo-${ramo.getAttribute("data-id")}-aprobado`, "true");
          // Si no tiene nota, poner mínimo 4 por defecto
          const notaInput = ramo.querySelector(".nota");
          if (notaInput && notaInput.value.trim() === "") {
            notaInput.value = "4.0";
            localStorage.setItem(`ramo-${ramo.getAttribute("data-id")}-nota`, "4.0");
          }
        } else {
          alert(
            `No puedes aprobar "${ramo.textContent.trim()}" porque faltan aprobar prerrequisitos.`
          );
        }
      }
      actualizarEstados();
    });
  });

  // Primera actualización de estados
  actualizarEstados();
});
