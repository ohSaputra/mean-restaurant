/**
 * Module dependencies.
 */

const { wrap: async } = require('co');
const { respond } = require('../utils');

/**
 * Topup balance
 */

exports.create = async(function* (req, res) {
  const user = req.profile;
  try {
    yield user.addBalance(req.body);
    
    respond(res, {
      type: 'success',
      text: 'Successfully topup user balance!'
    });
  } catch (err) {
   
    respond(res, {
      errors: [err.toString()]
    }, 400);
  }
});


