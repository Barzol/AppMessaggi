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
            res.status(400).json({ status:false, msg: "Username già in uso"});
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.login = async (req,res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if(!user){return res.status(404).json({status: false, msg: "Utente non trovato"})}

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){return res.status(400).json({status:false, msg:"Password errata"})}

        res.json({status: true, user})
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.logout = (req, res, next) => {
    try {
        if (!req.params.id) return res.json({msg: "UserId richiesto "});
        isOnline.delete(req.params.id);
        return res.status(200).send();
    } catch (err) {
        res.status(500).json(err)
    }
}





