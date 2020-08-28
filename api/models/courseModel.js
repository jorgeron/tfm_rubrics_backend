'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CourseSchema = new Schema({
    _id: {
        type: String
    },
    teacher: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Actors'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    room: {
        type: String
    }
}, { strict: false });

module.exports = mongoose.model('Courses', CourseSchema);