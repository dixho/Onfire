function main(){
    activarEventsListener()
}

function activarEventsListener() {
    document.getElementById("verdad").addEventListener("click",function(){x(verdad)},false)
    document.getElementById("reto").addEventListener("click",function(){x(reto)},false)
}

function x(variable) {
    console.log(variable)
    var rand = random(variable)
    console.log(rand)
    document.getElementById("TextPregunta").textContent = variable[rand]
    if(variable == verdad){
        document.getElementById("TextTipo").textContent = "Verdad"
    }else{
        document.getElementById("TextTipo").textContent = "Reto"
    }
}

// funcion que genere un numero aleatorio entre 0 y variable.length
function random(variable){
    return Math.floor(Math.random() * variable.length)
}


var verdad = new Array(
    "¿Te ha llegado a atraer alguien del grupo?",
    "Si solo te pudieras llevar a uno a una isla desierta ¿A quién sería?",
    "Algo vergonzoso que te haya pasado",
    "¿A cuántas personas has besado en un mismo día?",
    "¿Has mentido jugando a este juego?",
    "¿Te liarias con alguien de aquí?",
    "¿Has sido infiel/lo serías?",
    "¿Harías un trío?",
    "¿Has tenido sexo en un lugar público?",
    "Lugar público más raro dnde has tenido sexo",
    "¿Fantasía sexual?",
    "¿Has mandado nudes?",
    "¿Serías capaz de matar a alguien?",
    "¿Te han pillado alguna vez tocandote?",
    "¿Te ha gustado alguna vez el padre/madre de algún amigo?",
    "¿Te ha gustado alguna vez algun profesor?",
    "¿Persona más mayor con la que has tenido algo?",
    "¿Persona más pequeña con la que has tenido algo?"
    );

var reto = new Array("a","b","c");


window.addEventListener("load", main, false);