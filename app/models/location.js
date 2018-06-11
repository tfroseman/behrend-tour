// load the things we need.
var mongoose = require('mongoose');


// define the schema for our location model.
var locationSchema = mongoose.Schema({
  local           :{
    name          :String,
    description   :String,
  },
});

// methods ======================


// create the model for users and expose it to our app.
module.exports = mongoose.model('User', userSchema);
