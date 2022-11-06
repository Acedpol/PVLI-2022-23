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
        if (gameLogic.scene.getScene('pvliGame').isActive()) 
        {
            gameLogic.scene.getScene('pvliGame').handlePause();
            isPaused = true;
            lastScene = 'pvliGame';
        }
        else if (gameLogic.scene.getScene('menuGame').isActive()) 
        {
            gameLogic.scene.getScene('menuGame').handlePause();
            isPaused = true;
            lastScene = 'menuGame';
        }
    }
    else if (isPaused) {
        gameLogic.scene.getScene('blankPause').handleResume(lastScene);
        isPaused = false;
    } else {
        toggleInfo();
    }

};
