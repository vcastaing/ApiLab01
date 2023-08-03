const express = require('express')
const routes = express.Router()


routes.get('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT Id,TipoProveedor, Proveedor,Direccion,Provincia,Canton,Distrito,TipoCedula,Cedula,Contacto,Telefono,Correo FROM proveedores WHERE Estado = 1', (err,rows)=>{
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
        connect.query('SELECT TipoProveedor, Proveedor,Direccion,Provincia,Canton,Distrito,TipoCedula,Cedula,Contacto,Telefono,Correo FROM proveedores WHERE Id = ?',[req.params.id], (err,rows)=>{
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
        connect.query('INSERT INTO proveedores set ? ',[req.body],(err)=>{
            if (err) return res.send(err)
            res.send('Proveedor Registrado')
        })
    })
})

routes.delete('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE proveedores set Estado = 0  WHERE Id = ? ',[req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Proveedor Eliminado')
        })
    })
})

routes.put('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE proveedores set ? WHERE Id = ? ',[req.body, req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Proveedor Actualizado')
        })
    })
})


module.exports = routes