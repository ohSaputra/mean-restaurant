/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { respond } = require('../utils');

const Food = mongoose.model('Food');


/**
 * Load
 */

exports.load = function (req, res, next, id) {
  req.order = req.profile.order
    .find(order => order.id === id);
    
  if (!req.order) return next(new Error('Order not found'));
  next();
};

/**
 * Add order
 */

exports.create = async(function* (req, res) {
  const user = req.profile;
  let total = 0;
  try {

    // generate total
    for (let i = 0; i < req.body.foods.length; i++) {
      let food = yield Food.load( req.body.foods[i].food );
      total += food.price;
    }
    req.body.total = total;
    
    // add order
    if (user.balance >= total) {
      yield user.addOrder(req.body);
    } else throw new Error('Insufficient Balance');
    
    respond(res, {
      type: 'success',
      text: 'Successfully add new order!'
    });
  } catch (err) {
   
    respond(res, {
      errors: [err.toString()]
    }, 400);
  }
});

