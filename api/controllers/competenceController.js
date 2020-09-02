'use strict';
var mongoose = require('mongoose');
var Competence = mongoose.model('Competences');
var Areas = mongoose.model('Areas');

exports.list_competences_by_area = function (req, res) {
    Competence.find({area_id: req.params.idArea}, function (err, competences) {
        if (err) {
            res.send(err);
        } else {
            res.json(competences);
        }
    });
};

exports.list_all_competences = function (req, res) {
    Competence.find({}, function (err, competences) {
        if (err) {
            res.send(err);
        } else {
            res.json(competences);
        }
    });
};

exports.create_competence = function (req, res) {
    Areas.findById(req.params.idArea, function (err, area) {
        if (err) {
            res.status(500).send(err='Area not found');
        } else {
            var new_competence = new Competence(req.body);
            new_competence.area_id = req.params.idArea;
            new_competence.area = area;

            new_competence.save(function (err, competence) {
                if (err) {
                    if (err.code === 11000) {
                        res.status(409);
                    } else {
                        res.status(500);
                    }
                    res.send(err);
                } else {
                    res.json(competence);
                }
            });
        }
    })

};

exports.update_a_competence = function (req, res) {
    Competence.findById(req.params.competenceId, function (err, competence) {
        if (err) {
            if (err.name == 'ValidationError') {
                res.status(422).send(err);
            }
            else {
                res.status(500).send(err);
            }
        }
        else {
            Competence.findOneAndUpdate({ _id: req.params.competenceId }, req.body, { new: true }, function (err, competence) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(competence);
                }
            });
        }
    });
};

exports.delete_a_competence = function (req, res) {
    Competence.findById(req.params.competenceId, function (err, competence) {
        if (!competence) {
            res.status(404).json({
                message: 'Competence does not exists'
            });
        } else {
            Competence.deleteOne({
                _id: req.params.competenceId
            }, function (err, competence) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        message: 'Competence successfully deleted'
                    });
                }
            });
        }
    });
};