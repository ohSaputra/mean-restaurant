var mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    price: {
        type: Number,
        required: true
    }
});

mongoose.model('Food', foodSchema);