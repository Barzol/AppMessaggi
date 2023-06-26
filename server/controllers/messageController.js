const Message = require('../models/messages')

module.exports.getAllMessage = async  (req,res) => {
    try {

        const {sender,receiver} = req.body
        const messages = await Message.find({
            sender: sender,
            receiver: receiver
        }).sort({updatedAt: 1});



        const displayMessages = messages.map(c => {
            return{
                fromSelf : c.sender.toString() === sender.toString(),
                text: c.text
            }
        })
        res.status(200).json(displayMessages);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.sendMessage = async  (req,res) => {
    try {
        const {sender, receiver, text} = req.body
        const newMessage = await Message.create({
            sender: sender,
            receiver: receiver,
            text: text
        })

        if(newMessage)
            return res.json({message:'Messaggio inviato con successo'})
        else
            return res.json({message: 'Fallimento invio del messaggio'})

    } catch (err) {
        res.status(500).json(err);
    }
}

