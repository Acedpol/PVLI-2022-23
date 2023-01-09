import { gameLogic } from '../src/game.js'
import { resume, setPause, swithToOptions } from '../src/utils/callbacks.js';


function apagaContenido(origen) {
    let children = document.getElementById(origen).children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.getAttribute('name') == 'content' && child.style.display == 'block') {
            child.style.display = 'none';
            console.log(child.id);
        }
    }
}

function apagaSubMenus() {
    let submenus = document.getElementsByName('sub-menu');

    let textoFinal = '... apagando [ ';
    submenus.forEach(sm => {
        if (sm.style.display == 'block') {
            apagaContenido(sm.id);
            textoFinal += sm.id + ', ';
        }
    });
    // console.log(textoFinal + ' ] ... ');

    document.getElementById("controles").style.display = "block";
    document.getElementById("about-us").style.display = "block";
    document.getElementById("about-game").style.display = "block";
}


export function toggleInfo(){
    if (document.getElementById("info").style.display == "flex")
        document.getElementById("info").style.display = "none";
    else
        document.getElementById("info").style.display = "flex";
}

export function toggleInfoBar(){
    if (document.getElementById("info-bar").style.display == "flex")
        document.getElementById("info-bar").style.display = "none";
    else
        document.getElementById("info-bar").style.display = "flex";
}

export function onInfoBar(){
    document.getElementById("info-bar").style.display = "flex";
}

export function offInfoBar(){
    document.getElementById("info-bar").style.display = "none";
}

export function onInfo(){
    document.getElementById("info").style.display = "flex";
}
export function offInfo(){
    document.getElementById("info").style.display = "none";
}


export function offAsk() {
    document.getElementById("ask").style.display = "none";
}
export function onAsk() {
    document.getElementById("ask").style.display = "block";
}

// export function setActiveScen

function getActiveScene() {
    let nameScene = null;
    let cont = 0;
    gameLogic.scene.scenes.forEach(scene => {
        if (scene.scene.key != 'boot' && scene.scene.key != 'UI' && scene.isActive()) {
            nameScene = scene.scene.key;
            cont++;
        }
    });

    if (cont == 1) return nameScene; 
    else {
        console.log('ERROR: demasiadas escenas activas!');
        return null;
    }
};

var isPaused = false;
var lastScene = 'menuGame';
function togglePause() {   

    if (!isPaused) {
        lastScene = getActiveScene();
        if (lastScene != null) {
            setPause(gameLogic.scene.getScene(lastScene));
            isPaused = true;
        }
    }
    else if (isPaused) {
        apagaSubMenus();
        resume(gameLogic.scene.getScene('pauseScene'), lastScene);
        isPaused = false;
    } else {
        toggleInfo(); // este caso nunca ocurre
        console.log("esto no debería pasar");
    }

};

document.addEventListener('pause', (event) => {
    // console.log('- - - pause event!!!');
    togglePause();
});

document.addEventListener('options', (event) => {
    // console.log('- - - options event!!!');
    isPaused = false;
    apagaSubMenus();
    offInfo(); offInfoBar();
    swithToOptions(gameLogic.scene.getScene('pauseScene'));
});
