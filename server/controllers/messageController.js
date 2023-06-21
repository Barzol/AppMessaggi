const express = require('express')
const User = require('../models/users')
const Message = require('../models/messages')
const dotenv = require('dotenv')
const jwt = require('jwt-then')
const bcrypt = require('bcrypt')
const jwtSecret = process.env.JWT_SECRET

module.exports.getUserData = async (req,res) => {
    return new Promise((res, rej) => {
        const token = req.cookies?.token
        if(token) {
            jwt.verify(token, jwtSecret, {}, (err, userData) => {
                if(err) throw err
                res(userData)
            })
        } else {
            rej('no token')
        }
    })
}

module.exports.getMessage = async  (req,res) => {
    const {userId} = req.params
    const userData = await this.getUserData(req)
    const myUserId = userData.userId
    const messages = await Message.find({
        sender:{$in:[userId,myUserId]},
        receiver:{$in:[userId,myUserId]}
    }).sort({createdAt: 1})
    res.json(messages)
}

module.exports.sendMessage = async  (req,res) => {
    const messageData = JSON.parse(req.toString())
    const {receiver, text} = messageData
    const messageDoc = await Message.create({
        sender: connection.userId,
        receiver,
        text
    })
    console.log('messaggio creato')
}

module.exports.receiveMessage = async  (req,res) => {

}
