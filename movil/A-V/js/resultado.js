main = () => {
    recogerDatos();
    ordenarArray();
    mostrarJugadores();

    cargar();
}

cargar = () =>{
    document.getElementById("load").style.display = "none"
    document.getElementById("load").remove()
}

recogerDatos = () => {
    jugadores = JSON.parse(sessionStorage.getItem("jugadores[]",jugadores));
    
}

ordenarArray = () => {
    
    jugadores.sort((a, b) => {
        return b.puntos - a.puntos;
    });  
    
}

mostrarJugadores = () => {
    let divs = new Array()
    for(let i = 0; i < jugadores.length; i++){
        divs.push(document.createElement("div"))
        divs[i].classList.add("player");
        divs[i].innerHTML = `
            <p class="nombre">${jugadores[i].nombre}</p>
            <p class="puntos">${jugadores[i].puntos}</p>
        `;
        document.getElementById("top").appendChild(divs[i]);
    }
}

var jugadores = new Array();

window.addEventListener("load",main,false)