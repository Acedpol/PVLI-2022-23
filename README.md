# PVLI-2022-23
Proyecto final de PVLI curso 22/23 para el grado GDV-UCM.  
> Pivotal: https://www.pivotaltracker.com/n/projects/2597082  
> Twitter: https://www.twitter.com/StormSudio  
> Videojuego: https://acedpol.github.io/PVLI-2022-23/  
> Arquitectura: [visualizar UML][img-final]  
> Video-demo final: [demo][video]  

---  

## Idea principal
Venus de Milo es la protagonista, que llegado un día un crío coge un bate y la revienta la cabeza, dado que se cae también pierde las piernas, entonces por cosas de la vida cobra vida propia y comienza a moverse en busca de sus extremidades, las cuales le van a ir dando power-ups, primero recuperará las piernas, con lo que podrá andar y saltar, luego un brazo con el que podrá pegar a los enemigos, luego el otro brazo que la dará la posibilidad de alcanzar sitios lejanos o atrapar enemigos con un gancho y finalmente la cabeza que la dará un poder mágico como defensa o algo parecido. Sería una especie de frankestein y podría ir cambiando sus piezas.

## Para iniciar el servidor http  
Primero, iniciar Git Bash en la ruta del proyecto y luego ejecutar el comando: `npx http-server`  
Si no está instalado http-server, ejecutar: `npm install http-server`  
Si node.js no está instalado, descargar e instalar: https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi  
> Phaser docs: https://photonstorm.github.io/phaser3-docs/  

---  
---  

# Forgotten Debris - Storm Studios  
 > EN: This will be the proyect for PVLI, whose proyect is a Phaser 3 implementation, in which we will use JavaScrypt, HTML5, CSS and JSON files.  
 
 > SP: Este repositorio está dedicado al proyecto de PVLI, cuyo proyecto será una implementación de Phaser 3, en el cual se usarán archivos de tipo JavaScrypt, HTML5, CSS y JSON.  

---  

 #### Proyecto desarrollado por: _STORM STUDIOS_  
 ![Pantalla inicio][portada]  
 
---  

 #### IMPORTANTE:  
 - En el fichero **_index.html_** se encuentra el punto de acceso que compone el acceso al videojuego.  
 - En el actual fichero **_readme_** se prensenta información relevante para su uso y sobre el desarrollo del juego.  
 - En la carpeta **_assets_** se encuentran los recursos de los dispone el videojuego.  
 
---  
---  

# GDD: Game Design Document  
> Documento de Diseño del Videojuego  
>> **Forgotten Debris - A bow to our ancestors.**  

### **Contribuidores:** GRUPO #03 - PVLI : STORM STUDIOS   
- JONATHAN ALBERTO CARRERA SANTAMARÍA 	> jocarr01@ucm.es  
- PEDRO PABLO CUBELLS TALAVERA		> pablocub@ucm.es  
- IGNACIO LIGERO MARTÍN 		> iligero@ucm.es  
- MANUEL PRADA MÍNGUEZ			> manuelpr@ucm.es  
- JOSE EDUARDO ROBLES ROCA		> joseer01@ucm.es  
---  

<!-- ## Resumen  

| **Introducción** |  |
| :--- | ---: |
| **Descripción** | Se trata de un juego plataformas estilo metroidvania con scroll lateral donde el personaje es una estatua que debe recuperar sus extremidades perdidas. El objetivo principal es acabar con Jefe,para ello debemos ir avanzando a lo largo del museo y recuperando nuevas piezas para  acceder a sitios que anteriormente estaban bloqueados. A lo largo del juego nos encontraremos con enemigos y consumibles que podremos usar. |
| **Versión** | ( v-1.0 ) –-> 24 de octubre de 2022 | -->

| **Detalles generales** |  |
| :--- | ---: |
| **Géneros** | Acción, Aventura. |
| **Modos** | Historia, single player. |
| **Público objetivo** | Adolescentes y adultos jóvenes - A partir de 12 años. |
| **Idioma** | Inglés. |
| **Plataformas** | Web con teclado y ratón. |

| **Cantidades** |  |
| :--- | ---: |
| **Escenarios** | 4 |
| **Objetos** | Pociones |
| **Armas** | Extremidades, Halo |
| **Mejoras** | Alas |
| **Personajes** | Debris (player) |
| **Palabras** | Estatua, extremidades. |

| **Versiones del documento** | 2022 |
| :--- | ---: |
| **Fecha de propuesta del concepto** | 30 de septiembre |
| **Fechas de pre-producción** | 27 de octubre |
| **Fechas de producción** | 01 de diciembre |
| **Fecha de lanzamiento** | 16 de diciembre |

---  

## Índice  

[**I - Aspectos generales**][1]  
1. Relato breve y parcial de una partida típica  

[**II - Jugabilidad**][2]  
1. Mecánica  
	1. Mecánicas del personaje  
	2. Mecánicas de escenario  
	3. Controles  
	4. Cámara  
2. Dinámica  
3. Estética  

[**III - Menús y modos de juego**][3]  
1. Configuración  
2. Interfaz y control   

[**IV - Contenido**][4]  
1. Historia  
2. Niveles  
3. Personajes y enemigos  
4. Objetos  

[**V - Arquitectura y gestión**][5]

[**VI - Referencias**][6]  

---  

## I - Aspectos generales  
Metroidvania pixelart basado en reconstrucción de victoria. La experiencia general de juego será un plataformas en los que irás consiguiendo powerUps que te permitirán avanzar con más facilidad y acceder a nuevos sitios. 

### 1. **Relato breve y parcial de una partida típica**
Comienza con un menú donde se selecciona “iniciar partida”. Nada más empezar, se te introducirá el juego y su mecánica básica, y en esa misma sala se confrontará un enemigo, para a continuación conseguir sus brazos. Una vez pasada esa sala ...  

[Go back to index -->][indice]  

---  

## II - Jugabilidad  

### 1. Mecánica
   #### 1. Mecánicas del personaje:
    Se basan en las piezas del cuerpo que se van encontrando a través de los niveles.
      ● Vida: La barra de vida será discreta, en la que aparecerán 9 corazones.  
      ● Básicas: Movimiento lateral y salto. Estas mecánicas se pueden usar desde el inicio.
      ● Brazos: Quita 1 de vida. Cuando consigues los brazos, el personaje consigue la capacidad para atacar y matar a los enemigos.
      ● Alas: Al obtener las alas podrás dar doble salto, lo que te permitirá llegar a sitios antes inaccesibles.
      ● Cabeza: Quita 2 de vida. La cabeza te permite lanzar un proyectil. Con esto puedes matar a enemigos a distancia y acceder a la sala final.
	  
   #### 2. Mecánicas del escenario:
    ● Plataformas
	● Enemigos: Tanto enemigos  a melé como enemigos que lanzan proyectiles.
	● Puerta: Antes del nivel final hay una puerta que tiene que ser activada.
	● Teleport: igual que las puertas pero sin un sprite reconocible.
   #### 3. Controles
    ● WASD para el movimiento 
	● J / Botón izq ratón para ataque normal
	● K / Botón drc ratón para ataque a distancia
   #### 4. Cámara
    ● Cámara que sigue al personaje.

### 2. Dinámica
La dinámica principal del juego es avanzar a lo largo de las salas disponibles consiguiendo powerUps para conseguir acceso a otras salas, hasta llegar a la sala final y terminar el juego.

### 3. Estética
Estética pixel art. La mayoría de los recursos van a ser cogidos de internet.

[Go back to index -->][indice]  

---  

## III - Menús y modos de juego
A ambas opciones se accederá a través de dos grandes botones que hagan contraste con el fondo que se decida. En el primer botón pondrá "PLAY" en grande y mayúsculas, mientras que en el segundo pondrá o bien "OPTIONS" de la misma forma que el botón anterior o bien con un dibujo de una tuerca, llave inglesa o similar.
En la parte del PLAY se le introducirán al jugador los controles para a continuación iniciarle un pseudo-tutorial donde tenga que enfrentarse a un enemigo muy sencillito, casi diría uno que es un punchbag.

### 1. Configuración

### 2. Interfaz y control

[Go back to index -->][indice]  

---  

## IV - Contenido

### 1. Historia

Todo comienza en un museo, donde unos críos le quitan unas extremidades a una estatua que ya de por sí le faltaban alguna que otra. Poco después, de repente, cae un estruendoso rayo que da vida a todas las estatuas del museo (incluyendo a nuestra protagonista). Ella, sabiendo lo que le acaban de quitar esos críos y lo que adicionalmente le falta para volver a ser la que fue, para estar "completa". Emprendiendo este camino de justicia deberá enfrentarse a multitud de enemigos que obstaculizan su camino hacia la victoria.

### 2. Niveles

 ![Pantalla inicio][niveles]
 ###Descripción de niveles.
   ####  Nivel 1:
    Se basan en las piezas del cuerpo que se van encontrando a través de los niveles.
      ● Cumple las funciones básicas de tutorial, te muestra como moverte y saltar y puedes practicarlo.
	Antes de llegar a la salida, se puede ver un camino hacia arriba que conduce al nivel 3,
	de momento inaccesible. Al final del nivel obtendrás los brazos.
	####  Nivel 2:
	  ● Al llegar al nivel dos puedes ver una sala amplia con varias plataformas y enemigos.
	Una vez te hayas hecho paso, podrás ver que hay otro camino hacia arriba, aún inaccesible.
	Cuando el personaje sigue por el único camino restante y termina con más enemigos podrá llegar a por
	las alas para conseguir el doble salto y llegar al nivel 3 por ese camino anterior.
	####  Nivel 3:
      ● Accedes a este nivel depués de conseguir las alas desde el nivel 2.
	Será un nivel mixtro en el que entraran los enemigos a distancia y zonas de parkour en las que habrá que usar doble salto.
	Antes de completarlo, a la izquierda se encontrará el ultimo powerUp, la cabeza, solo que antes habrá que pasar por una zona en la
	que te puedes caer, y llegar de nuevo al nivel uno por el pasadizo que ves al principio,
	pero si aún no has conseguido la cabeza tendrás que volverlo a intentar.
	####  Nivel 4:
      ● Una vez pasado en nivel tres, podrás volver al 2 y abrir un pasadizo subterrane o que confuce al nivel final, el 4.
	Aquí aparecerán los perros, enemigos que te podrán perseguir, acompañados de el resto de enemigos antes vistos.
	En este nivel el jugador tendrá que superar el mayor reto,
	formado por todos los obstaculos vistos anteriormente, para poder completar el juego.

### 3. Personaje y enemigos

#### **Todos los enemigos del juego causan daño por contacto**
   ##### ![Pantalla inicio][esqueleto] Esqueleto   
    ● Enemigo a melé, se mueve de un lado a otro dentro de su área y si ve a un enemigo ataca.
	● vida: 3
	● daño: 1
	● velocidad: baja
	● característica: resistente al knockback del ataque, golpea con su hacha.
    
   ##### Guarda de seguridad
    ● Enemigo a distancia, espera dormido que el jugador entra en el rango de ataque empieza a atacar.
	● vida: 2
	● daño: 1
	● velocidad: estática
	● característica: carga su rifle y te dispara.
    
   ##### ![Pantalla inicio][perro] Perro
    ● No ataca pero hace daño por contacto, es más rápido que el esqueleto y persigue al jugador si esste entra en su rango de visión.
	● vida: 1
	● daño: 1
	● velocidad: alta
	● característica: solo daña al contacto, pero se le suele ver acompañado.

### 4. Objetos  
#### **Tanto los powerUps como las pociones se recogen al contacto, y desaparecen al instante**
   ##### Power Ups  
    Las partes de la victoria que estás intentando recomponer y que proporcionan las abilidades de juego.
	Estas están explicadas en el apartado de mecánicas, pero están compuestas por los brazos, las alas y la cabeza.
    
   ##### Pociones
    Poción que cura al jugador un corazon al cogerla.

[Go back to index -->][indice]  

---  

## V - Arquitectura y Gestión  

#### [Diagrama de introducción a Phaser][img-intro-phaser]  

![IMG - Diagrama de introducción a Phaser][img-intro-phaser]  

#### [Diagrama inicial][img-inicio]  

![IMG - Diagrama inicial][img-inicio]  

#### [Diagrama final][img-final]  

![IMG - Diagrama final][img-final]  

[Go back to index -->][indice]  

---  

## VI - Referencias  

* Género Metroidvania  
* Semejanzas con película Exmachina  

[Go back to index -->][indice]  

---  

[WEB]: https://acedpol.github.io/Proyecto_PVLI---AVES/ "Web del Proyecto"
[portada]: ./assets/images/donde_sin_ed_menu.jpg
[niveles]: ./assets/images/Niveles.PNG
[esqueleto]: ./assets/sprites/Skeleton%20Sprite%20Pack/Skeleton/GIFS/Skeleton%20Walk.gif
[perro]: ./assets/sprites/gothicvania%20patreon%20collection/gothicvania%20patreon%20collection/Hell-Hound-Files/GIFS/hell-hound-walk.gif
[video]: https://www.youtube.com/watch?v=_JTclTVKeSs&ab_channel=MarkRoberenEspa%C3%B1ol  

[indice]: #%C3%ADndice  
[1]: #i---aspectos-generales  
[2]: #ii---jugabilidad  
[3]: #iii---men%C3%BAs-y-modos-de-juego  
[4]: #iv---contenido  
[5]: #v---arquitectura-y-gesti%C3%B3n  
[6]: #vi---referencias  

[img-intro-phaser]: ./docs/UML/UML-Intro.jpg "Diagrama de introducción a Phaser"  
[img-inicio]: ./docs/UML/DiagramaClases.png "Diagrama inicial"  
[img-final]: ./docs/UML/uml-final.png "Diagrama final"  
