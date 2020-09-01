'use strict';
var mongoose = require('mongoose');
var Assessment = mongoose.model('Assessments');
var Student = mongoose.model('Students');

exports.read_an_assessment = function (req, res) {
    // TODO
};


exports.create_assessment = function (req, res) {
    var new_assessment = new Assessment(req.body);
    new_assessment.save(function (err, assessment) {
        if (err) {
            res.status(500).send(err);
        } else {
            Student.findOne({ _id: assessment.student }, function (err, student) {
                if (student) {
                    for (const score of assessment.scores) {
                    //assessment.scores.forEach(score => {
                        var currentLevel = student.overallLevels.find(x => JSON.stringify(x.competenceId) === JSON.stringify(score.competence));
                        if (currentLevel) {
                            Assessment.find({student: student._id}, function(err, studentAssessments) {
                                var stored_scores = [];
                                stored_scores.push(score.proficiencyLevel.level);
                                
                                studentAssessments.forEach(assessment_score => {
                                    assessment_score.scores.forEach(score => {
                                        if (JSON.stringify(score.competence) === JSON.stringify(currentLevel.competenceId)) {
                                            stored_scores.push(score.proficiencyLevel.level);
                                        }
                                    });
                                });
                                //console.log("stored_scores: ", stored_scores);
                                const new_avg_level = calculate_average(stored_scores);
                                Student.findById(student._id, function(err, studentBD) {
                                    var studentOverallLevels = studentBD.overallLevels;
                                    var aux_overallLevels = [];
                                    //console.log('new_avg_level; ', new_avg_level);
                                    
                                    var onComplete = function(updatedLevels) {
                                        //console.log('updatedLevels: ', updatedLevels);
                                        Student.findOneAndUpdate({_id:studentBD._id}, {$set: {"overallLevels":updatedLevels}}, {new:true}, function(err, updated_student) {
                                            console.log('UPDATEDSTUDENT: ');
                                        });
                                    };
                            
                                    var taskToGo = studentOverallLevels.length;
                                    if (taskToGo === 0) {
                                        onComplete(aux_overallLevels);
                                    } else {
                                        for(const level of studentOverallLevels) {
                                        //studentOverallLevels.forEach(level => {
                                            if (JSON.stringify(level.competenceId) === JSON.stringify(score.competence)) {
                                                level.level = new_avg_level;
                                            }
                                            console.log('level: ', level);
                                            aux_overallLevels.push(level);
                                            //console.log('aux_overallLevels: ', aux_overallLevels);
                                            if (--taskToGo === 0) {
                                                onComplete(aux_overallLevels);
                                            }
                                        };
                                    }
                                    
                                    //console.log("overallLevels: ", overallLevels);
                                });
                            });
                        
                        } else {
                            var new_overall_level = {
                                level: score.proficiencyLevel.level,
                                competenceId: score.competence,
                                competenceName: score.competenceName,
                                descriptor: score.proficiencyLevel.descriptor
                            };
                            student.overallLevels.push(new_overall_level);
                            Student.findOneAndUpdate({_id:student._id}, {$set: {"overallLevels":student.overallLevels}}, {new:true}, function(err, updated_student) {
                                console.log('UPDATED STD: ', updated_student);
                            })
                        }
                    }
                }
            });

            
        }
    });
}


/*exports.create_assessment = function (req, res) {
    var new_assessment = new Assessment(req.body);
    Student.findOne({ _id: new_assessment.student }, function (err, student) {
        if (err) {
            res.status(500).send(err = 'Students error');
        } else {
            var assessment_scores = new_assessment.scores;
            //PARA 1 ALUMNO
            console.log("SCORES: ",assessment_scores);
            assessment_scores.forEach(score => {
                update_overall_level(student, score);
            });
            
            new_assessment.save(function (err, assessment) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(assessment);
                }
            });
        }
        if(!student) {
            console.log('No HAY')
        }
    });
};

var update_overall_level = function (student, score) {
    console.log("student: ", student);
    var currentLevel = student.overallLevels.find(x => x.competence_id === score.competence_id);
    
    if (currentLevel) {
        var stored_scores = [];
        stored_scores.push(score.proficiencyLevel.level);
        Assessment.find({student: JSON.stringify(student._id)}, function(err, studentAssessments) {
            console.log("student._id", student._id);
            console.log("stringify student._id", JSON.stringify(student._id));
            console.log("studentAssessments: ", studentAssessments);
            studentAssessments.forEach(assessment_score => {
                if (assessment_score.competence === competence_id) {
                    stored_scores.push(assessment_score.proficiencyLevel.level);
                }
            });
            console.log("stored_scores: ", stored_scores);
            const new_avg_level = calculate_average(stored_scores);
            console.log("LEVEL: ", new_avg_level);
            Student.findOneAndUpdate({_id:student._id, function(err, studentBD) {
                var overallLevels = studentBD.overallLevels;
                console.log('overallLevels; ', overallLevels);
                overallLevels.forEach(level => {
                    console.log('LEVEL: ', level);
                    if (level.competenceId === score.competence_id) {
                        level.level = new_avg_level;
                    }
                })
                Student.findOneAndUpdate({_id:studentBD._id}, {$set: {"overallLevels":overallLevels}}, {new:true}, function(err, updated_student) {
                    console.log('UPDATED');
                })
            }});
        });
    
    } else {
        var new_overall_level = {
            level: score.proficiencyLevel.level,
            competenceId: score.competence,
            competenceName: score.competenceName,
            descriptor: score.proficiencyLevel.descriptor
        };
        student.overallLevels.push(new_overall_level);
        Student.findOneAndUpdate({_id:student._id}, {$set: {"overallLevels":student.overallLevels}}, {new:true}, function(err, updated_student) {
            console.log('UPDATED STD: ', updated_student);
        })
    }
}
*/
var calculate_average = function (grades) {
    console.log("GRADES: ", grades);
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