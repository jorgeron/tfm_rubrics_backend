'use strict';
const Rubrics = require('../models/rubricModel');
//const Competences = require('../models/competenceModel');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * SCORE
 */
var ScoreSchema = new Schema({
    competence: {
        type: String,
        required: true
    },
    competenceName: {
        type: String,
        required: true
    },
    proficiencyLevel: {
        type: Object,
        required: true
    }
}, { strict: false });


/**
 * ASSESSMENT
 */
var AssessmentSchema = new Schema({
    rubric: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Rubrics
    },
    /*studentEmail: {
        type: String,
        required: 'Kindly enter the student email',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },*/
    student: {
        type: String,
        ref: 'Students'
    },
    activity: {
        type: Schema.Types.Mixed,
        ref: 'Activities',
        required: 'Kindly enter the activity',
    },
    comment: {
        type: String,
    },
    scores: [ScoreSchema]
}, { strict: false });

module.exports = mongoose.model('Assessments', AssessmentSchema);