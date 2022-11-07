import { cargarJuego } from '../src/game.js';
import { addNewStyle, submitNewStyle } from './dynamicCSS.js';

// cierra el panel de info, para asegurar que se escala bien
function closeInfo(){
    if (document.getElementById("info").style.display == "flex")
        document.getElementById("info").style.display = "none";
};

// genera un intervalo de busqueda
var checkExist = setInterval(function() {
    if (document.getElementsByTagName('canvas')[0]) {
        addBorderToCanvas();
        setTimeout(ajustarMenuInfo, 50);
        clearInterval(checkExist);
    }
}, 100); // check every 100ms

// Con esto se arreglan todos los problemas del borde desajustado
function addBorderToCanvas() {
    document.getElementsByTagName('canvas')[0].classList.add('game');
};

// Con esto se arreglan todos los problemas del cambio de tamaño        
function resetCanvas() {
    document.getElementById('phaserGame').removeChild(document.getElementsByTagName('canvas')[0]);
    cargarJuego();
    checkExist = setInterval(function() {
        // Fija un intervalo que finaliza y se ejecuta al encontrar el elemento que se espera crear
        if (document.getElementsByTagName('canvas')[0]) {
            addBorderToCanvas();
            setTimeout(ajustarMenuInfo, 50);
            clearInterval(checkExist);
        }
    }, 100); // check every 100ms
};

// Detecta si hay un cambio de resolución de pantalla
window.onresize = function() {
    closeInfo();
    resetCanvas();
};

// ajusta el panel de información para solapar el juego
function ajustarMenuInfo() {
    // recoge los datos del canvas del juego
    let canvas = document.getElementsByTagName("canvas")[0];
    let rect = canvas.getBoundingClientRect();

    let style = canvas.currentStyle || window.getComputedStyle(canvas);
    let borderWidth = style.borderBlockWidth.slice(0, -2);

    let top = parseFloat(borderWidth) + parseFloat(rect.top) + 'px';
    let left = parseFloat(borderWidth) + parseFloat(rect.left) + 'px';
    let width = parseFloat(rect.width) - parseFloat(borderWidth) * 2 + 'px';
    let height = parseFloat(rect.height) - parseFloat(borderWidth) * 2 + 'px';

    // establece los datos al panel de información
    let cssText = 'top: ' + top + '; left: ' + left + '; ' + '; width: ' + width + '; height: ' + height + ';';
    addNewStyle('.panelInfo', cssText);
    submitNewStyle();
    document.getElementById("info").classList.add('panelInfo');

    console.log("info ajustado");
};
