main = () => {
    activarEventos();
    recogerDatos();
    asignarJugador();
    asignarPregunta()
}

asignarPregunta = () => {
    $("#text").text(frases[random(frases.length)]).animate({
        opacity: 1
    },600)

}

asignarJugador = () => {
    $("#player-text").text(jugadores[random(jugadores.length)]).animate({
        opacity: 1
    },600)
}

recogerDatos = () => {

    jugadores = shuffle(localStorage.getItem("jugadores").split(","))    
    

    

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

activarEventos = () => {
    document.getElementById("header-text").addEventListener("click", () => {
        window.location = "./index.html";
    },false);

    $("#btn-next").click(() => {
        
        cambiarJugador();
        cambiarText();
    });
}

cambiarText = () => {
    $("#text-div").animate({
        opacity: 0
    },() => {
        let r = random(frases.length)
    
        while(r == last){
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
    animacionCambiarJugador(jugadores[numJugador])

}

animacionCambiarJugador = (jugadorNuevo) => {
    if(document.getElementById("player-text").textContent != ""){
        $("#player-text").animate({
            left: "+=200vw",
            opacity: 0,
            
        },function(){

            document.getElementById("player-text").textContent = jugadorNuevo
        })
        $("#player-text").animate({
            left: "-=400vw"
        })
        $("#player-text").animate({
            opacity:100,
            left: "+=200vw",
        })
    }else{
        
        $("#player-text").animate({
            
            left: "-=200vw",
        },function(){

            document.getElementById("player-text").textContent = jugadorNuevo
        })
        $("#player-text").show()
        $("#player-text").animate({
            opacity:100,
            left:"+=200vw"
        })    
    }
}

var frases = new Array(
    "Yo nunca he conducido borracho",
    "Yo nunca me he vestido con ropa del sexo contrario",
    "Yo nunca le he escrito un mensaje borracho a mi ex",
    "Yo nunca he mandado nudes",
    "Yo nunca me he desnudado borracho",
    "Yo nunca he tenido nada con ninguno de los jugadores",
    "Yo nunca he hecho un trio",
    "Yo nunca me he desmayado bebiendo",
    "Yo nunca he acabado en el suelo por ir borracho",
    "Yo nunca he pensado en otra persona mientras lo hacía",
    ""
    

)

random = (max) => {
    return Math.floor(Math.random() * max)
}

var numJugador = -1;

var last;

window.addEventListener("load", main, false); // Evento de carga de la página