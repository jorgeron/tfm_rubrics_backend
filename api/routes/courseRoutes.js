'use strict';
module.exports = function (app) {
    var courseController = require('../controllers/courseController');

    app.route('/v1/courses')
        .get(courseController.get_my_courses);
};