'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
}, { strict: false });

module.exports = mongoose.model('Students', StudentSchema);


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
        type: String,
        required: true
    },
    students: [StudentSchema]
}, { strict: false });

module.exports = mongoose.model('Courses', CourseSchema);