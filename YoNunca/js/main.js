
main = () => {

    activarListenersGenerales();
    nombrarBotonHome();
}

nombrarBotonHome = () =>{
    document.getElementById("btn-home").innerHTML = "Onfire"
}


activarListenersGenerales = () => {

    
    document.getElementById("btn-home").addEventListener("click", () => {
        
        window.location = "../index.html";
    },false)


    if(!window.location.pathname.includes("index.html")){
        document.getElementById("header-text").addEventListener("click", () => {
            window.location = "./index.html";
        },false);
    }
}

cargar = () =>{
    document.getElementById("load").style.display = "none"
    document.getElementById("load").remove()
}

const body = document.body

window.addEventListener("load",main,false); // Evento de carga de la página 