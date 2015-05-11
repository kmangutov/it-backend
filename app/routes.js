
var portfolioController = require('./controllers/PortfolioController.js');
var userController = require('./controllers/UserController.js');
var upvoteController = require('./controllers/UpvoteController.js');
var downvoteController = require('./controllers/DownvoteController.js');
var assetController = require('./controllers/AssetController.js');

module.exports = function(router, passport) {

  console.log(passport)

  router.get('/users', userController.get);
  router.post('/users', userController.post);
  router.delete('/users/:id', userController.delete);

  router.get('/portfolio', portfolioController.get);
  router.post('/portfolio', portfolioController.post);
  router.delete('/portfolio/:id', portfolioController.delete);

  router.get('/portfolio/:id', assetController.get);
  router.post('/portfolio/:id', assetController.post);

  router.post('/portfolio/:id/upvote', upvoteController.post);
  router.post('/portfolio/:id/downvote', downvoteController.post);

  router.post('/login', passport.authenticate('local-login'), function(req, res) {
		res.send(req.user);
	});

  router.post('/signup', passport.authenticate('local-signup'), function(req, res) {
		res.send(200);
	});

  router.post('/logout', function(req, res){
  		req.logOut();
  		res.send(200);
  });

  router.get('/loggedin', function(req, res) {
  		res.send(req.isAuthenticated() ? req.user : '0');
  });


  function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();

		res.json({
			error: "User not logged in"
		});
	}
}