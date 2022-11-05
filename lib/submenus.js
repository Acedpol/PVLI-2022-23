
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

function toggleInfo(){
    if (document.getElementById("info").style.display == "flex")
        document.getElementById("info").style.display = "none";
    else
        document.getElementById("info").style.display = "flex";
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

function togglePause(origen) {
    toggleSubMenu(origen);
};
