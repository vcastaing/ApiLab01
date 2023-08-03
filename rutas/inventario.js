const express = require('express')
const routes = express.Router()

routes.get('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT I.Id, Fecha,Cp.UnidadMedia, FechaModificacion,Cp.Producto, Entradas, CantidadDisponible, Salidas,PrecioActual, PresioAnt, PrecioPromedio FROM inventario AS I INNER JOIN compraproductos AS Cp ON I.IdCompraProducto= Cp.Id WHERE Estado = 1', (err,rows)=>{
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
        connect.query('SELECT I.Id, Fecha, FechaModificacion,Cp.Producto, Entradas, CantidadDisponible, Salidas,PrecioActual, PresioAnt, PrecioPromedio FROM inventario AS I INNER JOIN compraproductos AS Cp ON I.IdCompraProducto= Cp.Id WHERE I.Id = ?', [req.params.id],(err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})

routes.get('/:producto/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT PrecioPromedio,CantidadDisponible FROM inventario AS I INNER JOIN compraproductos AS Cp ON I.IdCompraProducto = Cp.Id WHERE Cp.Id = ?', [req.params.id],(err,rows)=>{
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
        connect.query('INSERT INTO inventario set ? ',[req.body],(err)=>{
            if (err) return res.send(err)
            res.send('Inventario Registrado')
        })
    })
})

routes.delete('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE inventario SET Estado = 0 WHERE Id = ?',[req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Inventario Eliminado')
        })
    })
})

routes.put('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE inventario set ? WHERE Id = ? ',[req.body, req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Inventario Actualizado')
        })
    })
})


module.exports = routes