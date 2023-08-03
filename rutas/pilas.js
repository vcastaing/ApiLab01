const express = require('express')
const routes = express.Router()

routes.get('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT Id, Pila FROM pilas WHERE Estado = 0', (err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})

routes.get('/:pilas/:activas',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT Id, Pila FROM pilas WHERE Estado = 1', (err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows
            });
        })
    })
})

routes.get('/:pila',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT Id FROM pilas WHERE Pila = ?', (err,rows)=>{
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
        connect.query('INSERT INTO pilas set ? ',[req.body],(err)=>{
            if (err) return res.send(err)
            res.send('Empleado Registrado')
        })
    })
})

routes.delete('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('DELETE FROM pilas WHERE Id = ? ',[req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Pila Eliminada')
        })
    })
})

routes.put('/:id',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE pilas set Estado = 1 WHERE Id = ? ',[req.params.id],(err)=>{
            if (err) return res.send(err)
            res.send('Pila Actualizada')
        })
    })
})


module.exports = routes