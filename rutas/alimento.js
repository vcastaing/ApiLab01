const express = require('express')
const routes = express.Router()

routes.get('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT A.Id,A.Fecha,concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado,A.CantidadAlimento,Pi.Pila ,Cp.UnidadMedia,Cp.Producto,A.Observaciones FROM personal AS P INNER JOIN alimentacion AS A ON P.Id=A.IdPersonal INNER JOIN pilas AS Pi ON A.IdPila=Pi.Id INNER JOIN compraproductos AS Cp ON A.IdCompraProducto= Cp.Id WHERE A.Estado = 1', (err,rows)=>{
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
        connect.query('SELECT A.Id,A.IdCompraProducto,Cp.Producto,Cp.UnidadMedia,A.Fecha,P.Id,concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado,A.CantidadAlimento,Pi.Pila,Pi.Id AS IdPil,A.Observaciones FROM personal AS P INNER JOIN alimentacion AS A ON P.Id=A.IdPersonal INNER JOIN pilas AS Pi ON A.IdPila=Pi.Id INNER JOIN compraproductos AS Cp ON A.IdCompraProducto= Cp.Id WHERE A.Id = ?',[req.params.id], (err,rows)=>{
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
        connect.query('INSERT INTO alimentacion set ? ',[req.body],(err)=>{
            if (err) return res.send(err)
            res.send('Registro exitoso')
        })
    })
})

routes.delete('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE alimentacion set Estado = 0  WHERE Id = ?',[req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Eliminado Exitosamente')
        })
    })
})

routes.put('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE alimentacion set ? WHERE Id = ? ',[req.body, req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Actualizado Exitozamente')
        })
    })
})


module.exports = routes