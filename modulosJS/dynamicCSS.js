// Conjunto de métodos alternativos para crear y asignar clases CSS por código en JS

var final_style = document.createElement('style');
final_style.type = 'text/css';

export function addNewStyle(selector, style){
  final_style.innerHTML += selector + '{ ' + style + ' } \n';
};

export function submitNewStyle(){
  document.getElementsByTagName('head')[0].appendChild(final_style);

  final_style = document.createElement('style');
  final_style.type = 'text/css';
};

export function submitNewStyleWithMedia(mediaSelector){
  final_style.innerHTML = '@media(' + mediaSelector + '){\n' + final_style.innerHTML + '\n};';
    submitNewStyle();
};
