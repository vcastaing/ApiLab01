const express = require('express')
const routes = express.Router()

routes.get('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT C.Id, Fecha, FechaVencimiento,C.unidadMedida,Cp.UnidadMedia, PrecioTotal, Observaciones, concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado, Cp.Producto FROM compras AS C INNER JOIN personal AS P ON C.IdPersonal = P.Id INNER JOIN compraproductos AS Cp ON C.IdCompraProducto = Cp.Id WHERE C.Estado = 1', (err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})

routes.get('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT Fecha, FechaVencimiento, unidadMedida, PrecioTotal, Observaciones, concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado,C.IdPersonal,C.IdCompraProducto, Cp.UnidadMedia,Cp.Producto FROM compras AS C INNER JOIN personal AS P ON C.IdPersonal = P.Id INNER JOIN compraproductos AS Cp ON C.IdCompraProducto = Cp.Id WHERE C.Id = ?', [req.params.id],(err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})

routes.get('/:ultima/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT C.Id FROM compras AS C INNER JOIN personal AS P ON C.IdPersonal = P.Id INNER JOIN compraproductos AS Cp ON C.IdCompraProducto = Cp.Id WHERE C.Estado = 1 AND CP.Id = ? ORDER BY C.Id DESC  LIMIT 1;', [req.params.id],(err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})


routes.post('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('INSERT INTO compras set ? ',[req.body],(err)=>{
            if (err) return res.send(err)
            res.send('Compra Registrada')
        })
    })
})

routes.delete('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE compras SET Estado = 0 WHERE Id = ? ',[req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Compra Eliminada')
        })
    })
})

routes.put('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE compras set ? WHERE Id = ? ',[req.body, req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Compra Actualizada')
        })
    })
})


module.exports = routes