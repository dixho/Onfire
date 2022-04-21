main = () => {
    activarEventsListener()

    

    // vaciarSessionStorage()
}

comprobarJugadores = () => {
    if(sessionStorage.getItem('jugadores[]') == undefined || sessionStorage.getItem('jugadores[]') == "[]"){
        return false
    }else{
        return true
    }
}

vaciarSessionStorage = () => {
    sessionStorage.clear()
}

activarEventsListener = () => {
    document.getElementById("btn-play").addEventListener("click", jugar, false)
    
}

jugar = () => {
    jugadores=[];
    let hayJugadores = comprobarJugadores()
    console.log(hayJugadores)
    if(hayJugadores){
        let jug = ""
        for(let i=0;i<JSON.parse(sessionStorage.getItem('jugadores[]')).length;i++){
            jug += JSON.parse(sessionStorage.getItem('jugadores[]'))[i].nombre + " "

        }
        console.log(jug)
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
        cantidadJugadores()
    }
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
                if(jugadores.indexOf(nombre) == -1){ //! No funciona bien el indexOf
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
    for(let f = 0; f < jugadores.length; f++){
        jugadores[f].puntos = 0
    }
    sessionStorage.setItem("jugadores[]", JSON.stringify(jugadores))
    window.location.href = "./game.html"
}

test = () => {
    var jugadores2 = new Array()
    
    jugadores2.push({nombre: "Fran", puntos: 20})
    jugadores2.push({nombre: "Jose", puntos: 10})
    sessionStorage.setItem('jugadores[]', JSON.stringify(jugadores2));
    

    var recogida = new Array()

    recogida = JSON.parse(sessionStorage.getItem("jugadores[]"))
    
    
}

var cantJugadores

var jugadores = new Array()

window.addEventListener("load", main, false)