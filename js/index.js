const main = () =>{
    checkSessionStorage()
    eventListener()
}

checkSessionStorage = () =>{
    
    if(sessionStorage.getItem("jugadores[]") != undefined){
        jugadores = JSON.parse(sessionStorage.getItem("jugadores[]"))
        jugadores.forEach(element =>{
            createPlayerDiv(element.nombre)
        })
        if(jugadores.length >= minPlayers){
            document.getElementById("btn-next").disabled = false
        }

    }
    if(jugadores.length > 0){
        document.getElementById("playersDisplay-title").textContent = "Jugadores "+jugadores.length+"/"+maxPlayers
    }
    if(jugadores.length >= maxPlayers){
        document.getElementById("playersInput-add").disabled = true
    }
    if(jugadores.length >= minPlayers){
        document.getElementById("btn-next").disabled = false
    }
}

const eventListener = () =>{

    document.getElementById("playersInput-add").addEventListener("click", addPlayer);
    document.getElementById("playersInput-input").addEventListener("keyup", (e) =>{
        if(e.keyCode == 13){
            
            addPlayer();
            document.getElementsByName("playerName")[0].value = ""
            
        }
    })
    document.getElementById("btn-next").addEventListener("click",next = () =>{
        sessionStorage.setItem("jugadores[]", JSON.stringify(jugadores))
        window.location.href = "./selectGame.html"
    })
    

}

const addPlayer = () =>{

    if(checkName()){
        if(document.getElementsByName("playerName")[0].value != "" && jugadores.length < maxPlayers && document.getElementById("playersInput-add").disabled == false){
            let playerName = document.getElementsByName("playerName")[0].value;
            createPlayerDiv(playerName)
            jugadores.push({nombre: playerName,puntos:0})
            document.getElementById("playersDisplay-title").textContent = "Jugadores "+jugadores.length+"/"+maxPlayers
            document.getElementsByName("playerName")[0].value = ""
            document.getElementsByName("playerName")[0].focus()
        }
        if(jugadores.length >= maxPlayers){
            document.getElementById("playersInput-add").disabled = true
        }
        if(jugadores.length >= minPlayers){
            document.getElementById("btn-next").disabled = false
        }
    }

}

checkName = () =>{
    let name = document.getElementsByName("playerName")[0].value
    let bool = true
    for(let i = 0; i < jugadores.length; i++){
        if(jugadores[i].nombre.toLowerCase() == name.toLowerCase()){

            bool = false
        }else{
            bool = true
        }
    }
    return bool
}

const comprobarJugadores = () => {
    if(sessionStorage.getItem('jugadores[]') == undefined || sessionStorage.getItem('jugadores[]') == "[]"){
        return false
    }else{
        return true
    }
}

const createPlayerDiv = (playerName) =>{
    let playerDiv = document.createElement("div")
    playerDiv.className = "playerName"
    playerDiv.innerHTML = playerName
    playerDiv.addEventListener("click", (e) =>{
        console.log(jugadores)
        e.target.remove()

        for(let f = 0; f < jugadores.length; f++){
            if(jugadores[f].nombre == playerName){
                jugadores.splice(f,1)
            }
            if(jugadores.length < minPlayers){
                document.getElementById("btn-next").disabled = true
            }
            if(jugadores.length < maxPlayers){
                document.getElementById("playersInput-add").disabled = false
            }
        }
        document.getElementById("playersDisplay-title").textContent = "Jugadores "+jugadores.length+"/"+maxPlayers

        // jugadores.forEach((element,index) =>{
        //     if(element.nombre == e.target.textContent){
        //         jugadores.splice(index,1)
        //     }
        //     if(jugadores.length < minPlayers){
        //         document.getElementById("btn-next").disabled = true
        //     }
        //     if(jugadores.length < maxPlayers){
        //         document.getElementById("playersInput-add").disabled = false
        //     }
        // })
    })

    document.getElementById("playersDisplay-list").appendChild(playerDiv)

}

const minPlayers = 2

const maxPlayers = 4

var jugadores = new Array()

window.addEventListener('load', main);