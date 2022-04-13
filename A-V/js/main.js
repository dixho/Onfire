main = () =>{
    activarEventsListenerGenerales()
    nombrarBotonHome()
}

nombrarBotonHome = () =>{
    document.getElementById("btn-home").innerHTML = "Onfire"
}

activarEventsListenerGenerales = () =>{
    document.getElementById("cabezatx").addEventListener("click", function(){window.location = "./index.html"}, false)
    document.getElementById("btn-home").addEventListener("click", ()=>{window.location = "../index.html"}, false)
}


window.addEventListener("load",main,false)