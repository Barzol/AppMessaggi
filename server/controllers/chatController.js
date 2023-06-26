
const User = require('../models/users')

module.exports.getFriends = async  (req,res) => {
    try{
        const friends = await User.find({
            _id: {$ne:req.params.id}
        }).select([
            'username',
            '_id'
        ])

        res.status(200).json(friends)
    }catch(error){
        res.status(500).json(error)
    }
}

module.exports.addFriend = async  (req,res) => {

}
module.exports.deleteFriend = async  (req,res) => {

}




