
var portfolioController = require('./controllers/PortfolioController.js');
var userController = require('./controllers/UserController.js');
var upvoteController = require('./controllers/UpvoteController.js');
var downvoteController = require('./controllers/DownvoteController.js');
var assetController = require('./controllers/AssetController.js');

module.exports = function(router) {

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
}