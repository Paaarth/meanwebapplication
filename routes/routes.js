/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global __dirname */
// app/routes.js
module.exports = function (app, passport) {
    // =====================================
    // LOGIN- FAILURE ROUTE ========
    // =====================================
    app.get('/failure_register', function (req, res) {
        return res.status(400).send("Bad Request");
    });

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('index.html'); // load the index.htmlfile
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/failure_register', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/failure_register', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // GLOBAL ROUTE ==============================
    // =====================================
    app.get('*', function (req, res) {
        res.render(__dirname + "./../public/index.html", {
            user: req.user
        });
    });

    // =====================================
    // DEFAULT ROUTE ==============================
    // =====================================    
    app.get('/', function (req, res) {
        res.render('index', {
            user: req.user
        });
    });

    // =====================================
    // CHECK USER LOGGED-IN ROUTE ==============================
    // =====================================    
    app.post('/api/loggedin', loggedinUser);

    // =====================================
    // PAGE CONTROLLER ROUTE ==============================
    // =====================================    
    var pageController = require('./../app/controllers/page.js');
    app.post('/getPage', isLoggedIn, pageController.getPage);
    app.post('/updatePage', isLoggedIn, pageController.updatePage);
    app.post('/removePage', isLoggedIn, pageController.removePage);
    app.post('/listPages', isLoggedIn, pageController.listPages);
    app.post('/createPage', isLoggedIn, pageController.createPage);
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
function loggedinUser(req, res) {
    if (req.isAuthenticated()) {
        return res.status(200).send(req.isAuthenticated() ? req.user : '0');
    } else {
        return res.status(444).send("Bad Request! User must be login to perform this task");
    }
}