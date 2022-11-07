import { cargarJuego } from '../src/game.js';

var checkExist = setInterval(function() {
    if (document.getElementsByTagName('canvas')[0]) {
        addBorderToCanvas();
        clearInterval(checkExist);
    }
}, 100); // check every 100ms

function addBorderToCanvas() {
    // Con esto se arreglan todos los problemas del borde desajustado
    document.getElementsByTagName('canvas')[0].classList.add('game');
}

function resetCanvas() {
    // Con esto se arreglan todos los problemas del cambio de tamaño        
    document.getElementById('phaserGame').removeChild(document.getElementsByTagName('canvas')[0]);
    cargarJuego();
    checkExist = setInterval(function() {
        // Fija un intervalo que finaliza y se ejecuta al encontrar el elemento que se espera crear
        if (document.getElementsByTagName('canvas')[0]) {
            addBorderToCanvas();
            clearInterval(checkExist);
        }
    }, 100); // check every 100ms
}

window.onresize = function() {
    // Se lanza la ejecución cuando se detecta un cambio de ventana
    resetCanvas();
};
