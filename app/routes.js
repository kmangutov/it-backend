

var portfolioController = require('./controllers/PortfolioController.js');

module.exports = function(router) {

  router.get('/portfolios', portfolioController.get);
}