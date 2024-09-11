const {Thought, User} = require('../models');

module.exports = {

    async getuser(req,res) {
        try {
        const user = await User.find();
        res.status(200).json(user);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    
    async get1user(req,res) {
        try {
        const user = await User.findOne({ _id: req.params.userId}).select('-__v');

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.status(200).json(user);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    
    async createuser(req,res) {
        try {
        const user = await User.create(req.body);
    
        res.status(200).json(user);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    
    async updateuser(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $set: req.body },
                { runValidators: true, new: true }
            );
      
            if (!user) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
      
        res.status(200).json(user);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    
    async deleteuser(req,res) {
        try {
        const user = await User.findOneAndRemove({ _id: req.params.userId });
        
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }

        
      await Thought.deleteMany({ _id: { $in: User.thoughts } });

        res.status(200).json(user);
        } catch (err) {
        res.status(500).json(err);
        }
    },
   
    async createfriend(req,res) {
        try {
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
          );

          
      if (!friend) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.status(200).json(friend);
        } catch (err) {
        res.status(500).json(err);
        }
    },
        
    async deletefriend(req,res) {
        try {
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { tagId: req.params.friendId } } },
            { runValidators: true, new: true }
          );

          if (!friend) {
            return res.status(404).json({ message: 'No user with this id!' });
          }

          res.status(200).json(friend);
        } catch (err) {
        res.status(500).json(err);
        }
    }
}