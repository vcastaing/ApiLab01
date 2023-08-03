const express = require('express')
const routes = express.Router()

routes.get('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT Rv.Id, Fecha,concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado,Pd.Producto, Kilos, CantidadTilapias,Pi.Pila, subtotal, (Rv.subtotal*Pd.PorcientoIVA/100) AS PrecioIVA ,Total,TipoPago, Observaciones FROM registroventas AS Rv INNER JOIN personal AS P ON Rv.IdPersonal=P.Id INNER JOIN pilas AS Pi ON Rv.IdPila = Pi.Id INNER JOIN productos AS Pd ON Rv.IdProducto = Pd.Id WHERE Rv.Estado = 1 ORDER BY TipoPago', (err,rows)=>{
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
        connect.query('SELECT Fecha,concat_ws(" ",P.Nombre,P.Apellidos) AS Encargado,Pd.Producto, Kilos, CantidadTilapias,TipoPago,Pi.Pila,Rv.IdPila,Rv.IdProducto,Pd.PrecioKilo, subtotal, (Rv.subtotal*Pd.PorcientoIVA/100) AS PrecioIVA ,Total, Observaciones FROM registroventas AS Rv INNER JOIN personal AS P ON Rv.IdPersonal=P.Id INNER JOIN pilas AS Pi ON Rv.IdPila = Pi.Id INNER JOIN productos AS Pd ON Rv.IdProducto = Pd.Id WHERE Rv.Id = ?', [req.params.id],(err,rows)=>{
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
        connect.query('INSERT INTO registroventas set ? ',[req.body],(err)=>{
            if (err) return res.send(err)
            res.send('Venta Registrada')
        })
    })
})

routes.delete('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE registroventas SET Estado = 0 WHERE Id = ? ',[req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Venta Eliminada')
        })
    })
})

routes.put('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE registroventas set ? WHERE Id = ? ',[req.body, req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Venta Actualizada')
        })
    })
})


module.exports = routes