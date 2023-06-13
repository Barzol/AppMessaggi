const express = require('express')
const User = require('../models/users')
const sha256 = require('js-sha256')
const jwt = require('jwt-then')

exports.register = async (req, res) => {
    const {username, password} = req.body;
    //controlli su username e password
    const user = new User({
        username,
        password: sha256(password + process.env.SALT)
    })
    await user.save()

    const userCheck = await User.findOne(username, password)
    if(userCheck) throw "Utente esistente"

    res.json({
        message: "Utente registrato con successo!"
    })
}

exports.login = async (req,res) => {
    const {username, password} = req.body
    const user = await User.findOne({password: sha256(password + process.env.SALT)})

    if(!user) throw "Username e Password errati"

    const token = jwt.sign({id: user.id}, process.env.SECRET)

    res.json({
        message: "Utente loggato con successo!",
        token
    })

}


