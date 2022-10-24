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

# Redemption Debris - Storm Studios
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

## Resumen  

| **Introducción** |  |
| :--- | :---: |
| **Descripción** | Se trata de un juego plataformas estilo metroidvania con scroll lateral donde el personaje es una estatua que debe recuperar sus extremidades perdidas. El objetivo principal es acabar con Jefe,para ello debemos ir avanzando a lo largo del museo y recuperando nuevas piezas para  acceder a sitios que anteriormente estaban bloqueados. A lo largo del juego nos encontraremos con enemigos y consumibles que podremos usar. |
| **Versión** | ( v-1.0 ) –-> 24 de octubre de 2022 |

| **Detalles generales** |  |
| ---: | :---: |
| **Géneros** | Acción, Aventura. |
| **Modos** | Historia, single player. |
| **Público objetivo** | Adolescentes y adultos jóvenes - A partir de 12 años. |
| **Idioma** | Inglés. |
| **Plataformas** | Web con teclado y ratón. |

| **Cantidades** |  |
| :--- | ---: |
| **Escenarios** | 4-5 |
| **Objetos** | Pociones |
| **Armas** | Extremidades |
| **Personajes** | Debris (player) y Jefe (boss) |
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

### 3. Personaje y enemigos

#### **Todos los enemigos del juego causan daño por contacto**
   ##### ![Pantalla inicio][esqueleto] Esqueleto   
    Enemigo a melé, se mueve de un lado a otro dentro de su área y si ve a un enemigo ataca.
    
   ##### Guarda de seguridad
    Enemigo a distancia, se mueve de un lado a otro hasta que el jugador entra en el rango de ataque empieza a atacar.
    
   ##### ![Pantalla inicio][perro] Perro
    No ataca pero hace daño por contacto, es más rápido que el esqueleto.

### 4. Objetos  

[Go back to index -->][indice]  

---  

## V - Arquitectura y Gestión    

[Go back to index -->][indice]  

---  

## VI - Referencias  

● Alfred Hitchcock - Pájaros

● AC - Assassin 's  Creed: tema de sigilo y agro.

● Counter strike: sistema de rehenes.

● Boxhead:  oleadas de pájaros y dinámica de la IA.

● Hotline Miami: Cámara, movimiento por la escena y combate a melé.

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

[Nueva arquitectura]: https://viewer.diagrams.net/?tags=%7B%7D&target=blank&highlight=0000ff&edit=_blank&layers=1&nav=1&title=UML#R5VttV6M6EP41%2FagHSkvbj7Z6d923613d6%2F2aQgpZA8EQbN1ffycQCk2o1lqo657jUTKECXmemWEmiT1nFq0%2BcJSEX5mPaa9v%2Bauec97r9%2B3RcAR%2FpOSxkIzdSSEIOPFVp0pwTX5hJbSUNCM%2BTjc6CsaoIMmm0GNxjD2xIUOcs%2BVmtwWjm6MmKMCG4NpD1JTeEl%2BEahb9USX%2FiEkQliPb5fwiVHZWM0lD5LNlTeRc9JwZZ0wUV9FqhqkEr8Tl9vLxln65cz98%2Bie9Rz%2Bmn2%2B%2B%2FXtSKPvrJY%2Bsp8BxLPZWPf70383Xy4er6Jr9ym4W1Pl8d6MesR4QzRReF7Eg4lHNWDyWMC5DIvB1gjzZXoKp9JxpKCIKLRsuESVBDNcevCHmIFB6MRd4pRHxzCzsNbRgk5hFWHB4HUtpKclQ1jhRzWVFrW0pWVijdaBkSFlTsFZcIQYXCrQXAGgbAF4KHBnwAQrwJtNUcHaHZ4wywOg8ZjHcni4IpZooBaBJHHzBC%2Fn%2Bg0ryXU1Jihigu6C5RYbE9zHgP%2BVMIIHm%2BbAWtBNGYpHPeTiFH0BhZp0Oe0N4pxm07aoNP7I7FzMWw2sikpOEUSqWOJXvvmCxUO5t91tk2NlkeGgyPGgg2GmL4P6uHgLhIZGXBdMR4gGRHuFAw2dZQYl0lTfqSXYD0N26kmMgfSYEJ%2FNMYANsUAcfEPx24Vx%2F%2F44G56ATOPOooBQNOoR3dGx4h53A66M0xL662xG2jnNsbF0D2%2B%2BYIkHgyxSSZGvk5SGL5lkqv2OYE3gVCWEpvapEbyZm2BrwTdlMvwF4ty3gRwbwpi3H%2FplMy6tkpYYcZ1ns5%2FZqrWHDvpGg7wcaz23gYVNZEwTq0SuZ%2B2wFezDSQExZxj2sHqrn0bqe0TOKBHz6sTAU5YSsp7M%2FR2ODo68GSRyn5FctDWwwbprnllNp1ASqpTMlnjMhWLQmT1VlSlVvHSqe8YXtxrXVF8pMemeWX2XoEwPEb%2FuAyAuffDsodgpi6VF%2FRLiYHCpc6IpaDhe2WaH%2BLqZuW83MHsXWzTrw3dr60D6QrRuK2rZ1s4S0fxdb778hWzdrm%2Fdr6%2FrC0d62ritq29bNIukpkjyK0pR4%2BRok4sIUd0VfrbYZNpQ2peywLLvWniy7GsnDjkl%2BWUH2Xtl0D8SmrTt%2F13SatdsbCqwdeeahXNM%2Btm%2BaNaRBZrokEUXFlo4Mu2r%2FpCKv9TUlt0xKauyu%2B9TptXX4DreD0lQmulQmWCHMxQ3k1UeMfBIH5Q0YqLpXCpNS8IVxucdmkSTN5F8%2F3z0D5Im0DwSvLbe38gQthQQNi0zehQESAuExH8bClKheKTiU1CGFJEsjJpsCR0muk8Qe8Ymf5aaXyV8UzWF82VuUY8tWhIIYyWEouc%2FQaW0mSTURzT7UtmDNw1%2B4QwiCYdW6YQkIJODNa5zNO4ZmSNkrgZ08aZb6GnPDSuekySr7rVmlWReb9HCC4kC2nlsyzvddCZNFwqRN79ZgHDWsGLsNMI5bQ3GHsngvFE9ahVH%2FCB0fR7Ny%2FXHAaGHsaOiVbQThYCtDe4SIfTjpDzc4GZemVOPEaeCkvZ1%2Fcwf17x042R1rfSVi87CGPI%2BBMsFSdebiBXS3RZGjMWRNjszQDgsVlfHm5MxTRjOBz7h3XeFaZ6%2B60WGWNrF2zdL0bPlwWJrrCREisYFnPfqofddoFcizg6eYn6LYC9m2Ldb9k4uC6CdLFtsadgqXWZmn2fzA1tcEohkkNqMCiUPMidACQyU9PAkrjYCyHjMsejI4beBI3w853HmiptxErztKiTzHskGde5%2Bx8sZJEYPPoIM9TlbFY%2Br%2BuibBj1C6ywLAl9VA2ps5vbPzaA4EpLVaoBhnc2yt2HkXNcLrY2LDAap%2B02GI9s6jmTmZQc4RCvx1ErodJ9tpSl4n7XmamSmZnnZOEHwmIukh8gSlj%2FwTearHI9JTpk68W%2Bl%2FEee1e17sBxmROZZ0uUp3igvUc%2F8DPRbHC4p%2Fotw1qfyFwX8yT2R87axy3RSneX1PKKRkeV%2BgKe9AQKN8QxvxcugH4mP2M8MB%2B%2BPK%2FMIpXlHmN%2Fqw3VqK6JgpYpcn3PfB0NVOQI8bHPxAx%2FGgWf3%2FQrEwWv0XiHPxPw%3D%3D

