// Inicializa el historial de noticias vistas en localStorage
if (!localStorage.getItem("viewedArticles")) {
    localStorage.setItem("viewedArticles", JSON.stringify({})); // Guarda un objeto vacío
}

// Variables globales
const maxFreeArticles = 2; // Máximo de noticias gratuitas
const maxViewsPerArticle = 4; // Máximo de vistas por noticia
const modal = document.getElementById("noticias-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");

// Función para mostrar el modal y aplicar el efecto borroso
function showModal(content) {
    modalBody.innerHTML = content; // Carga el contenido dinámico en el modal
    modal.style.display = "block"; // Muestra el modal
    document.body.classList.add("blurred"); // Aplica el efecto borroso al resto de la página
}

// Función para cerrar el modal y quitar el efecto borroso
function closeModal() {
    modal.style.display = "none"; // Oculta el modal
    document.body.classList.remove("blurred"); // Quita el efecto borroso
}

// Detectar clic en las noticias principales y secundarias
document.querySelectorAll(".noticias-principales article, .noticias-secundarias article").forEach((noticia) => {
    noticia.addEventListener("click", () => {
        const articleId = noticia.querySelector("h2, h3").textContent.trim(); // Usa el título como identificador único
        let viewedArticles = JSON.parse(localStorage.getItem("viewedArticles")); // Recupera el historial como objeto

        if (!viewedArticles[articleId]) {
            // La noticia es nueva
            if (Object.keys(viewedArticles).length < maxFreeArticles) {
                // Mostrar la noticia
                const content = noticia.innerHTML;
                showModal(content);

                // Agregar la noticia al historial con 1 vista
                viewedArticles[articleId] = 1;
                localStorage.setItem("viewedArticles", JSON.stringify(viewedArticles));
            } else {
                // Límite de noticias gratuitas alcanzado
                showModal(`
                    <h2>Suscripción Requerida</h2>
                    <p>Has alcanzado el límite de noticias gratuitas. Por favor, suscríbete para continuar leyendo.</p>
                    <button onclick="location.href='suscripcion.html'">Suscribirse</button>
                `);
            }
        } else {
            // La noticia ya fue vista antes
            if (viewedArticles[articleId] < maxViewsPerArticle) {
                // Permitir que la vea nuevamente
                const content = noticia.innerHTML;
                showModal(content);

                // Incrementar el contador de vistas para esta noticia
                viewedArticles[articleId]++;
                localStorage.setItem("viewedArticles", JSON.stringify(viewedArticles));
            } else {
                // Límite de vistas por noticia alcanzado
                showModal(`
                    <h2>Límite de vistas alcanzado</h2>
                    <p>Ya has visto esta noticia el máximo de ${maxViewsPerArticle} veces. Por favor, explora otras noticias o suscríbete para continuar.</p>
                    <button onclick="location.href='suscripcion.html'">Suscribirse</button>
                `);
            }
        }
    });
});

// Evento para cerrar el modal al hacer clic en el botón de cerrar
closeBtn.addEventListener("click", closeModal);

// Evento para cerrar el modal al hacer clic fuera de él
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
