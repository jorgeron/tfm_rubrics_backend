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
    // Me hace falta realmente así??
    area: {
        type: Schema.Types.Mixed,
        required: 'Area is required',
        ref: 'Areas'
    },
    area_id: {
        type: Schema.Types.ObjectId,
        required: 'Area id required',
        ref: 'Areas'
    },
    name: {
        type: String,
        required: 'Kindly enter the competence name',
        unique: true
    },
    proficiencyLevels: [LevelDescriptorSchema]
}, { strict: false });

module.exports = mongoose.model('Competences', CompetenceSchema);