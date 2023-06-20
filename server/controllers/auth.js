const express = require('express')
const User = require('../models/users')
const sha256 = require('js-sha256')
const jwt = require('jwt-then')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

module.exports.register = async (req, res) => {
    try{
        const{ fullName, username, password } = req.body
        const userCheck = await User.find({ username })
        if (userCheck)
            return res.json({message: "Username già in uso", status: false})
        const hashPass = await bcrypt.hash(password, 10)
        const user = await User.create({
            fullName,
            username,
            password
        })

        return res.json({
            message: "Utente registrato con successo!",
            user
        })
    }catch (error){
        console.log(error)
        res.status(500).json({message : error})
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


