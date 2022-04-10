main = () => {
    activarEventsListener()
}

activarEventsListener = () => {
    document.getElementById("btn").addEventListener("click", jugar, false)
    
}

jugar = () => {
    jugadores=[];
    cantidadJugadores()
}

cantidadJugadores = () => {
    Swal.fire({
        text: "Número de Jugadores:",
        input: 'number',
    })
        .then((value) => {
            let cant = parseInt(value.value)
            if (cant != "" && cant != null && cant > 0 && cant <= 20) {
                cantJugadores = cant
                
                introducirJugadores(1)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ingrese un número entre 1 y 20',
                })
            }
        })
}



introducirJugadores = (x) => {
    Swal.fire({
        text: "Introduzca los nombres de los jugadores "+x+"/"+cantJugadores+":",
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (nombre) => {
            if (nombre != "" && nombre != null) {
                if(jugadores.indexOf(nombre) == -1){
                    jugadores.push({nombre: nombre, puntos: 0})
                    if (jugadores.length < cantJugadores) {
                        ++x
                        introducirJugadores(x)
                    } else {
                        
                        iniciarJuego()
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Jugador ya añadido',
                    })
                    
                    
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ingrese un nombre',
                })
            }
        }
    })
}

iniciarJuego = () => {
    sessionStorage.setItem("jugadores[]", JSON.stringify(jugadores))
    window.location.href = "./game.html"
}

test = () => {
    var jugadores2 = new Array()
    
    jugadores2.push({nombre: "Fran", puntos: 20})
    jugadores2.push({nombre: "Jose", puntos: 10})
    sessionStorage.setItem('jugadores[]', JSON.stringify(jugadores2));
    console.log(sessionStorage)

    var recogida = new Array()

    recogida = JSON.parse(sessionStorage.getItem("jugadores[]"))
    console.log(recogida)
    
}

var cantJugadores

var jugadores = new Array()

window.addEventListener("load", main, false)