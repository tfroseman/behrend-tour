// load the things we need.
var mongoose = require('mongoose');


// define the schema for our uploads model.
var uploadSchema = mongoose.Schema({
    local           :{
    url          :String,
    location      :String,
  },
});

// methods ======================


// create the model for locations and expose it to our app.
module.exports = mongoose.model('Upload', uploadSchema);
