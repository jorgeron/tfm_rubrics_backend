'use strict';
module.exports = function (app) {
    var actors = require('../controllers/actorController');
    var rubrics = require('../controllers/rubricController');
    // var authController = require('../controllers/authController');

    /**
     * Get all actors
     *    RequiredRoles: None
     * Post an actor: register to the system
     *    RequiredRoles: None
     *
     * @section actors
     * @type get post
     * @url /v1/actors 
     */
    app.route('/v1/actors')
        .get(actors.list_all_actors)
        .post(actors.create_an_actor);


    /**
     * Put an actor
     *    RequiredRoles: to be the proper actor
     * Get an actor
     *    RequiredRoles: to be the proper actor or an Administrator
     * Delete an actor
     *    Not a requirement but for making testing easy
     * 
     * @section actors
     * @type get put
     * @url /v1/actors/:actorId
     * @param {string} actorId
     */
    app.route('/v1/actors/:actorId')
        .get(actors.read_an_actor)
        .put(actors.update_an_actor)
        .delete(actors.delete_an_actor);


    /**
     * Get rubrics owned by a teacher
     *    RequiredRoles: to be the proper Teacher
     *
     * @section actors
     * @type get
     * @url /v1/actors/:actorId/rubrics
     * @param {string} actorId
     */
    app.route('/v1/actors/:actorId/rubrics')
        .get(rubrics.list_all_rubrics_by_teacher);

};