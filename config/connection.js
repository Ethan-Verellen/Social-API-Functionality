const mongoose = require('mongoose');

const connection = 'mongodb://127.0.0.1:27017/socal_db';

mongoose.connect(connection);

module.exports=mongoose.connection;