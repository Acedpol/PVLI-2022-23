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
 - En el fichero **_index.html_** se encuentra el punto de acceso que componeel acceso al videojuego.
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

**Géneros**: Acción, Aventura.

**Modos**: Un jugador.

**Público objetivo**:

● Adolescentes y adultos jóvenes - A partir de 12 años.  

**Idioma**: Inglés.

**Plataformas**: Web con teclado y ratón.

**Cantidades**:

● Personaje principal.

● Pájaros - enemigos.

● Materiales.

**Versiones del documento**:

<!-- ![Captura del menú][capturamenu] -->

<!-- ![Captura de Juego][capturajuego] -->

**Descripción**

Aves es un juego top down de acción y supervivencia. Combina combate y sigilo e involucra mecánicas de aggro y distancia a los enemigos.

El protagonista es el líder nato del pueblo, con una personalidad humanista que intenta ayudar a los habitantes del pueblo a pasar la tormenta.

La dificultad avanza con cada nivel, las hordas de pájaros van aumentando y son cada vez son más letales. 

El objetivo principal es rescatar a los pueblerinos.

La puntuación final está basada en el número de niveles completados y pájaros eliminados.  

---  

## Índice  

[**I. Aspectos generales**][1]  
• Vista general  
• Relato de un nivel  

[**II. Controles de juego**][2]  
• Configuración  
• Controles  

[**III. Jugabilidad**][3]  
• Mecánicas  
• Dinámicas  
• Estética  

[**IV. Contenidos**][4]  
• Historia  
• Niveles  
• Personajes  
• Objetos y enemigos  

[**V. Arquitectura y gestión**][6]  

[**VI. Referencias**][5]  

---  

## 1. Aspectos generales  

1.2 **Relato de un nivel :**
El jugador llegará al pueblo en coche, desde donde comenzará el nivel. 
Nada más comenzar el jugador será perseguido por bandadas de cuervos y deberá recorrer las calles para encontrar al habitante que esté en peligro. 
Una vez rescatado, el jugador tendrá que hacerse camino de vuelta al coche.  

[Go back to index -->][indice]

## 2. Controles de juego  

2.1 **Configuración**
Al iniciar el juego desde el menú principal, se mostrará al personaje protagonista en su casa, 
este entorno hace de menú de inicio. 

2.2 **Interfaz y control**

2.2.1. **Interfaz**

**DENTRO DEL JUEGO:**
- Pausa: Pausa el juego
- Habilidades: Radio. (ON/OFF para evitar enemigos.)

2.2.2. **Control**
- Movimiento con wasd
- Esconderse con la "e"
- Atacar con la barra espaciadora  

[Go back to index -->][indice]  

## 3. Jugabilidad  

3.1. **Mecánicas**

**Jugador**:
El jugador tiene un movimiento ortodireccional controlado con WASD.
Se apunta con el cursor y ataca golpeando a melé con un bate en un área en forma de cono.
Interactúa con objetos pulsando la ‘E’.

**Sistema de Vida**:

● *Vida del personaje*: 
    Cuando el jugador entra en contacto con los pájaros se quita vida por segundo, cuantos más hay, más daño hacen. 
    Se regenera cuando se termina el nivel o recogiendo la “comida” repartida por el nivel.

**Objetivos**:
    Habrá dos objetivos a cumplir:

● *Principal*: 
    El objetivo principal es rescatar a las personas que se encuentran en apuros. 
    Se debe completar este objetivo para avanzar al siguiente nivel.

● *Flexible*:
    En cada zona se tienen que recoger suministros para poder mantener segura la casa donde se refugian los supervivientes.

**Sigilo**:
    Por los niveles hay cabinas telefónicas y otras estructuras repartidas por el mapa para poder esconderse.  
    Al entrar en ellas, las aves dejan de atacar y se empeziezan a mover de forma errática.

**Enemigos**:
	Los enemigos de este juego son las aves.  Estas aparecen por las esquinas de la pantalla y se accercan al jugador para atacarle. 
Hacen daño por contacto, el daño depende del número de aves atacando al jugador.
Hay enemigos individuales, representados por un ave además de enemigos bandada, varias aves juntas que cuentan como una sola entidad con mayor salud y daño.

3.2. **Dinámicas**

El juego está dividido en niveles. 
Se llega a la ubicación de cada nivel en coche, una vez ahí se tiene que completar el objetivo principal (rescatar al habitante) y volver al coche para completar el nivel. Además, de conseguir recursos para el hogar.

● Hay un tiempo límite indicado con un contador que tiene el objetivo de causar el estrés que infunde la película.
● La dificultad de los niveles aumenta con cada nivel completado y a medida que avanza el contador aumenta también la dificultad. 
● El juego es injugable (debido a la dificultad) una vez termina el contador.

3.3. **Estética**

● Años 60 en un pueblo pesquero.

● Vista cenital (top-down), claro-oscuro, paisaje exterior.

● Salpicaduras y charcos de sangre y cristales rotos.  

[Go back to index -->][indice]

## 4. Contenidos  

4.1. **Historia**

El protagonista regresa a su pueblo invadido por pájaros y sus amigos y vecinos en peligro, armado con su fiel bate intentará rescatar a todos o morirá en el intento.  

[Go back to index -->][indice]

## 5. Arquitectura y Gestión  
- Pivotal como sistema de gestión.
- Discord como sistema de comunicación para realizar las reuniones grupales y whatsapp para planear reuniones.  

[Go back to index -->][indice]

## 6. Referencias  

● Alfred Hitchcock - Pájaros

● AC - Assassin 's  Creed: tema de sigilo y agro.

● Counter strike: sistema de rehenes.

● Boxhead:  oleadas de pájaros y dinámica de la IA.

● Hotline Miami: Cámara, movimiento por la escena y combate a melé.

[Go back to index -->][indice]

[Nueva arquitectura]: https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1#G1tDmkLnVFnr4bHvG2TSwnUaOESLTw9hM0 "Arquitectura UML"
[Pivotal Tracker]: https://www.pivotaltracker.com/n/projects/2534895 "Herramienta de gestión del Proyecto"
[WEB]: https://acedpol.github.io/Proyecto_PVLI---AVES/ "Web del Proyecto"
[Sprites]: https://www.spriters-resource.com/
[Otros Sprites]: https://www.spriters-resource.com/
[portada]: ./assets/images/donde_sin_ed_menu.jpg
[img1]: ./assets/images/begin.PNG
[img2]: ./assets/images/sangre.PNG
[img3]: ./assets/images/oculto.PNG
[video]: https://www.youtube.com/watch?v=_JTclTVKeSs&ab_channel=MarkRoberenEspa%C3%B1ol  
[indice]: https://github.com/Acedpol/PVLI-2022-23/edit/main/README.md#%C3%ADndice  
[1]: https://github.com/Acedpol/PVLI-2022-23/edit/main/README.md#1-aspectos-generales  
[2]: https://github.com/Acedpol/PVLI-2022-23/edit/main/README.md#2-controles-de-juego  
[3]: https://github.com/Acedpol/PVLI-2022-23/edit/main/README.md#3-jugabilidad  
[4]: https://github.com/Acedpol/PVLI-2022-23/edit/main/README.md#4-contenidos  
[5]: https://github.com/Acedpol/PVLI-2022-23/edit/main/README.md#5-arquitectura-y-gesti%C3%B3n  
[6]: https://github.com/Acedpol/PVLI-2022-23/edit/main/README.md#6-referencias  

