var mongoose = require('mongoose')
var Location = require('./models/location')
var Uploads = require('./models/uploads')
var multer = require('multer')
//var upload = multer({dest:'./public/images/uploads'})

// =====================================
// MULTER CONFIGURATION(moving later)===
// =====================================
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb){
    cb(null, Date.now() + '-' + file.originalname)
  }
});

var upload = multer({storage: storage})
// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('login.ejs', {message: req.flash('loginMessage')}); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
     app.post('/login', passport.authenticate('local-login', {
       successRedirect : '/add-location', // redirect to the secure profile section.
       failureRedirect : '/login', // redirect back to the signup page if there is an error.
       failureFlash: true // allow flash messages.
     }));

    // =====================================
    // ADD USER==============================
    // =====================================
    // PROTECTED
    // Details: Adds user to user table.
    app.get('/add-user',  function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('add-user.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
     app.post('/signup', passport.authenticate('local-signup',{
       successRedirect: '/add-location', // redirect to the secure profile section.
       failureRedirect: '/add-user', // redirect back to the signup page if there is an error.
       failureFlash: true // allow flash messages.
     }));

    // =====================================
    // VIEW All LOCATIONS ==================
    // =====================================
    // PROTECTED
    app.get('/view-locations', isLoggedIn, function(req, res) {
        var results = Location.find({}, function (err, locations){
          if(err)
            throw err;

            res.render('view-locations.ejs', {
                user : req.user, // get the user out of session and pass to template
                locations : locations,
            });
        });



    });

    // =====================================
    // EDIT LOCATION =======================
    // =====================================
    // PROTECTED
    app.get('/edit-location/:location', function(req, res) {
        // res.send("Location: " + req.params.location);
        console.log(req.params.location);
        var results = Location.find({name: 'location1'}, function (err, locations){
          if(err)
            throw err;
            console.log(locations);
            res.render('edit-location.ejs', {
                user : req.user, // get the user out of session and pass to template
                locationTitle: locations.local.name,
                locationDescription: locations.local.description,
            });
        });
    });

    // =====================================
    // ADD LOCATION ========================
    // =====================================
    // PROTECTED
    // Details: Allows user to create new location for anniverary tour
    app.get('/add-location', isLoggedIn, function(req, res){
      res.render('add-location.ejs', {
        user:req.user // get the user out of session and pass to template.
      })
    })

    // process the new location and store to db.
     app.post('/add-location', upload.single('avatar'), function(req, res){
     if(req.file)
      console.log('File Uploaded');
    else {
      console.log('No File Uploaded');
    }

     var newLocation = new Location();
     newLocation.local.name = req.body.locationTitle;
     newLocation.local.description = req.body.editor1;

     var newUpload = new Uploads();
     newUpload.local.url = req.file.path;
     newUpload.local.location = req.body.locationTitle;

     // save the location
     newLocation.save( function(err) {
         if (err)
          throw err;

     });

     // save the upload
     newUpload.save(function(err){
       if(err)
        throw err;
     });
     res.redirect("/view-locations");
     });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
