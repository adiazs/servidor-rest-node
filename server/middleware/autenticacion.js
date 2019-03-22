const jwt = require('jsonwebtoken');
/**
 * Verificación de Token
 * req: Request
 * res: Response
 * next: Continue la ejecucion de la llamada principal
 */

let verificaToken = (req, res, next) => {

    let token = req.get('token');
    let usuario = '';

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }

        req.usuario = decoded.usuario; //devuelvo el usuario
        // console.log(req.usuario);

        next();
    })

    // res.json({
    // 
    //token
    // })

    //con el next, se ejecuta la llamada principal, pero tambien se esta ejecuntado este código
    // console.log(token);
    //console.log(process.env.SEED)


}

/**
 * Verifica que el usuario logueado tenga permisos para hacer cambios
 * osea que es un perfil de administrador.
 * @param {petición del usuario} req 
 * @param {respuesta del servicio} res 
 * @param {continuación de la ejecución} next 
 */

let verificaAdmin_Role = (req, res, next) => {

    let role = req.usuario.role;
    //console.log(role); imprimo el role

    //let role = req.usuario.role
    if (role == 'ADMIN_ROLE') {
        next()
    } else {
        return res.status(501).json({
            ok: false,
            err: {
                message: 'El rol del usuario no es válido'
            }
        })
    }
}


/**
 * Se exporta unicamente la funcion.
 */
module.exports = {
    verificaToken,
    verificaAdmin_Role
}