// load the things we need.
var mongoose = require('mongoose');


// define the schema for our location model.
var locationSchema = mongoose.Schema({
    local           :{
    name          :String,
    imageURL      :String,
    description   :String,
    checkins      :String,
  },
});

// methods ======================


// create the model for locations and expose it to our app.
module.exports = mongoose.model('Location', locationSchema);
