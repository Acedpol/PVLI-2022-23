# PVLI-2022-23
Proyecto final de PVLI curso 22/23 para el grado GDV-UCM.  
> Pivotal: https://www.pivotaltracker.com/n/projects/2597082  
> Twitter: https://www.twitter.com/StormSudio  
> videojuego: https://www.acedpol.github.io/PVLI-2022-23/  
> Link Arquitectura: [visualizar UML][Nueva Arquitectura]  
> Video-demo final: [demo][video]  

## Idea principal
Venus de Milo es la protagonista, que llegado un día un crío coge un bate y la revienta la cabeza, dado que se cae también pierde las piernas, entonces por cosas de la vida cobra vida propia y comienza a moverse en busca de sus extremidades, las cuales le van a ir dando power-ups, primero recuperará las piernas, con lo que podrá andar y saltar, luego un brazo con el que podrá pegar a los enemigos, luego el otro brazo que la dará la posibilidad de alcanzar sitios lejanos o atrapar enemigos con un gancho y finalmente la cabeza que la dará un poder mágico como defensa o algo parecido. Sería una especie de frankestein y podría ir cambiando sus piezas.

## Para iniciar el servidor http 
Primero, iniciar Git Bash en la ruta del proyecto y luego ejecutar el comando: `npx http-server`  
Si no está instalado http-server, ejecutar: `npm install http-server`  
Si node.js no está instalado, descargar e instalar: https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi  

## Relaciones
Genero metroidvania  
Semejanzas con película Exmachina  

# Forgotten Debris - Storm Studios
 > EN: This will be the proyect for PVLI, whose proyect is a Phaser 3 implementation, in which we will use JavaScrypt, HTML5, CSS and JSON files. 
 
 > SP: Este repositorio está dedicado al proyecto de PVLI, cuyo proyecto será una implementación de Phaser 3, en el cual se usarán archivos de tipo JavaScrypt, HTML5, CSS y JSON.
 ___
 #### Proyecto desarrollado por: _STORM STUDIOS_
 ![Pantalla inicio][portada]
 ___
 #### IMPORTANTE:
 - En el fichero **_index.html_** se encuentra el punto de acceso que compone el acceso al videojuego.
 - En el actual fichero **_readme_** se prensenta información relevante para su uso y sobre el desarrollo del juego.
 - En la carpeta **_assets_** se encuentran los recursos de los dispone el videojuego.
 ___
 ___

## GDD: Game Design Document / Documento de Diseño del Videojuego  
### **Redemption Debris - A bow to our ancestors.**  
---  
## **Documento de Diseño - Grupo #03**  
### **Contribuidores:** GRUPO #03 - PVLI : STORM STUDIOS   
- JONATHAN ALBERTO CARRERA SANTAMARÍA 	> jocarr01@ucm.es  
- PEDRO PABLO CUBELLS TALAVERA		> pablocub@ucm.es  
- IGNACIO LIGERO MARTÍN 		> iligero@ucm.es  
- MANUEL PRADA MÍNGUEZ			> manuelpr@ucm.es  
- JOSE EDUARDO ROBLES ROCA		> joseer01@ucm.es  
---  

## Resumen  <-- Hay que cambiar todo desde aqui-->

**Géneros**: Acción, Aventura.

**Modos**: Historia, single player.

**Público objetivo**:

● Adolescentes y adultos jóvenes - A partir de 12 años.  

**Idioma**: Inglés.

**Plataformas**: Web con teclado y ratón.

**Cantidades**:
● Escenarios: 4-5

● Objetos: Pociones

● Armas: Extremidades

● Personajes: Debris (player) y Jefe (boss)

● Palabras: Estatua, extremidades. 

**Versiones del documento**:

● Fecha de propuesta del concepto: 30 de septiembre 2022

● Fechas de pre-producción: 27 de octubre 2022

● Fechas de producción: 01 de diciembre 2022

● Fecha de lanzamiento 16 de diciembre 2022

**Descripción**

Se trata de un juego plataformas estilo metroidvania con scroll lateral donde el personaje es una estatua que debe recuperar sus extremidades perdidas. 
El objetivo principal es acabar con Jefe,para ello debemos ir avanzando a lo largo del museo y recuperando nuevas piezas para  acceder a sitios que anteriormente estaban bloqueados. A lo largo del juego nos encontraremos con enemigos y consumibles que podremos usar.

---  

## Índice  

[**1. Aspectos generales**][1]  
1. Relato breve y parcial de una partida típica

[**2. Jugabilidad**][2]  
1. Configuración  
2. Controles  

[**3. Jugabilidad**][3]  
1. Mecánica  
	1. Mecánicas del personaje
    2. Mecánicas de escenario
    3. Controles
    4. Cámara
2. Dinámica  
3. Estética  

[**IV. Menús y modos de juego**][4]  
1. Configuración  
2. Interfaz y control   

[**V. Contenido**][5]  
1. Historia
2. Niveles
3. Personajes y enemigos
4. Objetos

[**VI. Referencias**][6]  

---  

## 1. Aspectos generales  
Metroidvania pixelart basado en reconstrucción de victoria. La experiencia general de juego será un plataformas en los que irás consiguiendo powerUps que te permitirán avanzar con más facilidad y acceder a nuevos sitios. 

### 1. **Relato breve y parcial de una partida típica**
Comienza con un menú donde se selecciona “iniciar partida”. Nada más empezar, se te introducirá el juego y su mecánica básica, y en esa misma sala se confrontará un enemigo, para a continuación conseguir sus brazos. Una vez pasada esa sala ...

[Go back to index -->][indice]

## 2. Jugabilidad  

### 1. Mecánica
   #### 1. Mecánicas del personaje:
    Se basan en las piezas del cuerpo que se van encontrando a través de los niveles.
      ● Básicas: Movimiento lateral y salto. Estas mecánicas se pueden usar desde el inicio.
	  ● Brazos: Cuando consigues los brazos, el personaje consigue la capacidad para atacar y matar a los enemigos.
      ● Alas: Al obtener las alas podrás dar doble salto, lo que te permitirá llegar a sitios antes inaccesibles.
      ● Cabeza: La cabeza te permite lanzar un proyectil. Con esto puedes matar a enemigos a distancia y acceder a la sala final.
	  
   #### 2. Mecánicas del escenario:
    ● Plataformas
	● Enemigos: Tanto enemigos  a melé como enemigos que lanzan proyectiles.
	● Puerta: Antes del nivel final hay una puerta que tiene que ser activada.
   #### 3. Controles
    ● WASD para el movimiento 
	● J / Botón izq ratón para ataque normal
	● K / Botón drc ratón para ataque a distancia
   #### 4. Cámara
    ● Cámara que sigue al personaje.

### 2. Dinámica
La dinámica principal del juego es avanzar a lo largo de las salas disponibles consiguiendo powerUps para conseguir acceso a otras salas, hasta llegar a la sala final y terminar el juego.

### 2. Estética
Estética pixel art. La mayoría de los recursos van a ser cogidos de internet.

[Go back to index -->][indice]

## 3. Menús y modos de juego
Existirá un único menú donde al iniciar el juego indicas si quieres JUGAR o CONFIGURAR, y durante el juego indicas si quieres REANUDAR o CONFIGURAR.

### 1. Configuración

### 2. Interfaz y control

[Go back to index -->][indice]

## 4. Contenido

### 1. Historia

### 2. Niveles

[niveles]

### 3. Personaje y enemigos

### 4. Objetos

[Go back to index -->][indice]

## 5. Referencias

[Go back to index -->][indice]

## 6. Referencias  

● Alfred Hitchcock - Pájaros

● AC - Assassin 's  Creed: tema de sigilo y agro.

● Counter strike: sistema de rehenes.

● Boxhead:  oleadas de pájaros y dinámica de la IA.

● Hotline Miami: Cámara, movimiento por la escena y combate a melé.

[Go back to index -->][indice]

[WEB]: https://acedpol.github.io/Proyecto_PVLI---AVES/ "Web del Proyecto"
[portada]: ./assets/images/donde_sin_ed_menu.jpg
[niveles]: ./assets/images/Niveles.PNG
[video]: https://www.youtube.com/watch?v=_JTclTVKeSs&ab_channel=MarkRoberenEspa%C3%B1ol  

[indice]: #%C3%ADndice  
[1]: #1-aspectos-generales  
[2]: #2-controles-de-juego  
[3]: #3-jugabilidad  
[4]: #4-contenidos  
[5]: #5-arquitectura-y-gesti%C3%B3n  
[6]: #6-referencias  

