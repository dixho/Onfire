main = () => {
    activarEventos();
    recogerDatos();
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
    "Yo nunca he mandado nudes a la persona equivocada",
    "Yo nunca he stalkeado a mi ex",
    "Yo nunca me he desmayado por fumar demasiado",
    "Yo nunca he tenido que salir corriendo de una fiesta",
    "Yo nunca he sido pillado haciendolo",
    "Yo nunca me he emborrachado delante de mis padres",
    "Yo nunca he sido pillado con porno en el movil",
    "Yo nunca he vuelto con mi ex",
    "Yo nunca he mandado una captura de la conversación al mismo contacto",
    "Yo nunca he vomitado para seguir bebiendo",
    "Yo nunca he besado a alguien del mismo sexo",
    "Yo nunca he dicho que no vuelvo a beber",
    "Yo nunca he hecho sexting",
    "Yo nunca he estado con una persona sin haber superado a mi ex",
    "Yo nunca me he arrepentido de liarme con alguien",
    "Yo nunca he estado en la friendzone",
    "Yo nunca me caí en público",
    "Yo nunca me dormí en la calle",
    "Yo nunca me comí un plátano como si fuera una polla",
    "Yo nunca toque un culo y me hice el despistado",
    "Yo nunca me choque contra un cristal",
    
    

)

random = (max) => {
    return Math.floor(Math.random() * max)
}

var numJugador = 0;

var last;

var modo;

window.addEventListener("load", main, false); // Evento de carga de la página