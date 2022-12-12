window.addEventListener('load', () => {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        window.location = "./m/index.html";
    } else {
        createHeader();
    }
});


const createHeader = () => {
    const header = document.createElement('header');
    const p = document.createElement('p');
    p.textContent = 'Onfire';
    p.id = 'title';
    header.appendChild(p);
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    const li1 = document.createElement('li');
    const a1 = document.createElement('a');
    a1.setAttribute('href', "../index.html");
    a1.textContent = 'Inicio';
    a1.id = 'homeBtn';
    const li2 = document.createElement('li');
    const a2 = document.createElement('a');
    a2.setAttribute('href', '../players.html');
    a2.textContent = 'Jugadores';
    a2.id = 'playersBtn';


    li1.appendChild(a1);
    li2.appendChild(a2);

    ul.appendChild(li1);
    ul.appendChild(li2);
 
    nav.appendChild(ul);
    header.appendChild(nav);

    document.body.insertBefore(document.createElement('hr'), document.body.firstChild);
    document.body.insertBefore(header, document.body.firstChild);
    
}

