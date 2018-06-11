const express = require('express')
const bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient

var uri ="mongodb+srv://amr6163:WeDoNotSow4@behrend-tour-3wnez.mongodb.net";

// Should be encapsulated.
MongoClient.connect(uri, function (err, db){
  if(err){
    return console.log(err);
  }
    var dbo = db.db('behrendtour');
    dbo.createCollection("Locations", function(err, res){
      if(err)
        return err;
      db.close();
    })
});
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(express.static('ckeditor'));

app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res){
  res.render('index');
  var ex = exists("Location", req.body.locationTitle); // value not returning.
  console.log(ex);
  if(ex){

      insertLocation(req.body.locationTitle, req.body.editor1);
  }


  });

app.listen(process.env.PORT||3000)

function insertLocation(locationName, locationDescription){
  MongoClient.connect(uri, function (err, db){
    if(err){
      return console.log(err);
    }
      var dbo = db.db('behrendtour');
      var object = {name: locationName, description: locationDescription};
      dbo.collection("Location").insertOne(object, function(err, res){
        if(err) throw err;
        console.log(("[*] Location Inserted"));
        db.close();
      })

      })
}

function exists(col, query){
  // Query database for collection and query
  database_connection(col, query)
    // Then on response we capture the returned value
    // If we find data in the database this value will have an id, name, descripton
    // However if no match was found the value is null
    .then(function(items) {
      if (items === null){
        console.log("Value not foudn");
      }else{
        console.log("Value was found for the query");
      }
      })
      // Catche the query error
    .catch(function(err){
      console.log(`Err: ${err}`);
  })
}

function database_connection(col, query) {
// This is kinda hairy
// We are going to chain several functions
  return MongoClient.connect(uri)
  // After a connection has been makde lets access the (whatever mongos tabel is Document?)
  .then(function(database) {
    var collection = database.db('behrendtour').collection(col).findOne({name: query})
    // If we found information that matched the querery return it
    return collection
  })
  .then(function(items) {
    // Return the result
    return items
})
}
