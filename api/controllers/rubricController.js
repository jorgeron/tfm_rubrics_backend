'use strict';
var mongoose = require('mongoose');
var Rubric = mongoose.model('Rubrics');
var Competences = mongoose.model('Competences');

exports.list_all_rubrics_by_teacher = function (req, res) {
    Rubric.find({teacher: req.params.actorId}, function (err, rubrics) {
        if (err) {
            res.send(err);
        } else {
            res.json(rubrics);
        }
    });
};

exports.get_all_rubrics = function (req, res) {
    Rubric.find({}, function (err, rubrics) {
        if (err) {
            res.send(err);
        } else {
            res.json(rubrics);
        }
    });
};


exports.create_rubric = function (req, res) {
    var new_rubric = new Rubric(req.body);

    Competences.find({ _id: new_rubric.competences }, function (err, competences) {
        if (err) {
            res.status(500).send(err = 'Competences error');
        } else {
            new_rubric.competences = competences;
            new_rubric.save(function (err, rubric) {
                if (err) {
                    if (err.code === 11000) {
                        res.status(409);
                    } else {
                        res.status(500);
                    }
                    res.send(err);
                } else {
                    res.json(rubric);
                }
            });
        }
    });
};

exports.update_rubric = function (req, res) {
    Rubric.findById(req.params.idRubric, function (err, rubric) {
        if (err) {
            if (err.name == 'ValidationError') {
                res.status(422).send(err);
            }
            else {
                res.status(500).send(err);
            }
        }
        else {
            Rubric.findOneAndUpdate({ _id: req.params.idRubric }, req.body, { new: true }, function (err, rubric) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(rubric);
                }
            });
        }
    });
};

exports.delete_rubric = function (req, res) {
    Rubric.findById(req.params.idRubric, function (err, rubric) {
        if (!rubric) {
            res.status(404).json({
                message: 'Rubric does not exist'
            });
        } else {
            Rubric.deleteOne({
                _id: req.params.idRubric
            }, function (err, rubric) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        message: 'Rubric successfully deleted'
                    });
                }
            });
        }
    });
};