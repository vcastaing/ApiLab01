const express = require('express')
const routes = express.Router()

routes.get('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT Rp.Id, FechaIngreso,Especie,Cantidad,Lote,Rp.PilaProveedor,Pi.Pila,concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado,Pr.Proveedor FROM personal AS P INNER JOIN registropeces AS Rp ON P.Id = Rp.IdPersonal INNER JOIN proveedores AS Pr ON Rp.IdProveedor= Pr.Id INNER JOIN pilas AS Pi ON Rp.IdPila = Pi.Id WHERE Rp.Estado = 1', (err,rows)=>{
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
        connect.query('SELECT Rp.Id, FechaIngreso,Especie,Cantidad,Lote,Rp.PilaProveedor,Pi.Pila,Pi.Id as IdP,Rp.IdProveedor,concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado,Pr.Proveedor FROM personal AS P INNER JOIN registropeces AS Rp ON P.Id = Rp.IdPersonal INNER JOIN proveedores AS Pr ON Rp.IdProveedor= Pr.Id INNER JOIN pilas AS Pi ON Rp.IdPila = Pi.Id WHERE Rp.Id = ?',[req.params.id], (err,rows)=>{
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
        connect.query('INSERT INTO registropeces set ? ',[req.body],(err)=>{
            if (err) return res.send(err)
            res.send('Empleado Registrado')
        })
    })
})

routes.delete('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE registropeces SET Estado = 0 WHERE Id = ? ',[req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Persona Eliminada')
        })
    })
})

routes.put('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE registropeces set ? WHERE Id = ? ',[req.body, req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Persona Actualizada')
        })
    })
})


module.exports = routes