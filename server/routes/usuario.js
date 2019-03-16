const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore'); //estandar
const Usuario = require('../models/usuario'); //Declaracion de la "clase"
const app = express();



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

/**
 * Metodo Get para utilizar el paginado
 * se le envia al exec 2 parametros, uno de error y otro
 * para almacenar la respuesta.
 * Usuario: esquema de bd
 * usuarioBD: Arreglo de usuarios
 * desde: donde empieza la paginación
 * cantidad: cantidad de registros a mostrar 
 */

app.get('/usuario/', (req, res) => {

    let desde = Number(req.query.desde) || 0; //se usa query por ser parametros opcionales
    let cantidad = Number(req.query.cantidad) || 5; //si no especifica se envian solo 5

    Usuario.find({ estado: true }, 'nombre correo google role estado')
        .skip(desde) //define desde donde empieza a traer los registros
        .limit(cantidad) //definir la cantidad de registros a devolver
        .exec((err, usuarioBD) => {
            if (err) {
                res.json({
                    ok: false,
                    err
                })
            } else {
                let conteo = Usuario.count({ estado: true }, (err, cantidad) => {
                    res.json({
                        ok: true,
                        usuarioBD,
                        cantidad
                    })
                })
            }
        })
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
    // if (body.nombre === undefined) //si el body no trae el nombre devuelvo un error
    // {
    //     //res.json(400, 'Debe de ingresar un nombre') esta es otra forma
    //     res.status(400).json({
    //         ok: false,
    //         resp: 'Debe de ingresar un nombre'
    //     })

    //*UTILIZANDO EL MODELO DE DATOS */
    let usuario = new Usuario(); //Se crea una instancia del modelo de datos.
    usuario.nombre = body.nombre;
    usuario.correo = body.correo;
    //utilizar el bcrypt de manera directa, campo, numero de veces para aplicar el hash
    usuario.password = bcrypt.hashSync(body.password, 10);
    usuario.role = body.role;
    //usuario.img = body.img;
    //usuario.google = body.google;

    /*Se utiliza el metodo save para guardar la informacion del modelo de
    datos en la base de datos. Se utiliza un callback para:
    err: mostrar algun error
    usuarioDB: devolver el usuario que se almaceno en la BD. */
    usuario.save((err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioBD
            })
        }
    });
})




/*Metodo para utilizar el metodo put: Actualizar registros
/usuario/:id para actualizar un registro */
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id //se lee el parametro que debe ser identico al especificado en el url
        //res.json('put usuario');
        //devolver la respuesta igual al request

    //let body = req.body;
    /**
     * El arreglo tiene las propiedades que si se va a actualizar.
     */
    let body = _.pick(req.body, ['nombre', 'correo', 'img', 'role', 'estado'])

    /**
     * Busca el usuario por id y actualiza según lo que venga en el body del request.
     * id: id a actualizar
     * body: objeto a actualizar
     * error: escribir algun error proveniente de la bd
     * usuarioBD: respuesta de objeto de base de datos actualizado
     */
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, usuarioBD) => {

        if (error) {
            return res.status(400).json({
                ok: false,
                error
            })
        } else {
            return res.json({
                ok: true,
                usuario: usuarioBD
            })
        }


    })

    // if (id === undefined) {

    //     res.status(400).json('Debe ingresar un id para actualizar.')
    // }
    // res.json(
    //     `El id a actualizar es ${id}`
    // );
})

/*Metodo para utilizar el metodo delete: Eliminar registros */
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;

    //eliminacion fisica
    Usuario.findByIdAndRemove(id, (err, usuarioBD) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }
        if (!usuarioBD) {
            return res.json({
                ok: false,
                err: 'Usuario no encontrado'
            })
        } else {
            res.json({
                ok: true,
                usuarioBD
            })
        }

    })

    // if (id === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         descripcion: 'Debe digitar un id válido'
    //     })
    // } else {
    //     res.status(200).json({
    //         ok: true,
    //         descripcion: `El usuario con id: ${id} ha sido eliminado`
    //     })
    // }
})

/**
 * Eliminación lógica de un registro
 */
app.delete('/usuario/logico/:idEliminar', (req, res) => {
    let id = req.params.idEliminar;

    Usuario.findByIdAndUpdate(id, { estado: false }, (err, usuarioBD) => {
        if (err) {
            res.json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: true,
                usuarioBD
            })
        }
    })
})

/**
 * Exportar el app
 */
module.exports = app;