main = () => {
    activarEventos()
    comprobarJugadores()

    cargar()
}

comprobarJugadores = () => {
    if(sessionStorage.getItem('jugadores[]') == undefined || sessionStorage.getItem('jugadores[]') == "[]"){
        return false
    }else{
        return true
    }
}


activarEventos = () => {
    document.getElementById("btn-play").addEventListener("click",seleccionarModoJuego,false);
}

jugar = (modo) => {
    jugadores = []
    
    switch (modo) {
        
        case 1: //Modo Normal
            sessionStorage.setItem("modo", 1)
            window.location.href = "./game.html"
            break;

        case 2: //Modo Focus
            sessionStorage.setItem("modo", 2)
            
            let hayJugadores = comprobarJugadores()
            
            if(hayJugadores){
                let jug = ""
                for(let i=0;i<JSON.parse(sessionStorage.getItem('jugadores[]')).length;i++){
                    jug += JSON.parse(sessionStorage.getItem('jugadores[]'))[i].nombre + " "
        
                }
                
                Swal.fire({
                    title: "Jugadores guardados ¿Desea mantenerlos?",   
                    text: "Jugadores: \n" + jug,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.value) {
                        jugadores = JSON.parse(sessionStorage.getItem('jugadores[]'))
                        iniciarJuego()
                    } else {
                        vaciarSessionStorage()
                        cantidadJugadores()
                    }
                })
            }else{
                cantidadJugadores();
            }


            
            break;
    }

    vaciarSessionStorage = () =>{
        sessionStorage.clear()
    }
    
    function cantidadJugadores(){

        Swal.fire({
            text: "Número de Jugadores:",
            input: "number",
        }).then((value) => {
            let cant = parseInt(value.value);
            if (cant != "" && cant != null && cant > 0 && cant <= 20) {
                cantJugadores = cant;

                introducirJugadores(1);

            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ingrese un número entre 1 y 20",
                });
            }
        });

    }


}

    seleccionarModoJuego = () => {
        Swal.fire({
            title: 'Modo de Juego',
            input: 'radio',
            inputOptions: {
                '1': 'Modo Normal',
                '2': 'Modo Focus'
            },
            inputValidator: (value) => {
                if (!value) {
                    return 'Seleccione un modo de juego'
                }
            },
            showCancelButton: true,
            cancelButtonText:"Ayuda",
            confirmButtonText: 'Seleccionar'
            
        }).then((x) => {
            
            if(x.isDismissed == true && x.dismiss == "cancel"){
                window.location = "./help.html"
            }else{
                jugar(parseInt(x.value));
            }

            jugar(x.value)
        })
        
    }
    

    introducirJugadores = (x) => {
        Swal.fire({
            text: "Introduzca los nombres de los jugadores "+x+"/"+cantJugadores+":",
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
                placeholder: "Nombre"
            },
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: (nombre) => {
                document.getElementsByClassName("swal2-input")[0].addEventListener("keypress",()=>{
                    if(event.keyCode == 13){
                        anadirJugador()
                    }
                })
                anadirJugador();

                function anadirJugador() {
                    if (nombre != "" && nombre != null) {
                        if (comprobarJugadorAnadido(nombre) == false) {
                            
                            jugadores.push({nombre: nombre, puntos: 0})
                            if (jugadores.length < cantJugadores) {
                                ++x;
                                introducirJugadores(x);
                            } else {

                                iniciarJuego();
                            }
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Jugador ya añadido',
                            }).then(() => {
                                introducirJugadores(x)
                            })


                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ingrese un nombre',
                        });
                    }
                }
            }
        })
    }

    comprobarJugadorAnadido = (jugador) => {
        let final = false
        for(let f = 0; f < jugadores.length; f++){
            if(jugadores[f].nombre == jugador){
                f = jugadores.length
                final = true
            }else{
                final = false
            }
        }
        return final
    }

    iniciarJuego = () => {
        sessionStorage.setItem("jugadores[]", JSON.stringify(jugadores))
        
        window.location.href = "./game.html"
    }

    

var jugadores = new Array()

window.addEventListener("load",main,false); // Evento de carga de la página 