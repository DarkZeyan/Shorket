# Shortek Develop

<p style="text-align:center"><img src="./extras/shorket_logo.png" width="300"/></p>

## Rama de desarrollo de Shortek

Este proyecto ha sido creado con Angular 17.2

<p style="text-align:center"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Angular_gradient.png" width="250"/></p>

## ¿Qué es Shortek?

- Shortek es un prototipo de aplicación web desarrollada con Angular que simula la existencia de una tienda en línea perteneciente a la empresa del mismo nombre.

Shortek se caracteriza por ser una aplicación desarrollada exclusivamente con Angular y MySQL que utilice el desarrollo integrado de una base de datos consistente y normalización.
Así mismo, Shorket funciona como una aplicación que será el proyecto final de las asignaturas "Administración de Bases de Datos" y "Programación Front End".


## Abrir servidor de desarrollo

Ejecuta el comando  `ng serve` para abrir el servidor de desarrollo. Abre la URL `http://localhost:4200/`. La aplicacion se recargara de manera automatica si haces cambios a los archivos trackeados por Angular.

## Creacion de componentes de código

Ejecuta el comando `ng generate component component-name` para generar nuevos componentes.  Tambien puedes utilizar los comandos `ng generate directive|pipe|service|class|guard|interface|enum|module`
para generar otro tipos de elementos utiles en Angular.

## Build del proyecto

Ejecuta  `ng build` para hacer el build del proyecto. Los artifacts del build del proyecto seran guardados en el directorio `dist/`.

## Ejecutar pruebas unitarias

Ejecuta  `ng test` para correr las pruebas unitarias haciendo uso de [Karma](https://karma-runner.github.io).

## Corriendo las pruebas end-to-end

Ejecuta `ng e2e` para ejecutar las pruebas end-to-end a traves de la plataforma de tu eleccion. Para usarlo se necesita añadir un paquete adicional que sea capaz de ejecutar las pruebas de end-to-end.
