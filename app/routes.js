
var portfolioController = require('./controllers/PortfolioController.js');
var userController = require('./controllers/UserController.js');
var upvoteController = require('./controllers/UpvoteController.js');
var downvoteController = require('./controllers/DownvoteController.js');

module.exports = function(router) {

  router.get('/users', userController.get);
  router.post('/users', userController.post);
  router.delete('/users/:id', userController.delete);

  router.get('/portfolio', portfolioController.get);
  router.post('/portfolio', portfolioController.post);
  router.delete('/portfolio/:id', portfolioController.delete);

  router.post('/portfolio/upvote', upvoteController.post);
  router.post('/portfolio/downvote', downvoteController.post);
}