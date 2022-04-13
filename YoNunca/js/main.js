
main = () => {

    activarListeners();
    nombrarBotonHome();
}

nombrarBotonHome = () =>{
    document.getElementById("btn-home").innerHTML = "Onfire"
}


activarListeners = () => {
    
    document.getElementById("btn-home").addEventListener("click", () => {
        window.location = "../index.html";
    },false)
}

window.addEventListener("load",main,false); // Evento de carga de la página 