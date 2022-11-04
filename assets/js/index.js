const main = () => {
    setTimeout(() => {
        loadDoc();
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
                juegos.push(JSON.parse(xhttp.responseText)[i]);
            }
        }

        
    }
    xhttp.open("GET", ("./assets/json/juegos.json"), true);
    xhttp.send();

    console.log(juegos)
    return

}

const createCards = () => {

    const container = document.getElementById("selectGames-cards");
    for(let i = 0; i < juegos.length; i++){
        const card = document.createElement("div");
        card.classList.add("gameCard");
        card.title = juegos[i].name;
            let img = document.createElement("img");
            img.src = juegos[i].img;
            img.alt = juegos[i].name;
        card.appendChild(img);
            let p = document.createElement("p");
            p.textContent = juegos[i].name;
        card.appendChild(p);

        card.addEventListener("click", () => {
            window.location = "./"+juegos[i].name+"/index.html";
        });
        container.appendChild(card);

    }

}

var juegos = [];

window.addEventListener('load', main);
