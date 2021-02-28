# FRONTEND APPLICACION PARA FINANZAS PERSONALES

Front End para la aplicacion de finanzas personales. El front end de la app esta desarrolada en Angular aplicando el patron de diseño para el manejo de estado de la app. Aplicacion desarrollada pensanda para una buena Experiencia de Usuario (UX) 

## EMPEZANDO
Instalar el siguiente software en su sistema operativo (Windows, Linux, MacOS)
* Node 12.x  [NodeJS](https://nodejs.org/en/)
* npm 6.13
* Angular CLI 9.0.2 [Angular CLI](https://github.com/angular/angular-cli)

Primero instalamos NodeJS y npm (npm se instala automaticamente al instalar NodeJS)
Despues instalamos angular cli 
`
    npm install -g @angular/cli
`

## LEVANTAR LA APP EN AMBIENTE LOCAL
	- git clone <repo> 
	- git checkout development 
	- git pull origin development 
	- npm install
	- ng serve --poll=2000
    - Navegar hacia http://localhost:4200/ 

## CONSTRUIR EL  PROYECTO
Ejecutar `ng build` para construir el proyecto. Este comando generara una carpeta `dist/` en el directorio que contendra todos los archivos .js y html de la aplicacion. Para construir para un entorno de producion ejecutar `ng build --prod`

## ALGUNAS FUNCIONALIDADES DEL SISTEMA
* Implementacion del patron REDUX con NgRx
* Consumo de API REST mediante servicios con HttpClient.
* Listados simples
* Listado complejos
* Uso de Formularios reactivos
* Login
* HttpInterceptor
* Lazy load
* Usos de guards para restringir acceso a componentes especificos
* Utilizacion del Storage para almacenar access-token y otros datos
* Angular Material
* Bootstrap
* SweetAlert 2 para mostrar mensajes
* Validaciones en tiempo real de formularios
* Validadores personalizados (Checkear password)
* Busquedas por filtros
* Implementacion de Google Recaptcha
* Ng2-Charts para mostrar estadisticas
* Expresiones regulares para validaciones


## PLUGINS RECOMENDADOS PARA VISUAL STUDIO CODE
* Angular 10 Snippets - TypeScript, HTML, Angular Material, ngRx...
* Angular 2 TypeScript Emmet
* Angular Language Service
* Boostrap 4
* Prettier - Code Formatter