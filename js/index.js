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

    
        if(document.getElementsByName("playerName")[0].value != "" && jugadores.length < maxPlayers ){
            let playerName = document.getElementsByName("playerName")[0].value;
            createPlayerDiv(playerName)
            jugadores.push({nombre: playerName,puntos:0})
            document.getElementById("playersDisplay-title").textContent = "Jugadores "+jugadores.length+"/"+maxPlayers
            document.getElementsByName("playerName")[0].value = ""
            document.getElementsByName("playerName")[0].focus()
        }else if(jugadores.length >= maxPlayers){
            document.getElementById("playersInput-add").disabled = true
        }
        if(jugadores.length >= minPlayers){
            document.getElementById("btn-next").disabled = false
        }
    

}

comprobarJugadores = () => {
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
        e.target.remove()
        
        jugadores.forEach((element,index) =>{
            if(element.nombre == e.target.textContent){
                jugadores.splice(index,1)
            }
            if(jugadores.length < minPlayers){
                document.getElementById("btn-next").disabled = true
            }
            if(jugadores.length < maxPlayers){
                document.getElementById("playersInput-add").disabled = false
            }
        })
    console.log(jugadores.length)
    document.getElementById("playersDisplay-title").textContent = "Jugadores "+jugadores.length+"/"+maxPlayers
    })

    document.getElementById("playersDisplay-list").appendChild(playerDiv)

}

const minPlayers = 2

const maxPlayers = 10

var jugadores = new Array()

window.addEventListener('load', main);