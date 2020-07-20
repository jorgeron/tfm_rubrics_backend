'use strict';
module.exports = function (app) {
    var competenceController = require('../controllers/competenceController');
    // var authController = require('../controllers/authController');


    /**
   * Get an specific competence.
   *    RequiredRoles: none
   * 
   * Modify a competence.
   *    RequiredRoles: Administrator
   * 
   * Delete a competence
   * @section competences
   * @type get put delete
   * @url /v1/competences/:competenceId
  */
    app.route('/v1/competences/:competenceId')
        .get(competenceController.read_a_competence)
        .put(competenceController.update_a_competence)
        .delete(competenceController.delete_a_competence);
};