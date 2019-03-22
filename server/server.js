require('./config/config') //requiero la configuracion

const express = require('express') //se llama a la libreria
const mongoose = require('mongoose') //se llama a la libreria de base de datos
const bodyParser = require('body-parser') //se declara el uso de la libreria
const app = express() //se utiliza la libreria

/*
 * app.use: esto quiere decir que es un middleware, cada vez
 * que se haga una petición siempre va pasar por estos metodos
 */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json());
//se llama y utiliza el archivo de usuario.js
//app.use(require('./routes/usuario'));
//app.use(require('./routes/login'))
app.use(require('./routes/index'));

/**Se realiza la conexion con la base de datos en el servidor 
 * protocolo: mongodb
 * servidor: localhost
 * puerto de servidor de bd: 27017
 * base de datos: cafe
 * Se declara un callback para saber si la conexion se logra establecer
 * err: para registrar un error
 * res: para devolver la respuesta
 */
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw new err;

        console.log('Base de datos Online');
    });

/*se escucha por el puerto del archivo de configuracion
se envia un callback vacio para escribir por consola 
*/
app.listen(process.env.PORT, () => {
    console.log(`Servidor arriba por el puerto ${process.env.PORT}`)
});