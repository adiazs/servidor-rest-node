const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario'); //Declaracion del modelo
const app = express();


/**
 * Crear el servicio que recibira el logueo de usuarios
 */
app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ correo: body.correo }, (err, usuarioBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario o contraseña invalidos'
            })
        }
        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario o contraseña invalidos'
            })
        }
        //se declara el token para utilizar en 30 dias, primero la data, luego un string de secret y luego un tiempo de expiración.
        let token = jwt.sign({ usuario: usuarioBD }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            usuario: usuarioBD,
            token
        })
    })

})

module.exports = app;