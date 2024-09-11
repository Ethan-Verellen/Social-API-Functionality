const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            default: false,
            required: true,
          },
        email: {
              type: String,
              required: true,
              unique: true,
              match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email required' ],
          },
          friends: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'users',
            },
      ],
      
      thoughts: [
        {
          type: String,
          ref: 'thought',
        },
    ]
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

  userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const users = mongoose.model('users', userSchema);

module.exports = users;

  