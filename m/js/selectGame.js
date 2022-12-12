main = () => {
    setTimeout(() => {
        // recogerDatos();
    }, 100);
    setTimeout(() => {
        crearCards();
    }, 200);
    mostrarVersion();

}

const mostrarVersion = () => {

    let versionP = document.createElement("p")
    versionP.id = "version";
    versionP.textContent = version;
    body.appendChild(versionP);

}

const recogerDatos = () => {
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {    
        
        // console.log(JSON.parse(xhttp.responseText)[i]);
        for(let i = 0; i < JSON.parse(xhttp.responseText).length; i++){
            if(JSON.parse(xhttp.responseText)[i].unavaliable == undefined ){ //! if para comprobar que el juego de test no aparezca
                juegos.push(JSON.parse(xhttp.responseText)[i]);
            }
        }

        
    }
    xhttp.open("GET", ("../assets/json/juegos.json"), true);
    xhttp.send();


    return

}


const crearCards = () => {
    
    
    if(juegos.length > 0){
        for(let i = 0; i < juegos.length; i++){
            if(juegos[i].unavaliable == undefined){

                let card = document.createElement('div');
                card.classList.add("card","border-0","bg-transparent");
                card.setAttribute('id', juegos[i].name);
                card.setAttribute("style", "width: "+100/juegos.length+"%;");
                
                let cardBody = document.createElement('div');
                cardBody.classList.add('card-body','rounded-3',);
                
                let cardTitle = document.createElement('h5');
                cardTitle.classList.add("card-title","text-white");
                cardTitle.textContent = juegos[i].name;

                
                if(juegos[i].tag != undefined){
                    let cardTag = document.createElement('p');
                    cardTag.classList.add("card-text","text-white","card-tag");
                    cardTag.textContent = juegos[i].tag;
                    cardBody.appendChild(cardTag);
                }
                
                let cardBtn = document.createElement('a');
                cardBtn.classList.add('btn', 'btn-primary', 'btn-card');
                cardBtn.setAttribute('href', "./"+juegos[i].name+"/index.html");
                cardBtn.textContent = "Jugar";
                
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardBtn);
                card.appendChild(cardBody);
                document.getElementById('cards').appendChild(card);
            }
                
        }
        
    }else{
        console.log("No hay juegos");
        location.href = "./index.html"
    }

}


const juegos = [
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

const body = document.body

const version = "V 1.1"

window.addEventListener("load",main)