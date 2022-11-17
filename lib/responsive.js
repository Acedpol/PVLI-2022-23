import { cargarJuego } from '../src/game.js';
import { addNewStyle, submitNewStyle } from './dynamicCSS.js';
import { offInfoBar, offInfo } from './pauseCtrl.js';

// cierra el panel de info, para asegurar que se escala bien
function resetInfo(){
    offInfoBar();
    offInfo();
};

// genera un intervalo de busqueda
var checkExist2 = setInterval(function() {
    if (document.getElementsByTagName('canvas')[0]) {
        addBorderToCanvas();
        setTimeout(ajustarMenuInfo, 50);
        clearInterval(checkExist2);
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
    checkExist2 = setInterval(function() {
        // Fija un intervalo que finaliza y se ejecuta al encontrar el elemento que se espera crear
        if (document.getElementsByTagName('canvas')[0]) {
            addBorderToCanvas();
            setTimeout(ajustarMenuInfo, 50);
            clearInterval(checkExist2);
        }
    }, 100); // check every 100ms
};

// Detecta si hay un cambio de resolución de pantalla
window.onresize = function() {
    resetInfo();
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

    // establece los datos a la barra informativa
    height = parseFloat(height.slice(0, -2));
    top = parseFloat(top.slice(0, -2)) + height * 0.9;
    top = top + 'px';
    height = height * 0.1 + 'px';
    cssText = 'top: ' + top + '; left: ' + left + '; ' + '; width: ' + width + '; height: ' + height + ';';
    addNewStyle('.barInfo', cssText);
    submitNewStyle();
    document.getElementById("info-bar").classList.add('barInfo');

    console.log("info ajustado");
};
