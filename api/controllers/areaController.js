'use strict';
var mongoose = require('mongoose');
var Area = mongoose.model('Areas');

exports.get_all_areas = function (req, res) {
    Area.find({}, function (err, areas) {
        if (err) {
            res.send(err);
        } else {
            res.json(areas);
        }
    });
};

exports.create_area = function (req, res) {
    var new_area = new Area(req.body);

    new_area.save(function (err, area) {
        if (err) {
            if (err.code === 11000) {
                res.status(409);
            } else {
                res.status(500);
            }
            res.send(err);
        } else {
            res.json(area);
        }
    });
};

exports.update_area = function (req, res) {
    Area.findById(req.params.idArea, function (err, area) {
        if (err) {
            if (err.name == 'ValidationError') {
                res.status(422).send(err);
            }
            else {
                res.status(500).send(err);
            }
        }
        else {
            Area.findOneAndUpdate({ _id: req.params.idArea }, req.body, { new: true }, function (err, area) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(area);
                }
            });
        }
    });
};

exports.delete_area = function (req, res) {
    Area.findById(req.params.idArea, function (err, area) {
        if (!area) {
            res.status(404).json({
                message: 'Area does not exist'
            });
        } else {
            Area.deleteOne({
                _id: req.params.idArea
            }, function (err, area) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        message: 'Area successfully deleted'
                    });
                }
            });
        }
    });
};