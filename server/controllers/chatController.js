const express = require('express')
const User = require('../models/users')
const messages = require('../models/messages')
const dotenv = require('dotenv')
const jwt = require('jwt-then')
const bcrypt = require('bcrypt')
const jwtSecret = process.env.JWT_SECRET


module.exports.getChats = async  (req,res) => {
    const token = req.cookies?.token
    if(token){
        jwt.verify(token,jwtSecret,{},(error,data)=>{
            if (error) throw error
            res.json(data)
        })
    }else{
        res.status(401).json('nessun token')
    }

}

module.exports.getFriends = async  (req,res) => {
    const friends = await User.find({_id:{$ne:req.params.id}})
        .select([
            'username',
            '_id'
        ])
    res.json(friends)
}

module.exports.addFriend = async  (req,res) => {

}
module.exports.deleteFriend = async  (req,res) => {

}

module.exports.displayMessages = async  (req,res) => {

}



