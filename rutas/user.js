const express = require('express')
const routes = express.Router()
const bcryt = require('bcrypt')
const jwt = require('jsonwebtoken')

routes.use((req,res,next)=>{
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(!token){
        res.status(401).send({
            error: 'Es necesario para la autenticación'
        })
        return
    }
    if(token.startsWith('Bearer ')){
        token = token.slice(7, token.length)
        console.log(token)
    }
    if(token){
        jwt.verify(token,"APROTILA2023fvA12",(error,decoded)=>{
            if(error){
                return res.json({
                    msj: 'El token no es valido'
                })
            }else{
                req.decoded = decoded
                next()
            }
        })
    }
})


routes.get('/',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT Usuario,Contraseña,Rol FROM usuarios', (err,rows)=>{
            if (err){
                return res.json({
                    success: false,
                    error: err
                });
            }else{
                return res.json({
                    success: true,
                    data: rows
                });
            }
        })
    })
})

routes.get('/:usuario',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('SELECT concat_ws(" ",Nombre,Apellidos) AS Nombre, REPLACE(lower(concat_ws(" ",Nombre,Apellidos))," ","") AS NombreB,U.Contraseña,U.Rol FROM personal as P INNER JOIN usuarios as U on P.Id=U.IdPersonal WHERE U.Usuario = ?',[req.params.usuario], (err,rows)=>{
            if (err) return res.send(err)
            return res.json({
                success: true,
                data: rows[0]
            });
        })
    })
})

routes.post('/',(req, res)=>{
     
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('INSERT INTO usuarios set ? ',[req.body],(err,rows)=>{
            if (err){
                return res.json({
                    success: false,
                    error: err
                });
            }else{
                return res.json({
                    success: true,
                    msg: 'Usuario Registrado'
                });
            }
        })
    })
})

routes.delete('/:usuario',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('DELETE FROM usuarios WHERE Usuario = ? ',[req.params.usuario],(err,rows)=>{
            if (err) return res.send(err)
            res.send('Usuario Eliminado')
        })
    })
})

routes.put('/:usuario',(req, res)=>{
    req.getConnection((err,connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE usuarios set ? WHERE Usuario = ? ',[req.body, req.params.usuario],(err,rows)=>{
            if (err) return res.send(err)
            res.send('Usuario Actualizado')
        })
    })
})
module.exports = routes



