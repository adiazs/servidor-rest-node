/**Process: es un objeto global que esta corriendo durante
 * todo el ciclo de vida de la aplicación y es actualizado
 * por el environment o entorno donde esta corriendo
 */

/**
 * Puerto
 */
/*esta variable existe y heroku la puede actualizar por nosotros
ahora si no existe quiere decir que nosotros debemos de ponerla
 */
process.env.PORT = process.env.PORT || 3000


/** Ambientes. Si existe la utilizo y estoy en producción sino
 * sino estoy utilizando el entorno de desarrollo
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Base de datos. Si 'dev' estoy en desarrollo sino utilizo
 * lo que tengo en la nube porque estoy en producción.
 */
let conexion;
if (process.env.NODE_ENV === 'dev') {
    conexion = 'mongodb://localhost:27017/cafe'
} else {
    conexion = process.env.MONGO_URI;
}

process.env.URLDB = conexion;