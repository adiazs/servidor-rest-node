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