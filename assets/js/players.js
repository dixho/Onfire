
const main = () => {
    replaceTag();
    eventsListeners();
    showPlayers();
    catchUrl();
}

const replaceTag = () => {
    var that = document.getElementById("playersBtn");

       var p = document.createElement('p');
       p.setAttribute('id',that.getAttribute('id'));

     // move all elements in the other container.
     while(that.firstChild) {
         p.appendChild(that.firstChild);
     }
     that.parentNode.replaceChild(p,that);
}

const eventsListeners = () => {

    document.getElementById("playersInputBtn").addEventListener("click",(e) => {
        
        e.preventDefault();
        let name = document.getElementsByName("playersInput")[0].value;
        if(name != ""){
            document.getElementsByName("playersInput")[0].value = "";
            for(let i = 0; i < players.length; i++){
                if(players[i] === name){
                    createAlert("Jugador ya añadido");
                    return;
                }
            }
            createPlayer(name);
        }
    
    })

    document.getElementById("playersInput").addEventListener("keyup", (e) => {
        
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById("playersInputBtn").click();
        }
    })

    document.getElementById("homeBtn").addEventListener("click", savePlayers)

    document.getElementById("playersBtn").addEventListener("click", savePlayers);


    // document.getElementById("playersBtn").addEventListener("click", savePlayers)
}

const savePlayers = () => {
    let check = false
    if(players.length < 2){
        createAlert("No hay jugadores suficientes");
    }else{
        localStorage.setItem("players", JSON.stringify(players));
        check = true;
    }
    return check;
}

const createPlayer = (name) => {
    
    players.push(name)
    let list = document.getElementById("playersList");
    let li = document.createElement("li");
    li.textContent = name;
    li.addEventListener("click", removePlayer);
    list.appendChild(li);
}

const removePlayer = (e) => {
    e.target.remove();
    

    let index = players.indexOf(e.target.textContent);
    players.splice(index, 1);
    
}

const createAlert = (message) => {
    let alert = document.createElement("div");
    alert.classList.add("alert");
    let div = document.createElement("div");
    div.id = "alertContent";
    let p = document.createElement("p");
    p.textContent = message;
    div.appendChild(p);
    alert.appendChild(div);
    alert.addEventListener("click", (e) => {e.target.remove();})
    document.body.appendChild(alert);
    document.getElementsByClassName("alert")[0].classList.add("visible")
    setTimeout(() => {
        alert.remove();
    }, 700);
}

const showPlayers = () => {
    if(localStorage.getItem("players") != null){
        document.getElementById("playersBtn").textContent = "Guardar"
        document.getElementById("playersBtn").setAttribute("href", "");
    
        let savedPlayers = JSON.parse(localStorage.getItem("players"));
        let list = document.getElementById("playersList");
        for(let i = 0; i < savedPlayers.length; i++){
            createPlayer(savedPlayers[i]);
        }
    }
}

const catchUrl = () => {
    let url = new URL(window.location.href);
    let game = url.searchParams.get("x");
    if(game != null){
        setSaveButton(game);
    }
}

const setSaveButton = (game) => {
    let btn = document.getElementById("playersBtn");
    btn.textContent = "Guardar y jugar a " + game; 
    btn.removeEventListener("click", savePlayers);
    btn.addEventListener("click", () => {
        if(savePlayers() === true){
            window.location = "./" + game + "/index.html";
        }
    })
}

var players = [];

window.addEventListener('load', main);