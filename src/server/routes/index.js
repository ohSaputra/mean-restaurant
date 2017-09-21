module.exports = function(route) {

    var ctrlFood = require('../controllers/food.controllers.js');

    // Food API
    route
        .route('/api/food')
        .get(ctrlFood);

    // Authentication
    router
        .route('/users/register')
        .post(ctrlUsers.register);

    router
        .route('/users/login')
        .post(ctrlUsers.login);
};