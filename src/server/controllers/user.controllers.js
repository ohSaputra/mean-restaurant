'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { respond } = require('../utils');
const User = mongoose.model('User');

/**
 * Load
 */

exports.load = async(function* (req, res, next, _id) {
  const criteria = { _id };
  const select = 'name username balance topup order';
  try {
    req.profile = yield User.load({ criteria, select });
    if (!req.profile) return next(new Error('User not found'));
  } catch (err) {
    return next(err);
  }
  next();
});

/**
 * Create user
 */

exports.create = async(function* (req, res) {
  const user = new User(req.body);
  user.provider = 'local';
  try {
    yield user.save();
    
    respond(res, {
      type: 'success',
      text: 'User registered!'
    });
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);

      respond(res, {
        errors: errors
      }, 400);
  }
});

/**
 * Auth callback
 */

exports.authCallback = login;


/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * Session
 */

exports.session = async(function* (req, res) {
  req.profile = req.user;

  respond(res, {
    type: 'success',
    text: 'User found!'
  });
});

/**
 * Login
 */

function login (req, res) {
  const redirectTo = req.session.returnTo
    ? req.session.returnTo
    : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}