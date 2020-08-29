'use strict';
module.exports = function (app) {
    var courseController = require('../controllers/courseController');
    var studentController = require('../controllers/studentController');
    var activityController = require('../controllers/activityController');

    app.route('/v1/courses')
        .get(courseController.get_my_courses);

    app.route('/v1/courses/:idCourse/students')
        .get(studentController.get_students_by_course);

    app.route('/v1/courses/:idCourse/activities')
        .get(activityController.get_activities_by_course);
};