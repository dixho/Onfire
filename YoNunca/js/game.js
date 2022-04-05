main = () => {
    activarEventos();
}

activarEventos = () => {
    document.getElementById("header-text").addEventListener("click", () => {
        window.location = "./index.html";
    },false);
}


window.addEventListener("load", main, false); // Evento de carga de la página