import { gameLogic } from '../src/game.js'

export function toggleInfo(){
    if (document.getElementById("info").style.display == "flex")
        document.getElementById("info").style.display = "none";
    else
        document.getElementById("info").style.display = "flex";
}

document.addEventListener('pause', (event) => {
    togglePause();
    console.log('pause event!!');
});

var isPaused = false;
var lastScene = 'menuGame';
function togglePause() {   

    if (!isPaused) {
        lastScene = getActiveScene();
        if (lastScene != null && lastScene != 'blankPause') {
            gameLogic.scene.getScene(lastScene).handlePause();
            isPaused = true;
        }
    }
    else if (isPaused) {
        gameLogic.scene.getScene('blankPause').handleResume(lastScene);
        isPaused = false;
    } else {
        toggleInfo();
    }

};

function getActiveScene() {
    let nameScene = '';
    let cont = 0;
    gameLogic.scene.scenes.forEach(scene => {
        if (scene.scene.key != 'boot' && scene.isActive()) {
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
