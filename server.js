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

app.listen(3000, function () {
  console.log('[*] Behrend-Tour listening on port 3000!')
})

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
  MongoClient.connect(uri, function (err, db){
    if(err){
      return console.log(err);
    }
      var dbo = db.db('behrendtour');

      dbo.collection(col).findOne({name: query}, function(err, result) {
        if(err) throw err;
        db.close();
        console.log(result) //debugging
        return(result); // originally tried returning true or false depenfing of if result existed. Still didn't work.

      })


    });
}
