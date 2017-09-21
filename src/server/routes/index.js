module.exports = function(route) {

    var ctrlFood = require('../controllers/food.controllers.js');

    // Food API
    route
        .route('/api/food')
        .get(ctrlFood.getAll);

    // Authentication
    route
        .route('/users/register');
        // .post(ctrlUsers.register);

    route
        .route('/users/login');
        // .post(ctrlUsers.login);
};