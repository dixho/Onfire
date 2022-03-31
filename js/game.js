function main() {
    activarEventsListener()
    recogerDatos()
    asignarJugador()
}

asignarJugador = () =>{
    document.getElementById("jugadortx").textContent = jugadores[numJugador]
}

cambiarJugador = () =>{
    if(numJugador > jugadores.length - 1){
        
        numJugador = 0;
        
    }
    document.getElementById("jugadortx").textContent = jugadores[numJugador]
    numJugador++
}

recogerDatos = () => {
    jugadores = localStorage.getItem("jugadores").split(",")
}

function activarEventsListener() {
    document.getElementById("verdad").addEventListener("click", verdad, false)
    document.getElementById("reto").addEventListener("click", reto, false)
}

verdad = () => {
    cambiarJugador()
    if (document.getElementById("TextTipo").textContent != "Verdad") {
        
        document.getElementById("TextTipo").textContent = "Verdad"
    }
    
    document.getElementById("TextPregunta").textContent = frasesVerdad[random(frasesVerdad.length)];


}

reto = () => {
    cambiarJugador()
    var fraseFinal;
    if (document.getElementById("TextTipo").textContent != "Reto") {
        document.getElementById("TextTipo").textContent = "Reto"
    }

    let rando = random(frasesReto.length)
    while(rando == last){
        rando = random(frasesReto.length)
    }

    last = rando
    if (rando > 5) {
        
        if (frasesReto[rando].frase.includes("~")) {
            
           fraseFinal = cambiarCaracter(frasesReto[rando].frase,true)
        } else if (frasesReto[rando].frase.includes("|")) {
            
            fraseFinal = cambiarCaracter(frasesReto[rando].frase,false)
        } else {
            
            console.error("Error en la frase: Frase con ~ o | fuera del marcador");
        }



        document.getElementById("TextPregunta").textContent = fraseFinal;
    }else{
        document.getElementById("TextPregunta").textContent = frasesReto[rando].frase;
    }
}

cambiarCaracter = (frase,tiempo) => {
    if(tiempo == true){
        let rand = random(4)
        
        switch(rand){
            case 0:
                frase = frase.replace("~","1")
                break;
            case 1:
                frase = frase.replace("~","5")
                break;
            case 2:
                frase = frase.replace("~","10")
                break;
            case 3:
                frase = frase.replace("~","15")
                break;
            case 4:
                frase = frase.replace("~","30")
                break;
        }
    }else{
        frase = frase.replace("|",jugadores[random(jugadores.length)])
    }

    
    return frase
}

    function x(variable) {
        if (variable == verdad) {

        } else {
            document.getElementById("TextTipo").textContent = "Reto"
        }
    }

    random = (max) => {
        return Math.floor(Math.random() * max)
    }


    var frasesVerdad = new Array(
        "¿Te ha llegado a atraer alguien del grupo?",
        "Si solo te pudieras llevar a uno a una isla desierta ¿A quién sería?",
        "Algo vergonzoso que te haya pasado",
        "¿A cuántas personas has besado en un mismo día?",
        "¿Has mentido jugando a este juego?",
        "¿Te liarias con alguien de aquí?",
        "¿Has sido infiel/lo serías?",
        "¿Harías un trío?",
        "¿Has tenido sexo en un lugar público?",
        "Lugar público más raro dnde has tenido sexo",
        "¿Fantasía sexual?",
        "¿Has mandado nudes?",
        "¿Serías capaz de matar a alguien?",
        "¿Te han pillado alguna vez tocandote?",
        "¿Te ha gustado alguna vez el padre/madre de algún amigo?",
        "¿Te ha gustado alguna vez algun profesor?",
        "¿Persona más mayor con la que has tenido algo?",
        "¿Persona más pequeña con la que has tenido algo?"
    );

    var frasesReto = new Array(
        {
            frase: "Haz Twerkin",
            castigo: 0
        },
        {
            frase: "Haz un calvo",
            castigo: 0
        },
        {
            frase: "Termina tu copa",
            castigo: 0
        },
        {
            frase: "3 chupitos",
            castigo: 0
        },
        {
            frase: "Liate un piti en 45 segundos",
            castigo: 1
        },
        {
            frase: "Dale tu copa al jugador que peor te caiga",
            castigo: 2
        },
        {
            frase: "Cada vez que digas sí o no bebes (Durante ~ minutos)",
            castigo: 1
        },
        {
            frase: "Imita a |",
            castigo: 0
        },
        {
            frase: "Dale un beso en la mejilla a |",
            castigo: 2
        },
        {
            frase: "| tiene que meterte un hielo en la camiseta",
            castigo: 2
        },
        {
            frase: "Dale tu copa a |",
            castigo: 3
        },
    );
    

    var jugadores = new Array()

    var last;

    var numJugador = 0;

    window.addEventListener("load", main, false);