const main = () => {
    setTimeout(() => {
        // loadDoc();
        players = catchPlayers();
    }, 100);
    setTimeout(() => {
        createCards();
    }, 200);
}

const loadDoc = () => {
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {    
        
        // console.log(JSON.parse(xhttp.responseText)[i]);
        for(let i = 0; i < JSON.parse(xhttp.responseText).length; i++){
            if(JSON.parse(xhttp.responseText)[i].unavaliable == undefined ){ //! if para comprobar que el juego de test no aparezca
                games.push(JSON.parse(xhttp.responseText)[i]);
            }
        }
        
        
    }
    xhttp.open("GET", ("./assets/json/juegos.json"), true);
    xhttp.send();

    console.log(games)
    return

}

const catchPlayers = () =>{
    return JSON.parse(localStorage.getItem('players'));
}

const createCards = () => {

    const container = document.getElementById("selectGames-cards");
    for(let i = 0; i < games.length; i++){
        if(games[i].unavaliable == undefined){
            const card = document.createElement("div");
            card.classList.add("gameCard");
            card.title = games[i].name;
                let img = document.createElement("img");
                img.src = games[i].img;
                img.alt = games[i].name;
            card.appendChild(img);
                let p = document.createElement("p");
                p.textContent = games[i].name;
            card.appendChild(p);

            card.addEventListener("click", (e) => {
                click(e,i);
            }
        );
            container.appendChild(card);
        }
    }

}

const click = (e,i) => {
    if(players.length < 1 || players === null){
        createAlert("No hay jugadores suficientes",e);
    }else{
        window.location = "./" + games[i].name + "/index.html";
    }

}

const createAlert = (message,e) => {
    console.log(e.target)
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
        if(e.target.tagName == "IMG"){
            let x = e.target.alt;
            window.location = "./players.html?x="+x;
        } else if (e.target.tagName == "P"){
            let x = e.target.textContent;
            window.location = "./players.html?x="+x;
        }
    }, 700);
}

var players = [];
const games = [
    {
        title: "Atrevimiento o Verdad",
        name: "A - V",
        img: "./assets/img/unoLogo.png"   
    },
    {
        title: "Uno",
        name: "Uno",
        img: "./assets/img/unoLogo.png"
    },
    {
        unavaliable: true,
        name: "Test de Juego",
        name: "TJ",
        tag: "W.I.P"
    },
    {
        title: "Yo Nunca",
        name: "Yo Nunca",
        img: "./assets/img/unoLogo.png"
    },
    {
        unavaliable: true,
        name: "Uno",
        acronimo: "Uno",
        tag: "W.I.P",
    }
]

window.addEventListener('load', main);

