'use strict';
const Areas = require('../models/areaModel');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * PROFICIENCY LEVELS
 */
var LevelDescriptorSchema = new Schema({
    level: {
        type: String,
        required: 'Kindly enter the level'
    },
    descriptor: {
        type: String,
        required: 'Kindly enter the descriptor'
    }
}, { strict: false });


/**
 * COMPETENCES
 */
var CompetenceSchema = new Schema({
    // Si no funciona así, añadir ObjectId y otro atributo areaName
    area: {
        type: Schema.Types.Embedded,
        required: 'Area id required',
        ref: Areas
    },
    name: {
        type: String,
        required: 'Kindly enter the competence name'
    },
    proficiencyLevels: [LevelDescriptorSchema]
}, { strict: false });

module.exports = mongoose.model('Competences', CompetenceSchema);