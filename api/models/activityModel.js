'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
    _id: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    course: {
        type: String,
        ref: 'Courses'
    }
}, { strict: false });

module.exports = mongoose.model('Activities', ActivitySchema);