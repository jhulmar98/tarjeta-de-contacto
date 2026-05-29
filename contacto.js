// =============================
// ELEMENTOS
// =============================
const form = document.getElementById("formContacto");
const respuesta = document.getElementById("respuesta");

// =============================
// EVENTO SUBMIT
// =============================
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // =============================
    // VALIDACIONES
    // =============================
    if (!nombre || !email || !mensaje) {
        mostrarMensaje("Completa los campos obligatorios", "error");
        return;
    }

    if (!validarEmail(email)) {
        mostrarMensaje("Ingresa un correo válido", "error");
        return;
    }

    // =============================
    // SIMULACIÓN ENVÍO
    // =============================
    mostrarMensaje("Enviando...", "neutral");

    setTimeout(() => {
        mostrarMensaje("Solicitud enviada correctamente", "ok");
        form.reset();
    }, 800);
});

// =============================
// VALIDAR EMAIL
// =============================
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// =============================
// MENSAJES
// =============================
function mostrarMensaje(texto, tipo) {
    respuesta.textContent = texto;

    switch (tipo) {
        case "ok":
            respuesta.style.color = "green";
            break;
        case "error":
            respuesta.style.color = "red";
            break;
        default:
            respuesta.style.color = "#526072";
    }
}

// =============================
// REVEAL ANIMATION
// =============================
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

reveals.forEach(el => observer.observe(el));