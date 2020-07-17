'use strict';
const Competences = require('../models/competenceModel');
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
    competences: [Competences]
}, { strict: false });

module.exports = mongoose.model('Rubrics', RubricSchema);