var mongoose = require('mongoose');
var Food = mongoose.model('Food');

module.exports = function(req, res) {

    Food
        .find()
        .exec(function(err, foods) {

            console.log(err);
            console.log(foods);

            if (err) {
                console.log("Error finding foods");
                res
                    .status(500)
                    .json(err);

            } else {
                console.log("Found foods", foods.length);
                res
                    .json(foods);
            }

        });

}