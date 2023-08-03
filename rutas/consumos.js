const express = require('express')
const routes = express.Router()

routes.get('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT C.Id,C.Fecha,concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado,C.Cantidad,Cp.UnidadMedia,Cp.Producto,C.Observaciones FROM personal AS P INNER JOIN consumos AS C ON P.Id=C.IdPersona INNER JOIN compraproductos AS Cp ON C.IdCompraProducto= Cp.Id WHERE Estado = 1', (err,rows)=>{
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
        connect.query('SELECT C.Id,C.IdCompraProducto,Cp.Producto,Cp.UnidadMedia,C.Fecha,P.Id,concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado,C.Cantidad,C.Observaciones FROM personal AS P INNER JOIN consumos AS C ON P.Id=C.IdPersona INNER JOIN compraproductos AS Cp ON C.IdCompraProducto= Cp.Id WHERE C.Id = ?',[req.params.id], (err,rows)=>{
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
        connect.query('INSERT INTO consumos set ? ',[req.body],(err)=>{
            if (err) return res.send(err)
            res.send('Registro exitoso')
        })
    })
})

routes.delete('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE consumos set Estado = 0  WHERE Id = ?',[req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Eliminado Exitosamente')
        })
    })
})

routes.put('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE consumos set ? WHERE Id = ? ',[req.body, req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Actualizado Exitozamente')
        })
    })
})


module.exports = routes