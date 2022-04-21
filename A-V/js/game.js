function main() {
    activarEventsListener()
    recogerDatos()
    asignarJugador()
    seleccionarRondas()
    habilitarBotones()
    cargar()
}

habilitarBotones = () =>{
    
    for(let i = 1; i >= 0; i--){
        document.getElementsByClassName("btn-av-disabled")[i].className = "btn btn-secondary btn-av"
    }
}

seleccionarRondas = () =>{

    Swal.fire({
        title: 'Seleccione la cantidad de rondas',
        input: 'radio',
        inputOptions: {
            "1": '1',
            '3': '3',
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
            rondas = (parseInt(result.value)*jugadores.length)-1
        }
    }
    )
       
}

cargar = () =>{
    document.getElementById("load").style.display = "none"
    document.getElementById("load").remove()
}

function activarEventsListener() {
    document.getElementById("verdad").addEventListener("click", (e) =>{
        
        
        verdad(e)
        if(document.getElementsByClassName("btn-av-disabled") == undefined){
            
            for(let i = 1; i >= 0; i--){
                document.getElementsByClassName("btn-av-disabled")[i].addEventListener("click", () =>{
                    Swal.fire({
                        title: "No has contado puntos",
                        text: "Has de contar puntos en la ronda actual",
                        icon: "error",
                        confirmButtonText: "Ok",
                        allowEscapeKey:false,
                        allowOutsideClick:false,
            
                    }).then((result) =>{
                        if(result.isConfirmed == true){
                            setTimeout(() => {
                                $("#plus").animate({
                                    opacity: 0
                                },()=>{
                                    $("#plus").animate({
                                        opacity: 100
                                    })
                                })
                                $("#minus").animate({
                                    opacity: 0
                                },()=>{
                                    $("#minus").animate({
                                        opacity: 100
                                    })
                                })
            
                            },500)
                        }
                    })
                })  
            }
        }
    }, false)
    document.getElementById("reto").addEventListener("click", (e)=>{
        
        reto(e)

        if(document.getElementsByClassName("btn-av-disabled") == undefined){
            
            for(let i = 1; i >= 0; i--){
                document.getElementsByClassName("btn-av-disabled")[i].addEventListener("click", () =>{
                    Swal.fire({
                        title: "No has contado puntos",
                        text: "Has de contar puntos en la ronda actual",
                        icon: "error",
                        confirmButtonText: "Ok",
                        allowEscapeKey:false,
                        allowOutsideClick:false,
            
                    }).then((result) =>{
                        if(result.isConfirmed == true){
                            setTimeout(() => {
                                $("#plus").animate({
                                    opacity: 0
                                },()=>{
                                    $("#plus").animate({
                                        opacity: 100
                                    })
                                })
                                $("#minus").animate({
                                    opacity: 0
                                },()=>{
                                    $("#minus").animate({
                                        opacity: 100
                                    })
                                })
            
                            },500)
                        }
                    })
                })  
            }
        }
    }, false)

    document.getElementById("plus").addEventListener("click", () =>{
        jugadores[calcJugador()].puntos++
        
        for(let i = 1; i >= 0; i--){
            
            document.getElementsByClassName("btn-point")[i].disabled = true
            document.getElementsByClassName("btn-point")[i].className = "btn-point-disabled"
        }
        for(let i = 1; i >= 0; i--){
            document.getElementsByClassName("btn-av-disabled")[i].className = "btn btn-secondary btn-av"
        }

    }, false)
    document.getElementById("minus").addEventListener("click", () =>{
        jugadores[calcJugador()].puntos--
        for(let i = 1; i >= 0; i--){
            
            document.getElementsByClassName("btn-point")[i].disabled = true
            document.getElementsByClassName("btn-point")[i].className = "btn-point-disabled"
        }
        for(let i = 1; i >= 0; i--){
            document.getElementsByClassName("btn-av-disabled")[i].className = "btn btn-secondary btn-av"
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
    document.getElementById("jugadorActualtx").textContent = jugadores[numJugador].nombre
    document.getElementById("jugadorSiguientetx").textContent = jugadores[numJugador+1].nombre
}

cambiarJugador = () =>{
    
    var siguiente=0

        if(numJugador == jugadores.length - 1){
            
            numJugador = 0;
            siguiente = 1;   
        }else{

            numJugador++

            if((numJugador+1) == jugadores.length){
                siguiente = 0;
            }else{
                siguiente = numJugador+1
            }
        }
        animacionCambiarJugador(jugadores[numJugador].nombre,jugadores[siguiente].nombre)

    
}


    animacionCambiarJugador = (jugadorNuevo,jugadorSiguiente) => {
        
        
        $("#jugadorActualtx").animate({
            opacity: 0
        },()=>{
            document.getElementById("jugadorActualtx").textContent = jugadorNuevo
            $("#jugadorActualtx").animate({
                opacity: 100
            },1000)
        })
        

        $("#jugadorSiguientetx").animate({
            opacity: 0
        }).text(jugadorSiguiente).animate({
            opacity: 100
        })
             
    }


    verdad = (e) => {
        
    if(e.target.className.includes("btn-av-disabled") == false){
        
        
        

        if(document.getElementsByClassName("btn-point-disabled") != undefined || FTCheck == true || rondas == -1){

            if(document.getElementsByClassName("btn-point-disabled").length > 0){
                for(let i = 1; i >= 0; i--){
                    
                    document.getElementsByClassName("btn-point-disabled")[i].disabled = false
                    document.getElementsByClassName("btn-point-disabled")[i].className = "btn-point"
                }
            }
            

            for(let i = 1; i >= 0; i--){
                document.getElementsByClassName("btn-av")[i].className = "btn btn-secondary btn-av-disabled"
            }
        
            if(rondas <= -1){
            
                    $("#plus").hide("fast")
                    $("#minus").hide("fast")
                
                $("#TextPregunta").hide("fast")
                if(document.getElementById("TextCastigo").textContent != ""){
                    $("#TextCastigo").hide("slow")
                }
                if(FTCheck==false){cambiarJugador()}
                if (document.getElementById("TextTipo").textContent != "Verdad") {
                    
                    document.getElementById("TextTipo").textContent = "Verdad"
                }
                
                document.getElementById("TextPregunta").textContent = frasesVerdad[random(frasesVerdad.length)];
                $("#TextPregunta").show("slow")

                for(let i = 1; i >= 0; i--){
                    document.getElementsByClassName("btn-av-disabled")[i].className = "btn btn-secondary btn-av"
                }

            }else if(rondaActual < rondas){
                if(FTCheck == false) {rondaActual++}
                    for(let i = 0; i < document.getElementsByClassName("btn-point").length; i++){
                        document.getElementsByClassName("btn-point")[i].disabled = false
                        document.getElementsByClassName("btn-point")[i].className = "btn-point"
                    }

                    $("#TextPregunta").hide("fast")
                    if(document.getElementById("TextCastigo").textContent != ""){
                        $("#TextCastigo").hide("slow")
                    }

                    if(FTCheck==false){cambiarJugador()}

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

            }).then((result) =>{
                if(result.isConfirmed == true){
                    setTimeout(() => {
                        $("#plus").animate({
                            opacity: 0
                        },()=>{
                            $("#plus").animate({
                                opacity: 100
                            })
                        })
                        $("#minus").animate({
                            opacity: 0
                        },()=>{
                            $("#minus").animate({
                                opacity: 100
                            })
                        })

                    },500)
                }
            })
            
            
                
        
        }

        FTCheck = false
    }else{
        Swal.fire({
            title: "No has contado puntos",
            text: "Has de contar puntos en la ronda actual",
            icon: "error",
            confirmButtonText: "Ok",
            allowEscapeKey:false,
            allowOutsideClick:false,

        }).then((result) =>{
            if(result.isConfirmed == true){
                setTimeout(() => {
                    $("#plus").animate({
                        opacity: 0
                    },()=>{
                        $("#plus").animate({
                            opacity: 100
                        })
                    })
                    $("#minus").animate({
                        opacity: 0
                    },()=>{
                        $("#minus").animate({
                            opacity: 100
                        })
                    })

                },500)
            }
        })
    }
}

reto = (e) => {
if(e.target.className.includes("btn-av-disabled") == false){        
        

        if(document.getElementsByClassName("btn-point-disabled") != undefined || FTCheck == true || rondas == -1){
            
            if(document.getElementsByClassName("btn-point-disabled").length > 0){
                for(let i = 1; i >= 0; i--){
                    
                    document.getElementsByClassName("btn-point-disabled")[i].disabled = false
                    document.getElementsByClassName("btn-point-disabled")[i].className = "btn-point"
                }
            }
            
            for(let i = 1; i >= 0; i--){
                document.getElementsByClassName("btn-av")[i].className = "btn btn-secondary btn-av-disabled"
            }
        if(rondas <= -1){
            
            
            $("#plus").hide("fast")
            $("#minus").hide("fast")
        
            $("#TextPregunta").hide("fast")
        
            if(FTCheck==false){cambiarJugador()}
        
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
            if (rando < 5) {
                
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
            for(let i = 1; i >= 0; i--){
                document.getElementsByClassName("btn-av-disabled")[i].className = "btn btn-secondary btn-av"
            }
        }
        else if(rondaActual < rondas){

            if(FTCheck == false) {rondaActual++}
            for(let i = 0; i < document.getElementsByClassName("btn-point").length; i++){
                document.getElementsByClassName("btn-point")[i].disabled = false
            }

        
            $("#TextPregunta").hide("fast")
        
            if(FTCheck==false){cambiarJugador()}
        
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

            }).then((result) =>{
                if(result.isConfirmed == true){
                    setTimeout(() => {
                        $("#plus").animate({
                            opacity: 0
                        },()=>{
                            $("#plus").animate({
                                opacity: 100
                            })
                        })
                        $("#minus").animate({
                            opacity: 0
                        },()=>{
                            $("#minus").animate({
                                opacity: 100
                            })
                        })

                    },500)
                }
            })
            
            
                
        
            
        }
        FTCheck = false
    }else{
        Swal.fire({
            title: "No has contado puntos",
            text: "Has de contar puntos en la ronda actual",
            icon: "error",
            confirmButtonText: "Ok",
            allowEscapeKey:false,
            allowOutsideClick:false,

        }).then((result) =>{
            if(result.isConfirmed == true){
                setTimeout(() => {
                    $("#plus").animate({
                        opacity: 0
                    },()=>{
                        $("#plus").animate({
                            opacity: 100
                        })
                    })
                    $("#minus").animate({
                        opacity: 0
                    },()=>{
                        $("#minus").animate({
                            opacity: 100
                        })
                    })

                },500)
            }
        })
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
                
                while(jugadores[r].nombre == jugadores[numJugador].nombre){
                    
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
        "Si solo te pudieras llevar a un jugador a una isla desierta ¿A quién sería?",
        "Algo vergonzoso que te haya pasado",
        "¿A cuántas personas has besado en un mismo día?",
        "¿Has mentido jugando a este juego?",
        "¿Te liarias con alguien de aquí?",
        "¿Has sido infiel o lo serías?",
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
        "¿Con que famoso de tu mismo sexo lo harías?",
        "¿Alguna vez te han pillado teniendo sexo?",
        "¿De qué parte del cuerpo estás más orgulloso/a?",
    );

    var frasesReto = new Array(
        // {
        //     frase: "Haz Twerkin",
        //     castigo: 5
        // },
        // {
        //     frase: "Haz un calvo",
        //     castigo: 10
        // },
        // {
        //     frase: "Termina tu copa",
        //     castigo: 15
        // },
        // {
        //     frase: "3 chupitos",
        //     castigo: 5
        // },
        // {
        //     frase: "Liate un piti en 45 segundos",
        //     castigo: 20
        // },
        // {
        //     frase: "Dale tu copa al jugador que peor te caiga",
        //     castigo: 30
        // },
        // {
        //     frase: "Cada vez que digas sí o no bebes (Durante ~ minutos)",
        //     castigo: 20
        // },
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
    var numSiguiente = numJugador + 1

    var FTCheck = true // Variable para comprobar que es la primera vez de la partida
    
    var rondas;
    var rondaActual = 0;

    window.addEventListener("load", main, false);