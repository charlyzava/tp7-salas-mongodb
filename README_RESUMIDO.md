

#Explicar cómo preparar un clúster Free, un usuario de base con lectura y escritura, la IP permitida y la URI de conexión para Node.js

Crear cuenta en 
https://www.mongodb.com/es

Nombrar un cluster, por defecto Cluster0

![Sin descripción](img/img1.png)

Por defecto se agrega la dirección ip actual, se genera un nombre de usuario y password, con posibilidad de descargar un archivo .env


Si no descargamos el archivo env lo podemos crear y escribir en el archivo:
PORT=3000
NODE_ENV=development
MONGODB_URI=<aqui pegar linea de mongodb>

donde pegaremos la línea con las credenciales y el host.

Es muy importante agregar el archivo en .gitignore para no comprometer la seguridad del cluster.


Seleccionamos un método de conexión

La pantalla siguiente muestra los métodos de conexión, en nuestro caso debemos seleccionar la última, conectar MongoDB for VS Code

![Datos en Atlas](./public/img/pic2.png)

#Cómo configurar las credenciales de Atlas sin publicarlas.

Qué archivo contiene la configuración y cuál establece la conexión.

El archivo que establece la conexión es el siguiente:
src/config/base-datos.js

y el archivo de configuración es .env que se encuentra en la carpeta raiz.

#Cómo está definido el modelo de reservas.

El modelo de reservas está definido mediante el esquiema de Mongoose que establece la estructura de los documentos  que se guardan en MongoDB

#Cómo ejecutar el programa para crear una reserva.

node --env-file=.env scripts/crear-reserva.js

que selecciona el archivo .env como archivo de configuración

#Cómo ejecutar el progrmaa para validar reservas

node --env-file=.env scripts/validar-reserva.js

#Cómo ejecutar el programa para consultar las reservas.

node --env-file=.env scripts/listar-reservas.js

Por qué esas operaciones son independientes de las rutas web de Express.

////////////////////////////////////////