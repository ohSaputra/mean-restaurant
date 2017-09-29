'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Food Schema
 */

const FoodSchema = new Schema({
  name: {
    type: String,
    default: '',
    required : true
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  image: {
    cdnUri: String,
    default: ''
  },
  createdAt: { 
    type: Date, 
    default: Date.now
  }
});


/**
 * Validations
 */

FoodSchema.path('name').required(true, 'Name cannot be blank');
FoodSchema.path('price').required(true, 'Price cannot be blank');

/**
 * Pre-remove hook
 */

FoodSchema.pre('remove', function (next) {
  
  next();
});


/**
 * Methods
 */

FoodSchema.methods = {

  /**
   * Save food
   *
   * @api private
   */

  foodSave: function () {
    const err = this.validateSync();
    if (err && err.toString()) throw new Error(err.toString());
    return this.save();

  }

};

/**
 * Statics
 */

FoodSchema.statics = {

  /**
   * Find food by id
   *
   * @param {ObjectId} id
   * @api private
   */

  load: function (_id) {
    return this.findOne({ _id })
      .exec();
  },

  /**
   * List foods
   *
   * @param {Object} options
   * @api private
   */

  list: function (options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

};

mongoose.model('Food', FoodSchema);