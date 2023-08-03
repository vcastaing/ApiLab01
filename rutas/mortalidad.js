const express = require('express')
const routes = express.Router()

routes.get('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT M.Id, Fecha,Pi.Pila,Cantidad,concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado,Observaciones FROM mortalidad AS M INNER JOIN personal AS P ON M.IdPersonal=P.Id INNER JOIN pilas AS Pi ON M.IdPila = Pi.Id WHERE M.Estado = 1', (err,rows)=>{
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
        connect.query('SELECT Fecha,Pi.Pila,M.IdPila,Cantidad,concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado,Observaciones FROM mortalidad AS M INNER JOIN personal AS P ON M.IdPersonal=P.Id INNER JOIN pilas AS Pi ON M.IdPila = Pi.Id WHERE M.Id = ?',[req.params.id], (err,rows)=>{
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
        connect.query('INSERT INTO mortalidad set ? ',[req.body],(err)=>{
            if (err) return res.send(err)
            res.send('Empleado Registrado')
        })
    })
})

routes.delete('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE mortalidad SET Estado = 0 WHERE Id = ? ',[req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Persona Eliminada')
        })
    })
})

routes.put('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE mortalidad set ? WHERE Id = ? ',[req.body, req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Persona Actualizada')
        })
    })
})


module.exports = routes