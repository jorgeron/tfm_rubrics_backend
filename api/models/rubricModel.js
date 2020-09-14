'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RubricSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the rubric name'
    },
    description: {
        type: String,
        required: 'Kindly enter the rubric description'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Actors'
    },
    competences: [{
        type: Schema.Types.Mixed,
        ref: 'Competences'
    }],
    activities: [{
        type: Schema.Types.Mixed,
        ref: 'Activities'
    }]
}, { strict: false });

module.exports = mongoose.model('Rubrics', RubricSchema);