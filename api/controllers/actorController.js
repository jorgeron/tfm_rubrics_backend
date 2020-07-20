'use strict';
var mongoose = require('mongoose');
var Actor = mongoose.model('Actors');

exports.list_all_actors = function (req, res) {
    Actor.find({}, function (err, actors) {
        if (err) {
            res.send(err);
        } else {
            res.json(actors);
        }
    });
};

exports.create_an_actor = function (req, res) {
    var new_actor = new Actor(req.body);

    new_actor.save(function (err, actor) {
        if (err) {
            if (err.code === 11000) {
                res.status(409);
            } else {
                res.status(500);
            }
            res.send(err);
        } else {
            res.json(actor);
        }
    });
};


exports.read_an_actor = function (req, res) {
    // TODO
};

exports.update_an_actor = function (req, res) {
    // TODO
};

exports.delete_an_actor = function (req, res) {
    // TODO
};
