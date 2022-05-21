main = () => {
    setTimeout(() => {
        recogerDatos();
    }, 100);
    setTimeout(() => {
        crearCards();
    }, 200);
    mostrarVersion();

}

mostrarVersion = () => {

    let versionP = document.createElement("p")
    versionP.id = "version";
    versionP.textContent = version;
    body.appendChild(versionP);

}

recogerDatos = () => {
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {    
        
        for(let i = 0; i < JSON.parse(xhttp.responseText).length; i++){
            if(JSON.parse(xhttp.responseText)[i].unavaliable == undefined ){ //! if para comprobar que el juego de test no aparezca
                juegos.push(JSON.parse(xhttp.responseText)[i]);
            }
        }

        
    }
    xhttp.open("GET", "../json/juegos.json", true);
    xhttp.send();


    return

}


crearCards = () => {
    
    
    if(juegos.length > 0){
        for(let i = 0; i < juegos.length; i++){
            let card = document.createElement('div');
            card.classList.add("card","border-0","bg-transparent");
            card.setAttribute('id', juegos[i].acronimo);
            card.setAttribute("style", "width: "+100/juegos.length+"%;");

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body','rounded-3',);

            let cardTitle = document.createElement('h5');
            cardTitle.classList.add("card-title","text-white");
            cardTitle.textContent = juegos[i].nombre;

            let cardBtn = document.createElement('a');
            cardBtn.classList.add('btn', 'btn-primary', 'btn-card');
            cardBtn.setAttribute('href', "./"+juegos[i].acronimo+"/index.html");
            cardBtn.textContent = "Jugar";

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardBtn);
            card.appendChild(cardBody);
            document.getElementById('cards').appendChild(card);
            
        }
        
    }else{
        location.reload();
    }

}




var juegos = new Array();

const body = document.body

const version = "V 1.1"

window.addEventListener("load",main)