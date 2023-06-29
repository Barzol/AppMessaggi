
const User = require('../models/users')

module.exports.getFriends = async  (req,res) => {
    try{
        const friends = await User.find({
            _id: {$ne:req.params.id}
        }).select([
            'username',
            '_id'
        ])
        if(friends.length === 0){
            res.status(200).json('Nessun altro utente è registrato')
        }else{
            res.status(200).json(friends)
        }

    }catch(error){
        res.status(500).json(error)
    }
}

// Aggiungi un amico
module.exports.addFriend = async (req, res) => {
    try {
        const { username, friendUsername } = req.body;

        // Verifica che gli username siano forniti
        if (!username || !friendUsername) {
            return res.status(400).json({ error: 'Username utente o username amico non forniti' });
        }

        // Verifica che l'utente esista nel database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }

        // Verifica se l'amico è già presente nell'elenco degli amici
        if (user.friends.includes(friendUsername)) {
            return res.status(400).json({ error: 'Amico già presente nella lista degli amici' });
        }

        // Aggiungi l'amico all'array degli amici dell'utente
        user.friends.push(friendUsername);
        await user.save();

        res.json({ message: 'Amico aggiunto con successo' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante l\'aggiunta dell\'amico' });
    }
};

// Rimuovi un amico
module.exports.removeFriend = async (req, res) => {
    try {
        const { username, friendUsername } = req.body;

        // Verifica che gli username siano forniti
        if (!username || !friendUsername) {
            return res.status(400).json({ error: 'Username utente o username amico non forniti' });
        }

        // Verifica che l'utente esista nel database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }

        // Verifica se l'amico è presente nell'elenco degli amici
        if (!user.friends.includes(friendUsername)) {
            return res.status(400).json({ error: 'Amico non presente nella lista degli amici' });
        }

        // Rimuovi l'amico dall'array degli amici dell'utente
        user.friends = user.friends.filter((friend) => friend !== friendUsername);
        await user.save();

        res.json({ message: 'Amico rimosso con successo' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Si è verificato un errore durante la rimozione dell\'amico' });
    }

};




