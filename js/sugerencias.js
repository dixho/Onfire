main = () =>{

    activarEventListeners()
    cathUrl()

}

activarEventListeners = () => { 
    
    document.getElementById("submit").addEventListener("click", active);
    document.getElementById("btn-home").addEventListener("click", () => {window.location = "../index.html"})
}

function active() {
    console.log("ddd")
  document.getElementById("submit").classList.toggle("is_active");
}

cathUrl = () => {
    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split("&");
    var params = {};
  
    for (var i = 0; i < paramarr.length; i++) {
      var tmparr = paramarr[i].split("=");
      params[tmparr[0]] = tmparr[1];
    }

    var x = params.x;
    x = params.x;


    
    if(x == "done"){
        alert("Email enviado correctamente")
    } else if(x == "error"){
        alert("Algo ha salido mal, vuelva a intentarlo")
    }
  
}

window.addEventListener("load",main)