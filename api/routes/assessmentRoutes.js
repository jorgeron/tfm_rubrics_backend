'use strict';
module.exports = function (app) {
    var assessments = require('../controllers/assessmentController');
    // var authController = require('../controllers/authController');

    app.route('/v1/assessments')
        .post(assessments.create_an_assessment)

    /**
   * Get an specific assessment.
   *    RequiredRoles: to be the assessment's owner teacher
   *                   or an Administrator.
   * 
   * Modify an assessment.
   *    RequiredRoles: to be the assessment's owner teacher
   * 
   * Delete an assessment
   * @section assessments
   * @type get put delete
   * @url /v1/assessments/:assessmentId
  */
    app.route('/v1/assessments/:assessmentId')
        .get(assessments.read_an_assessment)
        .put(assessments.update_an_assessment)
        .delete(assessments.delete_an_assessment);

};