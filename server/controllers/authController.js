const User = require('../models/users')
const bcrypt = require('bcrypt')


module.exports.register = async (req, res) => {
    const{ username, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.find({ username });
        if(!user){
            const newUser = new User({
                username: username,
                password: hashedPassword,
            });
            res.status(200).json(newUser);
        }else{
            res.status(400).json({ msg: "Username già in uso"});
        }
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
    if(!req.params.id) {
        return res.json({message: 'UserId richiesto'})
    }
    delete req.params.id
    return res.status(200).send()

    //res.cookie('token', '' ,{sameSite:'none',secure:true}).json('ok')
}






