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
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.sendMessage = async  (req,res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.receiveMessage = async  (req,res) => {

}
