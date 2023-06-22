const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/users')
const Messages = require('../models/messages')
const dotenv = require('dotenv').config()
const jwt = require('jwt-then')
const bcrypt = require('bcrypt')
const jwtSecret = process.env.JWT_SECRET

module.exports.register = async (req, res) => {
    // const{ username, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.login = async (req,res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if(!user){return res.status(404).json("Utente non trovato")}

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){return res.status(400).json("Password errata")}

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.logout = async (req,res) => {
    res.cookie('token', '' ,{sameSite:'none',secure:true}).json('ok')
}




