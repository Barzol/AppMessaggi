const express = require('express')
const User = require('../models/users')
const dotenv = require('dotenv')
const jwt = require('jwt-then')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwtSecret = process.env.JWT_SECRET

module.exports.register = async (req, res) => {
    try{
        const{ username, password, confirmPassword } = req.body
        const user = await User.create({
            username,
            password
        })
        jwt.sign({userId: user._id}, jwtSecret)
            .then((error, token) => {
            if(error) throw error
            res.cookie('token', token).status(201).json({
                _id: user._id
            })
            })
        return res.json({
            message: "Utente registrato con successo!",
            user
        })
    }catch (error){
        console.log(error)
        res.status(500).json('error')
    }


}

module.exports.login = async (req,res) => {
    try{
        const{username, password } = req.body
        const user = await User.find({ username })
        if (!user)
            return res.json({message: "Nome utente o password errati", status: false})

        const passCheck = await bcrypt.compare(password,user.password)
        if(!passCheck)
            return res.json({message: "Nome utente o password errati", status: false})
        delete user.password

        const token = 'jwt-token'

        return res.json({
            message: "Utente loggato con successo!",
            token
        })
    }catch (error){
        console.log(error)
        res.status(500).json({message : error})
    }
}

module.exports.getChatsFromCookie('/:chats', (req,res)=>{
    const token =req.cookies?.token
    if(token){
        jwt.verify(token, jwtSecret, {}, (err, data) =>{
        if(err) throw err
        res.json(data)
    })}

})

module.exports.getAllUsers = async (req,res) => {
    try{
        const users = await User.find({_id:{$ne: req.params.id }}).select([
            "username","_id"
        ])
        return res.json(users)

    }catch(error){
        console.log(error)
        res.status(500).json({message : error})
    }
}


