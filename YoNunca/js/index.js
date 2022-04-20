main = () => {
    activarEventos()

    cargar()
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
            break;
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
            console.log(x)
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
                        if (jugadores.indexOf(nombre) == -1) {
                            jugadores.push(nombre);
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
                            });


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

    iniciarJuego = () => {
        sessionStorage.setItem("jugadores", jugadores)
        window.location.href = "./game.html"
    }

    

var jugadores = new Array()

window.addEventListener("load",main,false); // Evento de carga de la página 