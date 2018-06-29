var mongoose = require('mongoose');


var mongoDB = 'mongodb+srv://amr6163:WeDoNotSow4@behrend-tour-3wnez.mongodb.net/behrendtour?retryWrites=true';
mongoose.connect(mongoDB);
var db = mongoose.connection;

//Global error cache
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

exports.db = db;
