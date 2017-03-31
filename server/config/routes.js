//require each controller, will refer to each controller in the routes
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var snippetsController = require('../controllers/snippets-controller.js');
var languageController = require('../controllers/languages-controller.js');
var favoriteController = require('../controllers/favorite-controller.js');
var categoryController = require('../controllers/categories-controller.js');
var profileController = require('../controllers/profile-controller.js');


module.exports = function(app, express) {
  app.get('/login/facebook', passport.authenticate('facebook'));

  app.get('/login/facebook/return', 
    passport.authenticate('facebook', { successRedirect: '/',
                                        failureRedirect: '/about' }
    )
  );

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/api/test', snippetsController.test);
  //get all the snippets
  app.get('/api/snippets', snippetsController.get);
  //get the most recent snippets
  app.get('/api/snippets/recent', snippetsController.getMostRecent);
  //get a snippet by its id
  app.get('/api/snippets/:id', snippetsController.getById);
  //get snippets by created by user
  app.get('/api/getSnippetsByUser/:userId', snippetsController.getSnippetsByUser);
  //create a new snippet
  app.post('/api/snippets', snippetsController.post);
  //get all the languages
  app.get('/api/languages', languageController.get);
  //toggles the favorite status of a snippet
  app.post('/api/favorite', favoriteController.post);
  //get favorites status by snippet and user
  app.get('/api/isFavSnippetByUser/:snippetId/:userId', favoriteController.isFavSnippetByUser);
  //get total favorites per snippet
  app.get('/api/getFavsBySnippet/:snippetId', favoriteController.getFavsBySnippet);
  //get all categories
  app.get('/api/categories', categoryController.getCategories);
  //get sub-categories by category id
  app.get('/api/sub-categories/:id', categoryController.getSubcategories);
  //get total favorites per snippet
  app.get('/api/getFavsByUser/:userId', favoriteController.getFavsByUser);
  //get user data
  app.get('/api/getUserData/:userId', profileController.getUserData);
  //direct to about page
  app.get('/about', function(req, res) {
    res.redirect('/');
  });
  //direct to profile page
  app.get('/profile', function(req, res) {
    res.redirect('/');
  });
  //direct to search page
  app.get('/search', function(req, res) {
    res.redirect('/');
  });
  //direct to page wher a user can add a snippet
  app.get('/add', function(req, res) {
    res.redirect('/');
  });
  //redirect to the home page
  app.get('/*', function(req, res) {
    console.log('request comming...')
    res.redirect('/');    
  });
};
