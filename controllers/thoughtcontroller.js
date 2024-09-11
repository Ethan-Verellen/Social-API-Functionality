const {Thought, User} = require('../models');

module.exports = {

    async getthoughts(req,res) {
        try {
        const thought = await Thought.find();
        res.status(200).json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    
    async get1thoughts(req,res) {
        try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId});

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.status(200).json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    
    async createthoughts(req,res) {
        try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thought: thought._id } },
            { new: true }
          );
    
          if (!user) {
            return res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          }

          res.status(200).json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    
    async updatethoughts(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $set: req.body },
                { runValidators: true, new: true }
            );
      
            if (!thought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
      
            res.status(200).json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    
    async deletethoughts(req,res) {
        try {
        const thought = await Thought.findById({ _id: req.params.thoughtId });
        
        if (thought) {
            await Thought.deleteOne(thought);
            const user = await User.findOneAndUpdate(
              thought.userId,
                { $pull: { thought: thought._id } });
                res.status(200).json({message: 'User and associated apps deleted!'});
        } else {
        res.status(200).json({ message: "Invalid thought id!" });
        }
        } catch (err) {
        res.status(500).json(err);
        }
    },
    
    async createreaction(req,res) {
        try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          );

          
      if (!reaction) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.status(200).json(reaction);
        } catch (err) {
        res.status(500).json(err);
        }
    },
        
    async deletereaction(req,res) {
        try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          );

          if (!reaction) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }

          res.status(200).json(reaction);
        } catch (err) {
        res.status(500).json(err);
        }
    }
}

