'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OverallLevel = new Schema({
    competenceId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Competences'
    },
    competenceName: {
        type: String,
    },
    level: {
        type: Number,
        required: 'Kindly enter the level'
    },
    descriptor: {
        type: String
    }
}, { strict: false });


var StudentSchema = new Schema({
    _id: {
        type: String
    },
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
    },
    course: {
        type: String,
        ref: 'Courses'
    },
    overallLevels: {
        type: [OverallLevel]
    }
}, { strict: false });

module.exports = mongoose.model('Students', StudentSchema);