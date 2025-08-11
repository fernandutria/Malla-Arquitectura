// --- ESTRUCTURA DE DATOS DE LA MALLA ---
// Aquí definimos todos los ramos con su información.
// id: Un código único para cada ramo.
// nombre: El nombre completo que se mostrará.
// semestre: El número del semestre al que pertenece.
// requisitos: Un array con los 'id' de los ramos que se necesitan para poder cursarlo.
// NOTA: He corregido y estandarizado algunos nombres y prerrequisitos para que el sistema funcione correctamente.
const ramosData = [
    // PRIMER AÑO
    { id: 'TPROY1', nombre: 'Taller de Proyecto I', semestre: 1, requisitos: [] },
    { id: 'REPA1', nombre: 'Representación Arquitectónica I', semestre: 1, requisitos: [] },
    { id: 'EDIF1', nombre: 'Edificación I', semestre: 1, requisitos: [] },
    { id: 'MATE', nombre: 'Matemáticas', semestre: 1, requisitos: [] },
    { id: 'HIST1', nombre: 'Historia de la Arquitectura I', semestre: 1, requisitos: [] },
    { id: 'ING1', nombre: 'Inglés Comunicacional I', semestre: 1, requisitos: [] },
    { id: 'FORM1', nombre: 'Formación Integral', semestre: 1, requisitos: [] },
    { id: 'TPROY2', nombre: 'Taller de Proyecto II', semestre: 2, requisitos: ['TPROY1'] },
    { id: 'REPA2', nombre: 'Representación Arquitectónica II', semestre: 2, requisitos: ['REPA1'] },
    { id: 'EDIF2', nombre: 'Edificación II', semestre: 2, requisitos: ['EDIF1'] },
    { id: 'ESTR1', nombre: 'Estructuras I', semestre: 2, requisitos: ['MATE'] },
    { id: 'URB1', nombre: 'Urbanismo I', semestre: 2, requisitos: [] },
    { id: 'FUNDA1', nombre: 'Fundamentos de Arquitectura I', semestre: 2, requisitos: [] },
    { id: 'ING2', nombre: 'Inglés Comunicacional II', semestre: 2, requisitos: ['ING1'] },
    // SEGUNDO AÑO
    { id: 'TPROY3', nombre: 'Taller de Proyecto III', semestre: 3, requisitos: ['TPROY2'] },
    { id: 'REPA3', nombre: 'Representación Arquitectónica III', semestre: 3, requisitos: ['REPA2'] },
    { id: 'BIO1', nombre: 'Diseño Bioclimático I', semestre: 3, requisitos: [] },
    { id: 'ESTR2', nombre: 'Estructuras II', semestre: 3, requisitos: ['ESTR1'] },
    { id: 'HIST2', nombre: 'Historia de la Arquitectura II', semestre: 3, requisitos: ['HIST1'] },
    { id: 'ING3', nombre: 'Inglés Comunicacional III', semestre: 3, requisitos: ['ING2'] },
    { id: 'TPROY4', nombre: 'Taller de Proyecto IV', semestre: 4, requisitos: ['TPROY3'] },
    { id: 'REPA4', nombre: 'Representación Arquitectónica IV', semestre: 4, requisitos: ['REPA3'] },
    { id: 'EDIF3', nombre: 'Edificación III', semestre: 4, requisitos: ['EDIF2'] },
    { id: 'ESTR3', nombre: 'Estructuras II', semestre: 4, requisitos: ['ESTR2'] },
    { id: 'URB2', nombre: 'Urbanismo II', semestre: 4, requisitos: ['URB1'] },
    { id: 'FUNDA2', nombre: 'Fundamentos de Arquitectura II', semestre: 4, requisitos: ['FUNDA1'] },
    { id: 'ING4', nombre: 'Inglés Comunicacional IV', semestre: 4, requisitos: ['ING3'] },
    // TERCER AÑO
    { id: 'TPROY5', nombre: 'Taller de Proyecto V', semestre: 5, requisitos: ['TPROY4'] },
    { id: 'REPA5', nombre: 'Representación Arquitectónica V', semestre: 5, requisitos: ['REPA4'] },
    { id: 'EDIF4', nombre: 'Edificación IV', semestre: 5, requisitos: ['EDIF3'] },
    { id: 'MADERA', nombre: 'Diseño en Madera', semestre: 5, requisitos: ['ESTR3'] },
    { id: 'TPROY6', nombre: 'Taller de Proyecto VI', semestre: 6, requisitos: ['TPROY5'] },
    { id: 'REPA6', nombre: 'Representación Arquitectónica VI', semestre: 6, requisitos: ['REPA5'] },
    { id: 'GEST', nombre: 'Gestión de Proyectos', semestre: 6, requisitos: [] },
    { id: 'BIO2', nombre: 'Diseño Bioambiental II', semestre: 6, requisitos: ['BIO1'] },
    { id: 'URB3', nombre: 'Urbanismo III', semestre: 6, requisitos: ['URB2'] },
    { id: 'FUNDA3', nombre: 'Fundamentos de Arquitectura III', semestre: 6, requisitos: ['FUNDA2'] },
    { id: 'FORMEXTRA1', nombre: 'Formación Integral extra programática I', semestre: 6, requisitos: [] },
    // CUARTO AÑO
    { id: 'TPROY7', nombre: 'Taller de Proyecto VII', semestre: 7, requisitos: ['TPROY6'] },
    { id: 'ELEC1', nombre: 'Electivo de Vinculación con el Medio I', semestre: 7, requisitos: [] },
    { id: 'PATRI', nombre: 'Patrimonio Arq. y Urbano', semestre: 7, requisitos: ['HIST2'] }, // Asumimos que el prereq es Historia II
    { id: 'ELEC2', nombre: 'Electivo de Vinculación con el Medio II', semestre: 7, requisitos: [] },
    { id: 'METOD', nombre: 'Metodología de la Investigación', semestre: 7, requisitos: ['FUNDA3'] },
    { id: 'FORMEXTRA2', nombre: 'Formación Integral extra programática II', semestre: 7, requisitos: ['FORMEXTRA1'] },
    { id: 'TPROY8', nombre: 'Taller de Proyecto VIII', semestre: 8, requisitos: ['TPROY7'] },
    { id: 'PRACT', nombre: 'Práctica Profesional', semestre: 8, requisitos: ['TPROY7'] },
    { id: 'SEMI', nombre: 'Seminario', semestre: 8, requisitos: ['METOD'] },
    { id: 'FORMEXTRA3', nombre: 'Formación Integral extra programática III', semestre: 8, requisitos: ['FORMEXTRA2'] },
    // QUINTO AÑO
    { id: 'TFUND', nombre: 'Taller de Fundamento', semestre: 9, requisitos: ['TPROY8', 'REPA6', 'EDIF4', 'MADERA', 'GEST', 'BIO2', 'URB3', 'PATRI', 'ELEC1', 'ELEC2', 'SEMI', 'PRACT', 'FORMEXTRA3'] }, // Requisito simplificado: todos los ramos clave del ciclo anterior.
    { id: 'ELESPEC1', nombre: 'Electivo de Especialidad I', semestre: 9, requisitos: ['TPROY7'] },
    { id: 'ELESPEC2', nombre: 'Electivo de Especialidad II', semestre: 9, requisitos: ['TPROY7'] },
    { id: 'ELESPEC3', nombre: 'Electivo de Especialidad III', semestre: 9, requisitos: ['TPROY7'] },
    { id: 'FORMEXTRA4', nombre: 'Formación Integral extra programática IV', semestre: 9, requisitos: ['FORMEXTRA3'] },
    { id: 'PFC', nombre: 'Proyecto Final de Carrera (PFC)', semestre: 10, requisitos: ['TFUND'] } // El PFC requiere el Taller de Fundamento
];

// --- LÓGICA PRINCIPAL ---

// Se ejecuta cuando todo el contenido HTML de la página se ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    const mallaContainer = document.getElementById('malla-curricular');
    let ramosAprobados = cargarRamosAprobados();

    // Función para generar la estructura de la malla en el HTML
    function generarMalla() {
        const años = {}; // Objeto para agrupar ramos por año

        // Agrupar ramos por semestre y luego por año
        ramosData.forEach(ramo => {
            const año = Math.ceil(ramo.semestre / 2);
            if (!años[año]) {
                años[año] = { semestres: {} };
            }
            if (!años[año].semestres[ramo.semestre]) {
                años[año].semestres[ramo.semestre] = [];
            }
            años[año].semestres[ramo.semestre].push(ramo);
        });

        // Crear los elementos HTML para cada año y semestre
        for (const numAño in años) {
            const añoDiv = document.createElement('div');
            añoDiv.className = 'año';
            añoDiv.innerHTML = `<h2>Año ${numAño}</h2>`;
            
            const semestresContainer = document.createElement('div');
            semestresContainer.className = 'semestres-container';

            for (const numSemestre in años[numAño].semestres) {
                const semestreDiv = document.createElement('div');
                semestreDiv.className = 'semestre';
                semestreDiv.innerHTML = `<h3>Semestre ${numSemestre}</h3>`;
                
                años[numAño].semestres[numSemestre].forEach(ramo => {
                    const ramoDiv = document.createElement('div');
                    ramoDiv.className = 'ramo';
                    ramoDiv.id = ramo.id; // Asignamos el ID único
                    ramoDiv.textContent = ramo.nombre;
                    semestreDiv.appendChild(ramoDiv);
                });
                semestresContainer.appendChild(semestreDiv);
            }
            añoDiv.appendChild(semestresContainer);
            mallaContainer.appendChild(añoDiv);
        }
    }

    // Función para actualizar el estado visual de todos los ramos
    function actualizarEstadoVisual() {
        ramosData.forEach(ramo => {
            const ramoDiv = document.getElementById(ramo.id);
            if (!ramoDiv) return;

            // Limpiamos clases de estado previas
            ramoDiv.classList.remove('aprobado', 'bloqueado');

            const requisitosCumplidos = verificarRequisitos(ramo);

            if (ramosAprobados.includes(ramo.id)) {
                ramoDiv.classList.add('aprobado');
            } else if (!requisitosCumplidos) {
                ramoDiv.classList.add('bloqueado');
            }
        });
    }

    // Función para verificar si los requisitos de un ramo están cumplidos
    function verificarRequisitos(ramo) {
        if (ramo.requisitos.length === 0) {
            return true; // No tiene requisitos, siempre está desbloqueado
        }
        // 'every' revisa si TODOS los elementos del array cumplen la condición
        return ramo.requisitos.every(reqId => ramosAprobados.includes(reqId));
    }

    // Función para manejar el clic en un ramo
    function manejarClickRamo(e) {
        const ramoDiv = e.target.closest('.ramo');
        if (!ramoDiv) return; // Si no se hizo clic en un ramo, no hacer nada

        const ramoId = ramoDiv.id;
        const ramoInfo = ramosData.find(r => r.id === ramoId);

        // Si el ramo ya está aprobado, no hacemos nada (o podríamos des-aprobarlo)
        if (ramoDiv.classList.contains('aprobado')) {
             console.log(`El ramo ${ramoInfo.nombre} ya está aprobado.`);
             // Opcional: Descomentar la siguiente sección para permitir des-aprobar ramos
             /*
             const index = ramosAprobados.indexOf(ramoId);
             if (index > -1) {
                 ramosAprobados.splice(index, 1);
             }
             */
            return;
        }

        // Si el ramo está bloqueado, mostrar una alerta con los requisitos faltantes
        if (ramoDiv.classList.contains('bloqueado')) {
            const requisitosFaltantes = ramoInfo.requisitos.filter(reqId => !ramosAprobados.includes(reqId));
            const nombresRequisitosFaltantes = requisitosFaltantes.map(reqId => {
                return ramosData.find(r => r.id === reqId).nombre;
            });
            alert(`Ramo bloqueado. Debes aprobar:\n- ${nombresRequisitosFaltantes.join('\n- ')}`);
            return;
        }

        // Si el ramo está disponible, lo aprobamos
        ramosAprobados.push(ramoId);
        guardarRamosAprobados();
        actualizarEstadoVisual(); // Actualizamos la vista para reflejar el cambio y desbloquear nuevos ramos
    }

    // --- LOCALSTORAGE ---
    // Funciones para guardar y cargar el progreso en el navegador

    function guardarRamosAprobados() {
        localStorage.setItem('ramosAprobadosArquitectura', JSON.stringify(ramosAprobados));
    }

    function cargarRamosAprobados() {
        const guardados = localStorage.getItem('ramosAprobadosArquitectura');
        return guardados ? JSON.parse(guardados) : [];
    }

    // --- INICIALIZACIÓN ---
    generarMalla();
    actualizarEstadoVisual();
    mallaContainer.addEventListener('click', manejarClickRamo);
});
