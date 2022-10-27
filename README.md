# PVLI-2022-23
Proyecto final de PVLI curso 22/23 para el grado GDV-UCM.  
> Pivotal: https://www.pivotaltracker.com/n/projects/2597082  
> Twitter: https://www.twitter.com/StormSudio  
> Videojuego: https://www.acedpol.github.io/PVLI-2022-23/  
> Arquitectura: [visualizar UML][Nueva Arquitectura]  
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

# Forgottenks Debris - Storm Studios  
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
>> **Forgottenks Debris - A bow to our ancestors.**  

### **Contribuidores:** GRUPO #03 - PVLI : STORM STUDIOS   
- JONATHAN ALBERTO CARRERA SANTAMARÍA 	> jocarr01@ucm.es  
- PEDRO PABLO CUBELLS TALAVERA		> pablocub@ucm.es  
- IGNACIO LIGERO MARTÍN 		> iligero@ucm.es  
- MANUEL PRADA MÍNGUEZ			> manuelpr@ucm.es  
- JOSE EDUARDO ROBLES ROCA		> joseer01@ucm.es  
---  

## Resumen  

| **Introducción** |  |
| :--- | ---: |
| **Descripción** | Se trata de un juego plataformas estilo metroidvania con scroll lateral donde el personaje es una estatua que debe recuperar sus extremidades perdidas. El objetivo principal es acabar con Jefe,para ello debemos ir avanzando a lo largo del museo y recuperando nuevas piezas para  acceder a sitios que anteriormente estaban bloqueados. A lo largo del juego nos encontraremos con enemigos y consumibles que podremos usar. |
| **Versión** | ( v-1.0 ) –-> 24 de octubre de 2022 |

| **Detalles generales** |  |
| :--- | ---: |
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

#### [Componentes básicas][Diagrama componentes básicas]  

![IMG - componentes básicas][img-comp-basicas]  

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

[img-comp-basicas]: ./docs/UML/UML-Intro.jpg  "Diagrama componentes básicas de un juego en Phaser 3.0"  

[Nueva arquitectura]: https://viewer.diagrams.net/?tags=%7B%7D&target=blank&highlight=0000ff&edit=_blank&layers=1&nav=1&title=UML#R5VttV6M6EP41%2FagHSkvbj7Z6d923613d6%2F2aQgpZA8EQbN1ffycQCk2o1lqo657jUTKECXmemWEmiT1nFq0%2BcJSEX5mPaa9v%2Bauec97r9%2B3RcAR%2FpOSxkIzdSSEIOPFVp0pwTX5hJbSUNCM%2BTjc6CsaoIMmm0GNxjD2xIUOcs%2BVmtwWjm6MmKMCG4NpD1JTeEl%2BEahb9USX%2FiEkQliPb5fwiVHZWM0lD5LNlTeRc9JwZZ0wUV9FqhqkEr8Tl9vLxln65cz98%2Bie9Rz%2Bmn2%2B%2B%2FXtSKPvrJY%2Bsp8BxLPZWPf70383Xy4er6Jr9ym4W1Pl8d6MesR4QzRReF7Eg4lHNWDyWMC5DIvB1gjzZXoKp9JxpKCIKLRsuESVBDNcevCHmIFB6MRd4pRHxzCzsNbRgk5hFWHB4HUtpKclQ1jhRzWVFrW0pWVijdaBkSFlTsFZcIQYXCrQXAGgbAF4KHBnwAQrwJtNUcHaHZ4wywOg8ZjHcni4IpZooBaBJHHzBC%2Fn%2Bg0ryXU1Jihigu6C5RYbE9zHgP%2BVMIIHm%2BbAWtBNGYpHPeTiFH0BhZp0Oe0N4pxm07aoNP7I7FzMWw2sikpOEUSqWOJXvvmCxUO5t91tk2NlkeGgyPGgg2GmL4P6uHgLhIZGXBdMR4gGRHuFAw2dZQYl0lTfqSXYD0N26kmMgfSYEJ%2FNMYANsUAcfEPx24Vx%2F%2F44G56ATOPOooBQNOoR3dGx4h53A66M0xL662xG2jnNsbF0D2%2B%2BYIkHgyxSSZGvk5SGL5lkqv2OYE3gVCWEpvapEbyZm2BrwTdlMvwF4ty3gRwbwpi3H%2FplMy6tkpYYcZ1ns5%2FZqrWHDvpGg7wcaz23gYVNZEwTq0SuZ%2B2wFezDSQExZxj2sHqrn0bqe0TOKBHz6sTAU5YSsp7M%2FR2ODo68GSRyn5FctDWwwbprnllNp1ASqpTMlnjMhWLQmT1VlSlVvHSqe8YXtxrXVF8pMemeWX2XoEwPEb%2FuAyAuffDsodgpi6VF%2FRLiYHCpc6IpaDhe2WaH%2BLqZuW83MHsXWzTrw3dr60D6QrRuK2rZ1s4S0fxdb778hWzdrm%2Fdr6%2FrC0d62ritq29bNIukpkjyK0pR4%2BRok4sIUd0VfrbYZNpQ2peywLLvWniy7GsnDjkl%2BWUH2Xtl0D8SmrTt%2F13SatdsbCqwdeeahXNM%2Btm%2BaNaRBZrokEUXFlo4Mu2r%2FpCKv9TUlt0xKauyu%2B9TptXX4DreD0lQmulQmWCHMxQ3k1UeMfBIH5Q0YqLpXCpNS8IVxucdmkSTN5F8%2F3z0D5Im0DwSvLbe38gQthQQNi0zehQESAuExH8bClKheKTiU1CGFJEsjJpsCR0muk8Qe8Ymf5aaXyV8UzWF82VuUY8tWhIIYyWEouc%2FQaW0mSTURzT7UtmDNw1%2B4QwiCYdW6YQkIJODNa5zNO4ZmSNkrgZ08aZb6GnPDSuekySr7rVmlWReb9HCC4kC2nlsyzvddCZNFwqRN79ZgHDWsGLsNMI5bQ3GHsngvFE9ahVH%2FCB0fR7Ny%2FXHAaGHsaOiVbQThYCtDe4SIfTjpDzc4GZemVOPEaeCkvZ1%2Fcwf17x042R1rfSVi87CGPI%2BBMsFSdebiBXS3RZGjMWRNjszQDgsVlfHm5MxTRjOBz7h3XeFaZ6%2B60WGWNrF2zdL0bPlwWJrrCREisYFnPfqofddoFcizg6eYn6LYC9m2Ldb9k4uC6CdLFtsadgqXWZmn2fzA1tcEohkkNqMCiUPMidACQyU9PAkrjYCyHjMsejI4beBI3w853HmiptxErztKiTzHskGde5%2Bx8sZJEYPPoIM9TlbFY%2Br%2BuibBj1C6ywLAl9VA2ps5vbPzaA4EpLVaoBhnc2yt2HkXNcLrY2LDAap%2B02GI9s6jmTmZQc4RCvx1ErodJ9tpSl4n7XmamSmZnnZOEHwmIukh8gSlj%2FwTearHI9JTpk68W%2Bl%2FEee1e17sBxmROZZ0uUp3igvUc%2F8DPRbHC4p%2Fotw1qfyFwX8yT2R87axy3RSneX1PKKRkeV%2BgKe9AQKN8QxvxcugH4mP2M8MB%2B%2BPK%2FMIpXlHmN%2Fqw3VqK6JgpYpcn3PfB0NVOQI8bHPxAx%2FGgWf3%2FQrEwWv0XiHPxPw%3D%3D

[Diagrama componentes básicas]: https://viewer.diagrams.net/?tags=%7B%7D&target=blank&highlight=0000ff&layers=1&nav=1&title=UML#R7V1bc6M4Fv41foyLu%2B1HXzNdlUxnO5nd6act2SiGbkCsjJN4fv1KINkgifgSZNIzpLsSkEGAvo9z0zlyz57Gb7cYpME98mHUswz%2FrWfPepZlDkcW%2BUNbdkXLyHaLhjUOfXbQoeEx%2FAuyRoO1bkMfbioHZghFWZhWG1coSeAqq7QBjNFr9bBnFFWvmoI1lBoeVyCSW%2F8T%2BllQtA6twaH9NxiuA35l0xsVn8SAH8yeZBMAH72Wmux5z55ihLJiK36bwogOHh%2BX4rxFzaf7G8MwyU454fn2X4vZKP5j61r33778iH6%2Fm97emLZd9PMCoi175J7lRaTHyZJsrOnG%2FfjL7%2BSQb%2FPHr398m84fyfbi6zfy%2B%2Bm3Ofl9O76f83PI5fenscfOdnwsXyDOQjK04yhcJ6QpQyk5DLC9CD7TszYpWIXJ%2Bol%2BNhseGu7yj2fWoeUbG3YzbwtASi%2Bz2i4h3S2IRFhkT%2FwQE2aEiF5kg7YUlskzSrJHdmcO2Q%2ByOKLH01MzjH7CKYoQzm%2FbNvIfdtICxGFEuTxFcbgiz%2FcIkg35c%2F%2FIe2VXpr0%2Bh1FU6Wg6zTtiQ06GA77VomnuOUJeLohimOEdOYSdMHQZrdh7ZfMX5vXAUtthbUGJoQ4%2FEbA3Y73v%2B0AessH4cwaXHFem0tTqjSfjJRlTQF5Oy5hGYLOhrRMyCF4vv2178hCADcT9WxDDr8sfBKxNaVui0eY1jCOQQAFG2tEqCCP%2FDuwIyhTsDKx%2B8r1JgHD4FzkeHIAGmMPlGpUjHumZrE8MKZkeODKm0HQP3ioH3oFNxu8GRRFIN%2BEyvz96YgzwOkwmKMtQzA7i9F%2BRviBWkOgjfKzyb7HwyE8z%2FLMHVf65Mv2sgYJ%2Bo6Eu9nkKQTahzCEjCyUSkSfPpMFNUMGq0rCxpqoQcmQhRJsQGdHnKJfxQej7MKGkQBnIwHLP0BSFSZY%2Fuzsh%2F8kITY2%2B23PJPU3JvnnYJ%2F%2Fp4TibooS%2BP2EODCT0eoWUYhWiWKfQ4STY33m1ZTKcCb7laALf5JJOQj%2FbpR34WsEfOC2D74xq9M4dvfjNa3EPZ%2BieLzE1Ct9RO1rUDNomPvTZSZIlISi6grrcIrVkNSUpJLMwkgoTNDeLwCbIr6fUQs1pnUn%2Brxmt47hu1eoZKiSPqSDfXkA0zj63TvIwvbMnWtH6JrXspBYqnrZYPvcZE5JKvBTt54uFmihS1OZ6TqqSTJNkHGF7icS6ZNLobIWkosVIGyvMGplEhiElAFA1YBl3IXk1TxBI5ZM6Y7gpsUTN4WbEkjm4yBZ2BtroZ0n0G0dpADpL6ENSx62hwZm429pgl4M5kwgmPg3LddDrhF5lh1wXekeCfgZTci8d7BphNxVRtyvjLgfdFlGYdrBrhd1pHXY52nULswn1IWUbscO%2BSewHrWM%2FkLC%2FB5ufHew6YbeM1mEfSrB%2FxSHxoDrgtQJvtw68HN98CFMYhd20hmbovbah5zdQgv5xhVEULcAqI0B28OuEf9Q6%2FHIUMR%2BaDnaNsNtW67DL0bunYkpginDn2ulFv%2FUgnicH8Z7ogHWw64S99QCeJwfwnjB59GeE4w57ndg7rQfxPDmI9%2B%2BwmCrrkNeJfOtxvIEs7OdvGVRF8UjjmCY0k71lhOiM7IQ08YH0it1FSK%2BfI1ZKaT3kllyUxkrGGO%2F%2BpGf3B8a%2B4Tv9uG8cjpjxud9ib1fee4A4JCNG53RnhwxY6EvJ18KUKxkBtMUr%2BM4Q8vSfDOA1fI8MLGors6GEvsk9LgwjkIUv1dtTwc%2B6e0C5juYzwh5njBg%2B4l0Uj8XOOpBI6sj1hI5MoaPisaWOcjbun%2FEDBJXV0icmqFkmJ5VHR6j5FmZ%2FlrZLZ5G9w0l0Z9c8c7mpeZS5hW3QCnFNMV38VOLaRrUjKe9cN3EV%2BcByViBtOT0x8DHFYaYpM9DtdZmBH8kMFOSkZ7myajcUqn040KXa5WkamsaXM64gUh8kYSzL0X9kQl%2Fxutan1pyIpm1pQpP7h59bD3J9ttdh38sqTKnPSsbdXl1%2BL6vSGt3ZoB7kovqoHnSvZ8C5Qn2LPfQuNOCEjswrG3BD2YATMlH3mq%2Bo%2BsO8fo8pwDERUoCWz20Om0Q9KfRgicg%2BRukTh9P4oNZ4v6rOthfkpxktIiRyerbVHygkj8pFHJh9V5fsURTWSTYIq3%2BMkb%2BlbZMfMMt23AwY8oZ9raqjDxOmjy7XBcMac7faTUUVyHhYzciBG6tKCcFaQM%2FPG6jnvZVnfU0J9ZKqQWketym9gyWlY3Frkx%2FthyBGif8UhIlgiLI0a9JQUlFUzHMjE%2BEsQGuUgGh%2BaBWreEVTY8myvD%2Bq4drQOkfoeGP0Bx5Hi7HkZtQI%2BfZFvZx81qXO2OhIRzVK6NCRfsKP5MnOKfWFwkRhYhEC3IEljKqMl3wVkYZx6Ps5XUWjtxrenNX4WZfZvmxpAna13l4yHZeDNUUurHujT3CtSie7EdrxMziZBb2mkQLWMVvlWNXMQ7DbhCtiqeAV8GFXOFOS6E157XOP%2FmvI3rLd46UzQ4V2d7TV843kiPx4tYIRxLnlK%2FGom5A5x7Qr3vCzKmhU8GubjxnJ3tI4WW8jgDvgdQKvmn6%2FLvCyj0Wz6VfdDKxW3JUFNNcFXp4nmMHldt3hrhV31cz7dXGXw%2FMzDDrY9cKuKp65LuxyFcU8AV2mjWbgleUz1wVejqctcLjqbHrt0KsKaK4KvcnJV66WxOAlzHYd9FqhVxXQXBl6Oar4JY7RSyfytYOvKp%2B5MvhyPPGepvp0uGvEXVk%2Fc2Xc5Rjew3YTdO%2B8duxbD%2BCZhhzB62rmtOPeevzONBQ1FDBCq87I04y9snzmuthbdTlO94Auj%2FB%2Bgq8wZfj3X%2Fwzz8%2B6UorvYtFcctZIyChXCh1rKBNP3%2BKfpqVKzepW%2F9ScLMxe%2BLOmEVXE0Lb8p2nVVR9cIJF0Vh10IumDIklIGFVVHZi2zDxtVQem1ZUdnCVJjtQdKCSJCk9bH55y3PoTFh7siwh6FxXgmb1WCvD26vt47ahRswi%2BhtIDx6sucu4MhQS8k7M%2BhfRRqSPNpQcmt%2FjfS1z%2FDKQ9r%2FLlkiobQQeNRouFbTdMZvvUhGZG%2B6uQ2TQEEnqiG3gqm03Dsvo8w5WL5xPzmJtjtDyd8Iml8a9VDn26NL5iHZg3FGSouGb7qfQd8kKsuo60U1eeDOmo2xh1T5W9dXWuGqgrOycXUtcbWO93pJ26sjddR10W2q39Pr96R%2Bb04pHXgHhRj8Tvodd8xSCVeF9xbC8scvqYYzq0%2B1Ur0lWkXnmKKK3p1fPsY56MrfJM6yUPg6U52VJng13TDmxF5rD3512h4yqo4DZlAgpriniXriliGoI29sRldbRLIjl9sIjrPUTb9fHI3vyF1iIVf%2BZxmFFB805crytMOiewNxpNp00F9oaDakGnc%2BKX3JlcpmkQn4qvucsnBiBlU50i7OY4T4sDFi%2F2WXHAK3%2FDpex5snmhLn9VL%2Fatf8Gl6ciuW4H9iowKxbojgE4C8JqBFgnwSy0TKfju1mXOu3U9751bdUct6bqvwtXgvQ9HVf%2FNHF7qvQsro0kd6baZld%2FMXSw2RMRMUqGv978tynJ0S1v5akSFmU0XHiJErKxYRO6q6IcdWFrISNFzCnyfSLaePSYfG%2BlbfoZRWK7VRvEOimtPkC8nlJFhCNMNLDz%2FfB2ebRzNk4wmn6njBeUARTlYoG%2BdpGbr9kWXTlHfY6oWaNOXcuGowgsX0my2S0DcFs86htFPxYVvPwPDVB6Y6L0zdJ4j%2BMb08KSkklc0OkDGVViO6dCsLdy1B6ftOXfn5LBV8Ua%2Fr21VDNg3fjRwtV%2BzlnuBF89dukJPjtiTbiWs%2FJpykbtSEldVhhQLzL2tiXwJ%2BtQVWAWEw32QJNQNCFHyX6snrQQW0WWaHtAmzCst7RkucCpcBYiLiJgop%2FSuGLh%2FFfwQwxW7LwIlfexmtKM4aagqhbJVzBUXh2xOeCm%2BEpprMDpcSh1GP7jZ5ANJFZZp1WisKZFUBMs8ZeugLItuubL8mIdaImIJXEtMRaSf107byDmFZ83SNEEMxxGm5E5VavoymBVfHMwxDEwO31MAie1BLk%2Fzko0soL%2BXYJOPUVpkq5ItVCyTXaLAoQfemJa6pCOTQKLhSJeI%2FPqZEDTIRZZ5RHtc6iet7aaIg7wiHPlnHH9Y1Ft9kpqsF0wqsjgKaXAPe080AXJ2Yxk1lps60qKcXzxbHFqNOQBWhckDw%2Bkrkl9tpZRz3f2yqhoIrUrJP4fQuX5rm9G8fuDU41nVwKIoEvilOX32nHlDnB661YjLQDFj3iSfyS5GVI8eDD3KvHvk03Ut5%2F8H  
