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

function toggleSubMenu(origen) {
    if (compruebaContenido(origen)) {
        apagaContenidoDirecto(origen);
        muestraOtrosSubMenus();
    } else {
        muestraContenidoDirecto(origen);
        apagaOtrosSubMenus(origen);
    }
}

function toggleSubMenu_v2(origen) {
    if (compruebaContenido(origen)) {
        apagaContenidoDirecto(origen);
        muestraOtrosSubMenus();
        document.getElementById("info-bar").style.display = "flex";
    } else {
        muestraContenidoDirecto(origen);
        apagaOtrosSubMenus(origen);
        document.getElementById("info-bar").style.display = "none";
    }
}
