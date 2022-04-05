main = () => {
    activarEventos()
}

activarEventos = () => {
    document.getElementById("btn").addEventListener("click", () => {
        window.location = "./game.html";
    },false);
}

window.addEventListener("load",main,false); // Evento de carga de la página 