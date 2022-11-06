main = () => {
    recogerDatos();
    activarEventos();
    asignarJugador();
    asignarPregunta()

    cargar()
}

activarEventos = () => {
        $("#btn-next").click(() => {
        if(comprobarModo()){
            cambiarJugador();
            
        }
        cambiarText();
    });
}



asignarPregunta = () => {
    $("#text").text(frases[random(frases.length)]).animate({
        opacity: 1
    },600)

}

asignarJugador = () => {

    switch (modo) {
        case 1:

            document.getElementById("player").remove()
            break;

        case 2:

            $("#player-text").text(jugadores[numJugador].nombre).animate({
                opacity: 1
            },600)
            break;
    }

   
}

recogerDatos = () => {
    
    jugadores = []
    modo = parseInt(sessionStorage.getItem("modo"))

    switch (modo){
        
        case 2:
            jugadores = []
            jugadores = shuffle(JSON.parse(sessionStorage.getItem("jugadores[]")))  
            break;
    }
    

    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {    
        for(let i = 0; i < JSON.parse(xhttp.responseText).length; i++){
            
            frases.push(JSON.parse(xhttp.responseText)[i])
            
        }

    }
    xhttp.open("GET", "./js/frases.json", true);
    xhttp.send();


    

}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}


cambiarText = () => {
    $("#text-div").animate({
        opacity: 0
    },() => {
        let r = random(frases.length)
    
        while(r === last){
            r = random(frases.length)
            
        }
        last = r
        
        document.getElementById("text").textContent = frases[random(frases.length)]
        
    })
    
        $("#text-div").animate({
            opacity: 1
        },1000)
    
    

    
}


cambiarJugador = () =>{
    

    if(numJugador == jugadores.length - 1){
        
        numJugador = 0;
        
    }else{

        numJugador++
    }
    
        animacionCambiarJugador(jugadores[numJugador].nombre)
    

}

comprobarModo = () => {
    if(modo == 2){
        return true
    }else{
        return false
    }
}

animacionCambiarJugador = (jugadorNuevo) => {
        
    $("#player-text").animate({
        left: "+=200vw",
        opacity: 0
    },()=>{
        document.getElementById("player-text").textContent = jugadorNuevo
    })
    $("#player-text").animate({
        left: "-=400vw"
    })
    $("#player-text").animate({
        opacity:100,
        left: "+=200vw",
    })
 
}

var frases = new Array()

random = (max) => {
    return Math.floor(Math.random() * max)
}

var numJugador = 0;

var last;

var modo;

window.addEventListener("load", main, false); // Evento de carga de la página