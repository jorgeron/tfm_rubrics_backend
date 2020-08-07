'use strict';
module.exports = function (app) {
    var rubrics = require('../controllers/rubricController');
    var assessments = require('../controllers/assessmentController');
    // var authController = require('../controllers/authController');

    /**
     * Get Rubrics
     *    RequiredRoles: Administrator
     * Post Rubric: create rubric
     *    RequiredRoles: Teacher
       *
       * @section rubrics
       * @type get post
       * @url /v1/rubrics
    */
    app.route('/v1/rubrics')
        .get(rubrics.get_all_rubrics)
        .post(rubrics.create_rubric);


    /**
     * Get rubric
     * RequiredRoles: to be the rubric's owner teacher
    *                   or an Administrator.
    * 
    * Put rubric
    *    RequiredRoles: to be the rubric's owner teacher
    *                   or an Administrator.
    * 
    * Delete rubric
    *    RequiredRoles: to be the rubric's owner teacher
    *                   or an Administrator.
    *
    * @section rubrics
    * @type get put delete
    * @url /v1/rubrics/:idRubric
    */
    app.route('/v1/rubrics/:idRubric')
        .get(rubrics.get_a_rubric)
        .put(rubrics.update_rubric)
        .delete(rubrics.delete_rubric);


    /**
     * 
     * Get rubric's assessments
     *  RequiredRoles: to be the rubric's owner teacher
    *                   or an Administrator.ne
     * 
    * Create Assessment for a rubric
    *    RequiredRoles: to be the rubric's owner teacher
    *
    * @section rubrics
    * @type get post
    * @url /v1/rubrics/:idRubric/assessments
    */
   app.route('/v1/rubrics/:idRubric/assessments')
   .get(assessments.list_assessments_by_rubric)
   .post(assessments.create_assessment);
};
