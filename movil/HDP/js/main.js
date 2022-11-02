const main = () => {
    
    
    loadDoc();
    eventListeners();
    setInitialPositions();
    setFirstCards();
}

const loadDoc = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        
            // console.log(JSON.parse(xhttp.responseText))
            strings = JSON.parse(xhttp.responseText);
            console.log(strings);
    };
    xhttp.open("GET", "./json/strings.json", true);
    xhttp.send();
}

const eventListeners = () => {

    $(window).resize(setInitialPositions);


}

const setInitialPositions = () => {

    setGamePosition();
    setTablePosition();
    setHandPosition();	
    

}

    const setGamePosition = () => {
        let height = $(window).height();
  
        $('#game').height(height);
    }

    const setTablePosition = () => {
        let height = $('#game').height();
        let width = $('#game').width();
        let tableHeight = height * 0.8;
        let tableWidth = width * 0.8;
        let tableTop = height * 0.1;
        let tableLeft = width * 0.1;

        $('#table').height(tableHeight);
        $('#table').width(tableWidth);
        $('#table').css('top', tableTop);
        $('#table').css('left', tableLeft);
    }

    const setHandPosition = () => {
        let height = $('#game').height();
        let width = $('#game').width();
        let handHeight = height * 0.2;
        let handWidth = width * 0.6;
        let handTop = height * 0.5;
        let handLeft = width / 10;

        $('#hand').height(handHeight);
        $('#hand').width(handWidth);
        $('#hand').css('top', handTop);
        $('#hand').css('left', handLeft);
    }


const setFirstCards = () => {

    for(let f = 0 ; f < maxCards ; f++){
        let card = createDivCard("black", strings[Math.floor(Math.random() * strings.length)].string,0);
        $('#hand').append(card);
    }

}

const createDivCard = (color, string, player) => {
    console.table(color, string, player);
    let divCard = document.createElement('div');
    divCard.className = "card";
    if(color == "black"){
        divCard.className += " black";
    }else if(color == "white"){
        divCard.className += " white";
    }else{
        throw new Error("Color not defined");
    }
    let p = document.createElement('p');
    p.textContent = string;
    divCard.appendChild(p);
    divCard.setAttribute("player", player);

    return divCard;

}

var strings = new Array();

const maxCards = 5;

window.addEventListener("load",() => {
    loadDoc();
    setTimeout(main, 200);
})