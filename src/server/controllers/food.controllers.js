'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const only = require('only');
const { respond, respondOrRedirect } = require('../utils');
const Food = mongoose.model('Food');
const assign = Object.assign;

/**
 * Load
 */

exports.load = async(function* (req, res, next, id) {
  try {
    req.food = yield Food.load(id);
    if (!req.food) return next(new Error('Food not found'));
  } catch (err) {
    return next(err);
  }
  next();
});

/**
 * List
 */

exports.index = async(function* (req, res) {
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const _id = req.query.item;
  const limit = 30;
  const options = {
    limit: limit,
    page: page
  };

  if (_id) options.criteria = { _id };

  const food = yield Food.list(options);
  const count = yield Food.count();

  respond(res, {
    food: food,
    page: page + 1,
    pages: Math.ceil(count / limit)
  });
});

/**
 * Show
 */

exports.show = function (req, res) {
  respond(res, req.food);
};

/**
 * Add new food
 */

exports.create = async(function* (req, res) {
  const food = new Food(only(req.body, 'name price'));
  try {
    yield food.foodSave();

    respond(res, {
      type: 'success',
      text: 'Successfully added new food!'
    });
  } catch (err) {

    respond(res, {
      errors: [err.toString()]
    });
  }
  
});

/**
 * Update food
 */

exports.update = async(function* (req, res){
  const food = req.food;
  assign(food, only(req.body, 'name price'));
  try {
    yield food.foodSave();
    
    respond(res, {
      type: 'success',
      text: 'Successfully updated ' + food.name + '!'
    });
  } catch (err) {

    respond(res, res, {
      errors: [err.toString()]
    }, 422);
  }
});

/**
 * Delete a food
 */

exports.destroy = async(function* (req, res) {
  yield req.food.remove();
  respond(res, {
    type: 'success',
    text: 'Deleted successfully'
  });
});