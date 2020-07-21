'use strict';
module.exports = function (app) {
    var competenceController = require('../controllers/competenceController');
    // var authController = require('../controllers/authController');


    /**
   * 
   * Update a competence.
   *    RequiredRoles: Administrator
   * 
   * Delete a competence
   * @section competences
   * @type put delete
   * @url /v1/competences/:competenceId
  */
    app.route('/v1/competences/:competenceId')
        .put(competenceController.update_a_competence)
        .delete(competenceController.delete_a_competence);
};