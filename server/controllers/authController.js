const express = require('express')
const User = require('../models/users')
const Messages = require('../models/messages')
const dotenv = require('dotenv')
const jwt = require('jwt-then')
const bcrypt = require('bcryptjs')
const jwtSecret = process.env.JWT_SECRET

module.exports.register = async (req, res) => {
    const{ username, password } = req.body

    try{
        const hashPass = bcrypt.hash(password, 10)
        const user = await User.create({
            username: username,
            password: hashPass,
            confirmPassword: hashPass
        })
        jwt.sign({userId: user._id}, jwtSecret, {}, (error,token) => {
                if(error) throw error
                res.cookie('token', token,{sameSite:'none',secure:true}).status(201).json({
                    _id: user._id
                })
            })
    }catch (error){
        console.log(error)
        res.status(500).json('error')
    }


}

module.exports.login = async (req,res) => {
    try{
        const{ username, password } = req.body
        const user = await User.find({ username })
        if (!user)
            return res.json({message: "Nome utente o password errati", status: false})

        const passCheck = await bcrypt.compare(password,user.password)
        if(!passCheck)
            return res.json({message: "Nome utente o password errati", status: false})

        if(passCheck){
            jwt.sign({userId: user._id, username}, jwtSecret, {}, (error,token) => {
                res.cookie('token', token, {sameSite: 'none', secure:true}).json({
                    id: user._id
                })
            })
        }
    }catch (error){
        console.log(error)
        res.status(500).json({message : error})
    }
}

module.exports.logout = async (req,res) => {
    res.cookie('token', '' ,{sameSite:'none',secure:true}).json('ok')
}




