// Función para abrir el menú desplegable
function abrirMenu() {
    const menu_ancho = document.getElementById("menu").offsetWidth;
    document.getElementById("menu").style.left = "0";
    document.getElementById("contenido").style.marginLeft = menu_ancho + "px";
}

// Función para cerrar el menú desplegable
function cerrarMenu() {
    document.getElementById("menu").style.left = "-300px";
    document.getElementById("contenido").style.marginLeft = "0";
}

// Función para mostrar/ocultar la sublista dentro de "Nosotros"
function Sublista() {
    var sublista = document.getElementById("sublista");
    if (sublista.style.display === "none" || sublista.style.display === "") {
        sublista.style.display = "block"; // Muestra la sublista
    } else {
        sublista.style.display = "none"; // Oculta la sublista
    }
}