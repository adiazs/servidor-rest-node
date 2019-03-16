const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**Utilización de las validaciones de campos especificos
 * se debe de crear un objeto con los valores. trabaja
 * similar a un enum. Se agrega un mensaje {VALUE} en caso
 * de que haya algún error.
 */

let rolesValidos = ({
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{PATH} no es un valor válido'
})

let Schema = mongoose.Schema;

/**
 * Este es el esquema de datos (modelos), se puede ver como una tabla
 * de sql, donde primero se declara el nombre de la tabla
 * y luego las columnas con sus respectivas propiedades.
 * Tabla-Schema: usuarioSchema
 * Campos: nombre, password, apellido, etc
 */
let usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'Debe digitar un nombre'] //cuando no se cumple con la propiedad se envia una respuesta personalizada. 
    },
    correo: {
        type: String,
        unique: true,
        required: [true, 'Debe digitar un correo electrónico']
    },
    password: {
        type: String,
        required: [true, 'Debe digitar una contraseña']
    },
    img: {
        type: String,
        required: [false]
    },
    role: {
        type: String,
        enum: rolesValidos,
        default: 'USER_ROLE' //valor por defecto
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

/**
 * Utilizar toJson para devolver el objeto con solo lo que necesito
 */
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

/**
 * Se indica al esquema que utilice el plugin del unique validator
 acá el {PATH} viene a ser los campos unique: true del modelo.
 */

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })

module.exports = mongoose.model('Usuario', usuarioSchema);