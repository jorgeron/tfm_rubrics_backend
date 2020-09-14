'use strict';
var mongoose = require('mongoose');
const rubricModel = require('../models/rubricModel');
var Assessment = mongoose.model('Assessments');
var Student = mongoose.model('Students');
var Rubric = mongoose.model('Rubrics');

exports.read_an_assessment = function (req, res) {
    // TODO
};




exports.create_an_assessment = function (req, res) {
    var new_assessment = new Assessment(req.body);
    console.log("NEW assessment: ", new_assessment);
    new_assessment.save(function (err, assessment) {
        if (err) {
            res.status(500).send(err);
        } else {
            Student.findOne({ _id: assessment.student }, function (err, student) {
                if (student) {
                    Assessment.find({student: student._id}, function(err, studentAssessments) {
                        for (const score of assessment.scores) {
                            var stored_scores = [];
                            var currentLevel = student.overallLevels.find(x => JSON.stringify(x.competenceId) === JSON.stringify(score.competence));
                            if (currentLevel) {
                                var index = student.overallLevels.indexOf(currentLevel);
                                studentAssessments.forEach(assessment_score => {
                                    assessment_score.scores.forEach(score => {
                                        if (JSON.stringify(score.competence) === JSON.stringify(currentLevel.competenceId)) {
                                            stored_scores.push(score.proficiencyLevel.level);
                                        }
                                    });
                                });
                                //console.log("STORED SCORES: ", stored_scores);
                                const new_avg_level = calculate_average(stored_scores);
                                //console.log("new_avg_level: ", new_avg_level);
                                student.overallLevels[index].level = new_avg_level;
                                //console.log("student.overallLevels: ", student.overallLevels)
                            } else {
                                var new_overall_level = {
                                    level: score.proficiencyLevel.level,
                                    competenceId: score.competence,
                                    competenceName: score.competenceName,
                                    descriptor: score.proficiencyLevel.descriptor
                                };
                                student.overallLevels.push(new_overall_level);
                            }
                        }
                        Student.findOneAndUpdate({_id:student._id}, {$set: {"overallLevels":student.overallLevels}}, {new:true}, function(err, updated_student) {
                            console.log('UPDATED STD: ', updated_student);
                            res.json(updated_student);
                        });

                    });
                }
            });
            Rubric.findById(assessment.rubric, function(err, rubric) {
                if (rubric) {
                    const activities = rubric.activities;
                    console.log("new_assessment.activity: ", new_assessment.activity);
                    activities.push(new_assessment.activity);
                    Rubric.findOneAndUpdate({_id:rubric._id}, {$set: {"activities":activities}}, function(err, updated_rubric) {
                        console.log('UDPATED RUBRIC');
                    })
                }
                
            })
            
        }
    });
}



var calculate_average = function (grades) {
    var total = 0;
    for(var i = 0; i < grades.length; i++) {
        total += grades[i];
    }
    var avg = total / grades.length;
    console.log("avg: ", avg);
    return avg;
}

exports.update_an_assessment = function (req, res) {
    // TODO
};

exports.delete_an_assessment = function (req, res) {
    // TODO
};

exports.list_assessments_by_rubric = function (req, res) {
    // TODO
};