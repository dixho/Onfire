window.addEventListener('load', () => {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        window.location = "./movil/index.html";
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
    a1.setAttribute('href', 'onfire.dixho.com');
    a1.textContent = 'Inicio';
    const li2 = document.createElement('li');
    const a2 = document.createElement('a');
    a2.setAttribute('href', 'onfire.dixho.com/about.html');
    a2.textContent = 'Acerca de';
    const li3 = document.createElement('li');
    const a3 = document.createElement('a');
    a3.setAttribute('href', 'onfire.dixho.com/contact.html');
    a3.textContent = 'Contacto';

    li1.appendChild(a1);
    li2.appendChild(a2);
    li3.appendChild(a3);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    nav.appendChild(ul);
    header.appendChild(nav);
    document.body.append(header);
    document.body.appendChild(document.createElement('hr'));



}