const express = require('express')
const routes = express.Router()

routes.get('/:valor/:cant',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('CALL InventarioModificarSalidas(?, ?)',[req.params.valor,req.params.cant], (err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})


module.exports = routes