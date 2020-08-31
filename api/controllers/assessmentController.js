'use strict';
var mongoose = require('mongoose');
var Assessment = mongoose.model('Assessments');
var Student = mongoose.model('Students');

exports.read_an_assessment = function (req, res) {
    // TODO
};

exports.create_assessment = function (req, res) {
    var new_assessment = new Assessment(req.body);
    /*Student.find({ _id: new_assessment.students }, function (err, students) {
        if (err) {
            res.status(500).send(err = 'Students error');
        } else {
            var assessment_scores = new_assessment.scores;
            students.forEach(student => {
                assessment_scores.forEach(score => {

                });
            })*/
            new_assessment.save(function (err, assessment) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(assessment);
                }
            });
      //  }
    //});
};

/*update_overall_level = function (student, score) {
    var currentLevel = student.overallLevels.find(x => x.competence_id === score.competence_id);
    if (currentLevel) {

    } else {

    }
}*/

exports.update_an_assessment = function (req, res) {
    // TODO
};

exports.delete_an_assessment = function (req, res) {
    // TODO
};

exports.list_assessments_by_rubric = function (req, res) {
    // TODO
};