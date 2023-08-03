const express = require('express')
const routes = express.Router()

routes.get('/:valor/:cant/:precio',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('CALL InventarioModificarEntrada(?, ?, ?)',[req.params.valor,req.params.cant,req.params.precio],(err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})

module.exports = routes