function main() {
    activarEventsListener()
    recogerDatos()
    asignarJugador()
    seleccionarRondas()

    cargar()
}

seleccionarRondas = () =>{

    Swal.fire({
        title: 'Seleccione la cantidad de rondas',
        input: 'radio',
        inputOptions: {
            "1": '1',
            '5': '5',
            '10': '10',
            '-1': '∞',
            
        },
        inputValue: '1',
        showCancelButton: false,
        allowEscapeKey:false,
        allowOutsideClick:false,
        inputValidator: (value) => {
            if (!value) {
                return 'Por favor seleccione una ronda'
            }
        }
    }).then((result) => {
        if (result.value) {
            rondas = parseInt(result.value)*jugadores.length
        }
    }
    )
       
}

cargar = () =>{
    document.getElementById("load").style.display = "none"
}

function activarEventsListener() {
    document.getElementById("verdad").addEventListener("click", verdad, false)
    document.getElementById("reto").addEventListener("click", reto, false)
    document.getElementById("plus").addEventListener("click", () =>{
        jugadores[calcJugador()].puntos++
        for(let i = 0; i < document.getElementsByClassName("btn-point").length; i++){
            document.getElementsByClassName("btn-point")[i].disabled = true
        }
    }, false)
    document.getElementById("minus").addEventListener("click", () =>{
        jugadores[calcJugador()].puntos--
        for(let i = 0; i < document.getElementsByClassName("btn-point").length; i++){
            document.getElementsByClassName("btn-point")[i].disabled = true
        }
    }, false)
}

    calcJugador = () => {
        if(numJugador == 0){
            return jugadores.length - 1
        }else{
            return numJugador - 1
        }
    }

recogerDatos = () => {
    jugadores = []
    jugadores = shuffle(JSON.parse(sessionStorage.getItem("jugadores[]")))    
    console.log(jugadores)
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
  

asignarJugador = () => {
    document.getElementById("jugadortx").textContent = jugadores[numJugador].nombre
}

cambiarJugador = () =>{
    

        if(numJugador == jugadores.length - 1){
            
            numJugador = 0;
            
        }else{

            numJugador++
        }
        animacionCambiarJugador(jugadores[numJugador].nombre)
    
}


    animacionCambiarJugador = (jugadorNuevo) => {
        
            $("#jugadortx").animate({
                left: "+=200vw",
                opacity: 0
            },()=>{
                document.getElementById("jugadortx").textContent = jugadorNuevo
            })
            $("#jugadortx").animate({
                left: "-=400vw"
            })
            $("#jugadortx").animate({
                opacity:100,
                left: "+=200vw",
            })
         
    }


verdad = () => {
    console.log(jugadores)
    console.log(rondaActual + "| " + rondas)
    if(document.getElementsByClassName("btn-point")[0].disabled == true || FTCheck == true || rondas == -1){
    if(rondas == -1){
        console.log("inf")
            $("#plus").hide("fast")
            $("#minus").hide("fast")
        
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

    }else if(rondaActual < rondas){
            rondaActual++
            for(let i = 0; i < document.getElementsByClassName("btn-point").length; i++){
                document.getElementsByClassName("btn-point")[i].disabled = false
            }

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

        }else{
            Swal.fire({
                title: "Fin del juego",
                text: "Se acabaron las rondas",
                icon: "success",
                confirmButtonText: "Ver resultados",
                allowEscapeKey:false,
                allowOutsideClick:false,
            }).then((result) => {
                if (result.value) {
                    sessionStorage.setItem("jugadores[]", JSON.stringify(jugadores))
                    window.location.href = "resultados.html"
                }

            })
        }
    }else{
        Swal.fire({
            title: "No has contado puntos",
            text: "Has de contar puntos en la ronda actual",
            icon: "error",
            confirmButtonText: "Ok",
            allowEscapeKey:false,
            allowOutsideClick:false,
        })
    }
    FTCheck = false
}

reto = () => {
    console.log(jugadores)
    console.log(rondaActual + "| " + rondas)

    if(document.getElementsByClassName("btn-point")[0].disabled == true || FTCheck == true || rondas == -1){
    if(rondas == -1){
        console.log("inf")
        
        $("#plus").hide("fast")
        $("#minus").hide("fast")
     
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
    else if(rondaActual < rondas){

        rondaActual++
        for(let i = 0; i < document.getElementsByClassName("btn-point").length; i++){
            document.getElementsByClassName("btn-point")[i].disabled = false
        }

    
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
    else{
        Swal.fire({
            title: "Fin del juego",
            text: "Se acabaron las rondas",
            icon: "success",
            confirmButtonText: "Ver resultados",
            allowEscapeKey:false,
            allowOutsideClick:false,
        }).then((result) => {
            if (result.value) {
                window.location.href = "resultados.html"
            }

        })
    }
    }else{
        Swal.fire({
            title: "No has contado puntos",
            text: "Has de contar puntos en la ronda actual",
            icon: "error",
            confirmButtonText: "Ok",
            allowEscapeKey:false,
            allowOutsideClick:false,
        })
    }
    FTCheck = false
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
                
                while(jugadores[r] == jugadores[numJugador]){
                    
                    r = random(jugadores.length)
                }
                
                return jugadores[r].nombre
            
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
        "¿Persona más pequeña con la que has tenido algo?",
        "¿Con que famosa lo harías?",
        "¿Alguna vez te han pillado teniendo sexo?",
        "¿De qué parte del cuerpo estás más orgulloso/a?",
        "¿Alguna vez has tenido sexo en un lugar público?",
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

    var FTCheck = true // Variable para comprobar que es la primera vez de la partida
    
    var rondas;
    var rondaActual = 0;

    window.addEventListener("load", main, false);