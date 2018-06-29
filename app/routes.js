var mongoose = require('mongoose')
var Location = require('./models/location')
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
    app.get('/add-user', isLoggedIn, function(req, res) {

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
        //console.log(Location.find());
        res.render('view-locations.ejs', {
            user : req.user // get the user out of session and pass to template
        });


    });

    // =====================================
    // VIEW SPECIFIC LOCATIONS =============
    // =====================================
    // PROTECTED
    app.get('/view-locations/:location', function(req, res) {
        res.send("Location: " + req.params.location);
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
     app.post('/add-location', function(req, res){

     console.log(req.body.editor1);
     var newLocation = new Location();
     newLocation.local.name = req.body.locationTitle;
     newLocation.local.description = req.body.editor1;

     // save the location
     newLocation.save( function(err) {
       console.log("In save meth");
         if (err)
          throw err;
     });

     });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



    // DEBUG: routes
    // Get a Location
    app.get('/location/:id', function(request, response){
      response.json({ "Status": "Empty" });
    })

    // Get all Locations
    app.get('/location', function(request, response){
      locationModel.find({}, function(err, locations) {
        if (!err){
            response.json(locations);
        } else {
          console.error(err);
        }
      });
    });

    // Update a location
    app.put('/location/:id', function(request, response){
      response.json();
    });

    // Add a location
    app.post('/location', function(request, response){
      response.json({ "Status": "Empty" });
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
