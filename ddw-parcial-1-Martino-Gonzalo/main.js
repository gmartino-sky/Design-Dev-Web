// Variables globales
const maxFreeArticles = 2; // Máximo de noticias gratuitas
const modal = document.getElementById("noticias-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");

// Inicializa localStorage si no está configurado
if (!localStorage.getItem("freeArticlesViewed")) {
    localStorage.setItem("freeArticlesViewed", 0);
}

// Función para mostrar el modal
function showModal(content) {
    modalBody.innerHTML = content;
    modal.style.display = "block";
}

// Función para cerrar el modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none"; // Oculta el modal
});

// Detectar clic en una noticia
document.querySelectorAll(".noticias-principales article").forEach((noticia, index) => {
    noticia.addEventListener("click", () => {
        let articlesViewed = parseInt(localStorage.getItem("freeArticlesViewed"));

        if (articlesViewed < maxFreeArticles) {
            // Mostrar el contenido de la noticia
            const content = noticia.innerHTML; // Contenido de la noticia
            showModal(content);

            // Incrementar el contador en localStorage
            localStorage.setItem("freeArticlesViewed", articlesViewed + 1);
        } else {
            // Mostrar mensaje de suscripción
            showModal(`
                <h2>Suscripción Requerida</h2>
                <p>Has alcanzado el límite de noticias gratuitas. Por favor, suscríbete para continuar leyendo.</p>
                <button onclick="location.href='suscripcion.html'">Suscribirse</button>
            `);
        }
    });
});

// Cerrar el modal al hacer clic fuera de él
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
