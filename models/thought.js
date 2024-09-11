const mongoose = require('mongoose');
const Reaction = require('./reaction');


const thoughtSchema = new mongoose.Schema(
    {
      thoughtText: {
        type: String,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String,
        default: false,
      },
      reactions: [Reaction],
    },
    {
      toJSON: {
        virtuals: true,
      },
    }
  );

  thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const thought = mongoose.model('thought', thoughtSchema);

module.exports = thought;

  