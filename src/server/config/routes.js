'use strict';

/*
 * Module dependencies.
 */

const ctrlFood = require('../controllers/food.controllers');
const ctrlUser = require('../controllers/user.controllers');
const ctrlTopup = require('../controllers/topup.controllers');
const ctrlOrder = require('../controllers/order.controllers');

/**
 * Expose routes
 */

module.exports = function (app, passport) {
  const pauth = passport.authenticate.bind(passport);

  // food routes
  app.param('id', ctrlFood.load);

  app
    .route('/food')
    .get(ctrlFood.index)
    .post(ctrlFood.create);

  app
    .route('/food/:id')
    .get(ctrlFood.show)
    .put(ctrlFood.update)
    .delete(ctrlFood.destroy);

  // user routes
  app.param('userId', ctrlUser.load);

  app
    .route('/users')
    .post(ctrlUser.create);
  
  app
    .route('/users/login')
    .post(pauth('local'), ctrlUser.session);

  // topup routes
  app
    .route('/users/:userId/topup')
    .post(ctrlTopup.create);

  // order routes
  app
  .route('/users/:userId/order')
  .post(ctrlOrder.create);


  /////////////////////////////////////////////////////
  

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', { error: err.stack });
      return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    const payload = {
      url: req.originalUrl,
      error: 'Not found'
    };
    if (req.accepts('json')) return res.status(404).json(payload);
    res.status(404).render('404', payload);
  });

};