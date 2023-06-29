const User = require('../models/users');
const bcrypt = require('bcrypt');


module.exports.register = async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userCheck = await User.findOne({ username: req.body.username });
        if(!userCheck){
            const user = await User.create({
                username: req.body.username,
                password: hashedPassword,
            });

            res.json({status:true,user});
        }else if(userCheck){
            res.status(404).json({ status:false, msg: "Username già in uso"});
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
        localStorage.clear()
        return res.status(200).send();
    } catch (err) {
        res.status(500).json(err)
    }
}





