
function compruebaContenido(origen) {
    return document.getElementById('content-' + origen).style.display == 'block';
}

function apagaContenidoDirecto(origen) {
    document.getElementById('content-' + origen).style.display = 'none';
}

function muestraContenidoDirecto(origen) {
    document.getElementById('content-' + origen).style.display = 'block';
}

function muestraOtrosSubMenus() {
    let submenus = document.getElementsByName('sub-menu');
    submenus.forEach(menu => {
        if (menu.style.display == 'none')
            menu.style.display = 'block';
    });
}

function apagaOtrosSubMenus(origen) {
    let submenus = document.getElementsByName('sub-menu');
    submenus.forEach(menu => {
        if (menu.style.display == 'block' && menu.id != origen)
            menu.style.display = 'none';
    });
}

function apagaContenido(origen) {
    let children = document.getElementById(origen).children
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.getAttribute('name') == 'content' && child.style.display == 'block') {
            child.style.display = 'none';
        }
    }
}

function toggleSubMenu(origen) {
    if (compruebaContenido(origen)) {
        apagaContenidoDirecto(origen);
        muestraOtrosSubMenus();
    } else {
        muestraContenidoDirecto(origen);
        apagaOtrosSubMenus(origen);
    }
}

function createEvent (name) {
    var evt = document.createEvent('Event')
    evt.initEvent(name)
    return evt
}

/** @deprecated es una chuleta de uso */
function createEventINFO() {
    // Create the event.
    const event = document.createEvent('Event');

    // Define that the event name is 'build'.
    event.initEvent('build', true, true);

    // Listen for the event.
    elem.addEventListener('build', (e) => {
    // e.target matches elem
    }, false);

    // Target can be any Element or other EventTarget.
    elem.dispatchEvent(event);
}
