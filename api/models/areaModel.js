'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AreaSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the area name'
    }
}, { strict: false });


module.exports = mongoose.model('Areas', AreaSchema);