const express = require('express')
const User = require('../models/users')
const sha256 = require('js-sha256')
const jwt = require('jwt-then')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

exports.register = async (req, res) => {
    try{
        const{ fullName, username, password } = req.body
        const userCheck = await User.findOne({ username })
        if (userCheck)
            return res.json({message: "Username già in uso", status: false})
        const hashPass = await bcrypt.hash(password, 10)
        const user = await User.create({
            fullName,
            username,
            password
        })
        return res.json({status: true, user})
    }catch (error){
        console.log(error)
        res.status(500).json({message : error})
    }


}

exports.login = async (req,res) => {
    try{
        const{username, password } = req.body
        const userCheck = await User.findOne({ username })
        if (userCheck)
            return res.json({message: "Username già in uso", status: false})
        const hashPass = await bcrypt.hash(password, 10)

        if(!user) throw "Username e Password errati"

        return res.json({
            message: "Utente loggato con successo!",
            token
        })
    }catch (error){
        console.log(error)
        res.status(500).json({message : error})
    }

    const {username, password} = req.body
    const user = await User.findOne({password: sha256(password + process.env.SALT)})

    if(!user) throw "Username e Password errati"

    const token = jwt.sign({id: user.id}, process.env.SECRET)



}


