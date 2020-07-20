'use strict';
module.exports = function (app) {
    var areaController = require('../controllers/areaController');
    var competenceController = require('../controllers/competenceController');
    // var authController = require('../controllers/authController');

    /**
     * Get Areas
     *    RequiredRoles: None
     * Post Area: create area
     *    RequiredRoles: Administrator
       *
       * @section area
       * @type get post
       * @url /v1/areas
     * @param {string} role (administrator) 
    */
    app.route('/v1/areas')
        .get(areaController.get_all_areas)
        .post(areaController.create_area);


    /**
    * Put area
    *    RequiredRoles: Administrator
    * 
    * Delete area
    *    RequiredRoles: Administrator
    *
    * @section area
    * @type put delete
    * @url /v1/areas/:idArea
    * @param {string} role (administrator) 
    */
    app.route('/v1/areas/:idArea')
        .put(areaController.update_area)
        .delete(areaController.delete_area);


    /**
     * 
     * Get area's competences
     *  RequiredRoles: none
     * 
    * Create Competence
    *    RequiredRoles: Administrator
    *
    * @section area
    * @type get post
    * @url /v1/areas/:idArea/competence
    * @param {string} role (administrator) 
    */
    app.route('/v1/areas/:idArea/competences')
        .get(competenceController.list_competences_by_area)
        .post(competenceController.create_competence);

};