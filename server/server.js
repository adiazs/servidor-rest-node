require('./config/config') //requiero la configuracion
const express = require('express') //se llama a la libreria
var bodyParser = require('body-parser') //se declara el uso de la libreria
const app = express() //se utiliza la libreria


/*****
 * req: Request o solicitud http
 * res: Response o respuesta http
 * app.use: esto quiere decir que es un middleware, cada vez
 * que se haga una petición siempre va pasar por estos metodos
 */

/**
 * POST, PUT y DELETE pueden utilizar el body-parser
 * para poder utilizar los formularios de www se utiliza
 * el body-parser de la siguiente manera:
 */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

/* Se cambia la ruta para utilizar el metodo get: obtener registros */
app.get('/usuario/:base', (req, res) => {
    //Se envia la respuesta en formato html
    //res.send('Hola Mundo')
    //se envia la respuesta para el get en forma de json
    // res.json({
    //     ok: true,
    //     descripcion: 'correcto'
    // })

    /*Devolver el cuadrado del número introducido */
    let base = req.params.base;
    let resultado = Math.pow(base, 2);
    res.json(`El cuadrado del número: ${base} es: ${resultado}`);

    //res.json('get usuario')

})

/*Metodo para utilizar el metodo post: Crear registros 
se debe utilizar la libreria body parser para recibir un 
objeto por el request.
*/


app.post('/usuario', (req, res) => {
    /**el body va a aparecer cuando el body-parser procese 
     * cualquier payload en un objeto */
    let body = req.body; //ya aqui paso por el middleware
    // res.json({
    //     persona: body //se convierte el body en un objeto persona
    // })

    /*Devolver errores de http por informacion erronea */

    if (req.body.nombre === undefined) //si el body no trae el nombre devuelvo un error
    {
        //res.json(400, 'Debe de ingresar un nombre') esta es otra forma
        res.status(400).json({
            ok: false,
            resp: 'Debe de ingresar un nombre'
        })

    } else {
        res.json({
            persona: body
        })

        //res.json(`Bienvenido: ${req.body.nombre}`);
    }
})



/*Metodo para utilizar el metodo put: Actualizar registros
/usuario/:id para actualizar un registro */
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id //se lee el parametro que debe ser identico al especificado en el url
        //res.json('put usuario');
        //devolver la respuesta igual al request
    res.json({
        id
    });
})

/*Metodo para utilizar el metodo delete: Eliminar registros */
app.delete('/usuario', (req, res) => {
    res.json('delete usuario');
})

/*se escucha por el puerto del archivo de configuracion
se envia un callback vacio para escribir por consola 
*/
app.listen(process.env.PORT, () => {
    console.log(`Servidor arriba por el puerto ${process.env.PORT}`)
});