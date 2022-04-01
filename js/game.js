function main() {
    activarEventsListener()
    recogerDatos()
    
}

function activarEventsListener() {
    document.getElementById("verdad").addEventListener("click", verdad, false)
    document.getElementById("reto").addEventListener("click", reto, false)
}

recogerDatos = () => {
    jugadores = localStorage.getItem("jugadores").split(",")
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
        if(document.getElementById("TextPregunta").textContent != ""){
            $("#jugadortx").animate({
                left: "+=200vw",
                opacity: 0,
                
            },function(){

                document.getElementById("jugadortx").textContent = jugadorNuevo
            })
            $("#jugadortx").animate({
                left: "-=400vw"
            })
            $("#jugadortx").animate({
                opacity:100,
                left: "+=200vw",
            })
        }else{
            
            $("#jugadortx").animate({
                
                left: "-=200vw",
            },function(){

                document.getElementById("jugadortx").textContent = jugadorNuevo
            })
            $("#jugadortx").show()
            $("#jugadortx").animate({
                opacity:100,
                left:"+=200vw"
            })    
        }
    }


verdad = () => {
    $("#TextPregunta").hide("fast")
    if(document.getElementById("TextCastigo").textContent != ""){
        $("#TextCastigo").hide("slow")
    }
    cambiarJugador()
    if (document.getElementById("TextTipo").textContent != "Verdad") {
        
        document.getElementById("TextTipo").textContent = "Verdad"
    }
    
    document.getElementById("TextPregunta").textContent = frasesVerdad[random(frasesVerdad.length)];
    $("#TextPregunta").show("slow")

}

reto = () => {
    
        $("#TextPregunta").hide("fast")
    
    cambiarJugador()
    
        $("#TextCastigo").hide("fast")
    
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



        escribirReto(fraseFinal,rando)
    }else{
        escribirReto(frasesReto[rando].frase,rando)
    }

}

    escribirReto = (frase,rando) =>{
        document.getElementById("TextPregunta").textContent = frase
        document.getElementById("TextCastigo").textContent = "O bebe durante " + frasesReto[rando].castigo + " segundos"
        $("#TextCastigo").show("slow")
        $("#TextPregunta").show("slow")
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
            frase = frase.replace("|",function(){
                let r = random(jugadores.length)
                console.log(jugadores[r] +" | "+ jugadores[numJugador])
                while(jugadores[r] == jugadores[numJugador]){
                    
                    r = random(jugadores.length)
                }
                console.warn(jugadores[r] +" | "+ jugadores[numJugador])
                return jugadores[r]
            
            })
        }

        
        return frase
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
            castigo: 5
        },
        {
            frase: "Haz un calvo",
            castigo: 10
        },
        {
            frase: "Termina tu copa",
            castigo: 15
        },
        {
            frase: "3 chupitos",
            castigo: 5
        },
        {
            frase: "Liate un piti en 45 segundos",
            castigo: 20
        },
        {
            frase: "Dale tu copa al jugador que peor te caiga",
            castigo: 30
        },
        {
            frase: "Cada vez que digas sí o no bebes (Durante ~ minutos)",
            castigo: 20
        },
        {
            frase: "Imita a |",
            castigo: 10
        },
        {
            frase: "Dale un beso en la mejilla a |",
            castigo: 30
        },
        {
            frase: "| tiene que meterte un hielo en la camiseta",
            castigo: 30
        },
        {
            frase: "Dale tu copa a |",
            castigo: 40
        },
    );
    
        
    var jugadores = new Array()

    var last;

    var numJugador = 0;

    

    window.addEventListener("load", main, false);