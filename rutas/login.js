const express = require('express')
const routes = express.Router()
const jwt = require('jsonwebtoken')

const payload = { check: true }
const token = jwt.sign(payload, "APROTILA2023fvA12", {
    expiresIn: '1d'
})

routes.post('/', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) return res.send(err)
        const user = req.body.usuario
        const password = req.body.contraseña
        if (user && password) {
            connect.query('SELECT Rol FROM usuarios WHERE Usuario = ? AND Contraseña = ?', [user, password], (err, rows) => {
                if (err) return res.send(err)
                if (rows.length > 0) {
                    return res.json({
                        success: true,
                        data: rows,
                        token: token
                    });
                } else {
                    return res.json({
                        success: false,
                        msj: 'Usuario y/o Contraseña Incorrecta'
                    });
                }
                res.end();
            })
        } else {
            return res.json({
                success: false,
                msj: 'Datos incorrectos'
            });
        }
    })
})

module.exports = routes