'use strict';
var mongoose = require('mongoose');
var Actor = mongoose.model('Actors');
var admin = require('firebase-admin');

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
    Actor.findById(req.params.actorId, function (err, actor) {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            if (actor) {
                res.json(actor);
            } else {
                res.status(404);
                res.send([])
            }

        }
    });
};

exports.update_an_actor = function (req, res) {
    // TODO
};

exports.delete_an_actor = function (req, res) {
    Actor.deleteOne({
        _id: req.params.actorId
    }, function (err, actor) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'Actor successfully deleted'
            });
        }
    });
};


exports.login_an_actor = async function (req, res) {
    console.log('starting login an actor');
    var emailParam = req.query.email;
    var password = req.query.password;
    Actor.findOne({
      email: emailParam
    }, function (err, actor) {
      if (err) {
        res.send(err);
      }
  
      // No actor found with that email as username
      else if (!actor) {
        res.status(401); //an access token isn’t provided, or is invalid
        res.json({
          message: 'forbidden',
          error: err
        });
      } else {
        // Make sure the password is correct
        actor.verifyPassword(password, async function (err, isMatch) {
          if (err) {
            res.send(err);
          }
  
          // Password did not match
          else if (!isMatch) {
            //res.send(err);
            res.status(401); //an access token isn’t provided, or is invalid
            res.json({
              message: 'forbidden',
              error: err
            });
          } else {
            try {
              var customToken = await admin.auth().createCustomToken(actor.email);
            } catch (error) {
              console.log("Error creating custom token:", error);
            }
            actor.customToken = customToken;
            console.log('Login Success... sending JSON with custom token');
            res.json(actor);
          }
        });
      }
    });
  };
