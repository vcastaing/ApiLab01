const express = require('express')
const routes = express.Router()

routes.get('/:valorV/:valor/:cant/:cant2/:precio',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('CALL InventarioActulizarFromS(?,?,?,?,?)',[req.params.valorV,req.params.valor,req.params.cant,req.params.cant2,req.params.precio],(err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})

module.exports = routes