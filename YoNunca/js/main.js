
main = () => {

    activarListeners();

}

activarListeners = () => {
    document.getElementById("btn").addEventListener("click", () => {
        window.location = "./game.html";
    },false);

    document.getElementById("home-btn").addEventListener("click", () => {
        window.location = "../index.html";
    },false)
}

window.addEventListener("load",main,false); // Evento de carga de la página 