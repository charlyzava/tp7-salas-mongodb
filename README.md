Cómo configurar las credenciales de Atlas sin publicarlas.



Qué archivo contiene la configuración y cuál establece la conexión.



Cómo está definido el modelo de reservas.



Cómo ejecutar el programa para crear una reserva.



Cómo ejecutar el programa para consultar las reservas.



Por qué esas operaciones son independientes de las rutas web de Express.


README

# Trabajo práctico 07
## Proyecto de partida y cambios
## Instalación y ejecución
## Configuración del entorno
## Mapa de módulos y dependencias
## Pipeline y contrato de rutas
## Matriz antes/después
## Formato y análisis estático
## Persistencia temporal y límites


Trabajo práctico 06
Proyecto de partida y cambios
El proyecto parte de una copia funcional del Trabajo Práctico 05, correspondiente a la aplicación de reservas de salas de estudio. La nueva copia debe llamarse tp-06-salas-modular.
El objetivo principal no es agregar nuevas funcionalidades, sino reorganizar el código en módulos, separando las responsabilidades de arranque, configuración, aplicación, rutas, controladores, servicios y middleware.
Se deben conservar las vistas EJS, el layout, CSS, datos iniciales, Morgan, el identificador de solicitud, la medición de duración, la validación del formulario y las respuestas HTTP del TP 05. 
La estructura esperada es:
tp-06-salas-modular/
├── public/
├── views/
├── src/
│   ├── index.js
│   ├── app.js
│   ├── configuracion.js
│   ├── rutas/
│   │   └── reservas.js
│   ├── controladores/
│   │   └── reservas.js
│   ├── servicios/
│   │   └── reservas.js
│   └── middleware/
│       ├── solicitudes.js
│       └── reservas.js
├── .env.example
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md
La idea de la modularización es que cada módulo tenga una responsabilidad clara y que los cambios futuros puedan realizarse en un lugar concreto, evitando tener toda la aplicación concentrada en index.js. 
________________________________________
Instalación y ejecución
Primero se debe instalar el proyecto mediante:
npm install

Para iniciar la aplicación:
npm start

Para verificar el formato y el análisis estático:
npm run check

También se debe ejecutar:
npm run format
antes de realizar la comprobación final.

Los scripts mínimos establecidos por el TP son:
{
  "scripts": {
    "start": "node src/index.js",
    "format": "prettier --write src",
    "format:check": "prettier --check src",
    "lint": "eslint src",
    "check": "npm run format:check && npm run lint"
  }
}
El package-lock.json actualizado debe formar parte de la entrega. 
________________________________________
Configuración del entorno
La configuración del proyecto se concentra en:
src/configuracion.js
Este módulo debe leer las variables de entorno PORT y NODE_ENV mediante process.env.
La variable PORT debe convertirse a número y validarse para que sea un entero entre 1 y 65535. Si no se establece, se utiliza el puerto 3000.
La variable NODE_ENV determina el formato de registro utilizado por Morgan:
•	development → morgan("dev") 
•	production → morgan("combined") 
La configuración solamente modifica estos aspectos del entorno y no debe crear la aplicación Express ni imprimir secretos. 
El archivo .env.example debe contener valores que no sean secretos:
PORT=3000
NODE_ENV=development
El archivo .env real no debe subirse al repositorio.
En .gitignore también deben incluirse:
.env
node_modules/
________________________________________
Mapa de módulos y dependencias
La aplicación queda dividida de acuerdo con la responsabilidad de cada módulo:
Módulo	Responsabilidad
index.js	Lee configuración, crea el servicio, crea la aplicación y ejecuta listen
configuracion.js	Lee y valida las variables de entorno
app.js	Configura Express, middleware, vistas, rutas y 404
rutas/reservas.js	Relaciona métodos, caminos, middleware y controladores
controladores/reservas.js	Lee parámetros, renderiza, responde JSON, 404 y redirecciona
servicios/reservas.js	Lista, busca, cuenta y crea reservas en memoria
middleware/solicitudes.js	Identificador de solicitud y medición de tiempo
middleware/reservas.js	Sección de reservas y validación
Una característica importante es que el servicio no utiliza req ni res, porque su función es trabajar con los datos y no tomar decisiones HTTP.
El controlador, en cambio, sí trabaja con req y res, porque transforma las operaciones del servicio en respuestas HTTP. 
El servicio debe existir como una única instancia compartida por el listado, detalle, /estado y creación de reservas. 
________________________________________

 Pipeline y contrato de rutas
El pipeline debe conservar un orden reconocible:
Morgan
   ↓
identificarSolicitud
   ↓
medirDuracion
   ↓
layouts
   ↓
static
   ↓
urlencoded
   ↓
json
   ↓
rutas de aplicación
   ↓
router /reservas
   ↓
404
El enunciado permite mantener una variante en el orden de static y Morgan si ese orden ya estaba documentado en el TP 05. 
Contrato de rutas
Método	Ruta	Resultado
GET	/	200, página de inicio
GET	/estado	200, JSON con cantidad e ID
GET	/reservas	200, listado
GET	/reservas/nueva	200, formulario
GET	/reservas/:id	200 o 404 HTML
POST	/reservas válido	302
POST	/reservas inválido	400
GET	/css/estilos.css	200
Cualquier otra URL	—	404 HTML
Es importante que /reservas/nueva se registre antes de /reservas/:id, para evitar que Express interprete nueva como si fuera un identificador. 
La validación debe conservar las reglas del TP 05:
•	estudiante obligatorio; 
•	email con @; 
•	sala permitida; 
•	fecha; 
•	turno permitido; 
•	cantidad de personas entera entre 1 y 6. 
Un POST inválido debe responder 400, conservar los valores y no continuar hacia el controlador. Un POST válido debe preparar req.reservaValidada y continuar. 
________________________________________
Matriz antes/después
La matriz permite comprobar que la refactorización no modificó el comportamiento externo de la aplicación.
Caso	Antes – TP 05	Después – TP 06
GET /	200	200
GET /estado	200 JSON	200 JSON
GET /reservas	200 listado	200 listado
GET /reservas/nueva	200 formulario	200 formulario
GET /reservas/:id existente	200	200
GET /reservas/:id inexistente	404	404
POST válido	302	302
POST inválido	400	400
CSS	200	200
URL inexistente	404	404
Reinicio	Datos iniciales	Datos iniciales
Además, después de realizar un POST válido, la nueva reserva debe aparecer tanto en el listado como en /estado.
La matriz debe registrar el estado HTTP, contenido o vista, cantidad de reservas y una evidencia breve. 
________________________________________
Formato y análisis estático
Para mejorar la calidad del código se deben instalar como dependencias de desarrollo:
npm install --save-dev prettier eslint @eslint/js
Prettier se utiliza para mantener un formato uniforme del código:
npm run format
Para comprobar solamente el formato:
npm run format:check
ESLint permite realizar el análisis estático:
npm run lint
Finalmente, se puede ejecutar:
npm run check
Este último comando ejecuta:
format:check
      ↓
    lint
El análisis estático permite detectar problemas en el código, pero no reemplaza las pruebas manuales de las rutas HTTP. 
________________________________________
Persistencia temporal y límites
Las reservas se mantienen solamente en memoria mediante el servicio de reservas. No se debe incorporar una base de datos ni persistencia adicional.
El servicio es responsable de:
•	listar reservas; 
•	buscar una reserva; 
•	contar reservas; 
•	crear reservas. 
No debe utilizar:
req
res
EJS
códigos HTTP
Estas responsabilidades corresponden a otras capas.
La aplicación utiliza los datos iniciales proporcionados por el proyecto. Cuando se crea una nueva reserva mediante POST, esta queda disponible durante la ejecución actual y puede consultarse mediante el listado y /estado.
Sin embargo, al reiniciar el servidor, las reservas nuevas desaparecen y se recupera nuevamente la semilla inicial.
Por lo tanto, la persistencia es temporal y en memoria. El TP explícitamente deja fuera de alcance MongoDB, Mongoose, escritura de archivos, nuevas APIs, autenticación, autorización, manejo centralizado de errores y pruebas automatizadas. 

Conclusión
El objetivo principal del TP 06 es refactorizar sin cambiar el comportamiento externo. La aplicación pasa de tener responsabilidades concentradas en pocos archivos a una estructura modular donde:
index.js
   ↓
configuración + servicio
   ↓
app.js
   ↓
rutas
   ↓
middleware
   ↓
controladores
   ↓
servicio
   ↓
datos en memoria


# Explicar con palabras propias por qué el servicio no usa res , qué hace el controlador, por qué el router declara caminos relativos, dónde vive el único arreglo de reservas y qué ocurrirá con él al reiniciar. Indicar los comandos ejecutados y sus resultados. No incluir contenido de .env local.


El servicio se ocupa de la lógica del sitema y de trabajar con los datos, no se ocupa de la respuesta HTTP.

Puede trabajar en la búsqueda de reservas, validar información o agregar reservas.

Es por eso que no usa RES


El controlador se encarga de conectar las respuestas con solicitudes HTTP y qué respuestas enviar.

