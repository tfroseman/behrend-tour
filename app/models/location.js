// load the things we need.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our location model.
var locationSchema = new Schema({
    id            :Number,
    name          :String,
    description   :String,
});


var LocationModel = mongoose.model('location', locationSchema );

//exports.Location = LocationModel;
module.exports = LocationModel;
