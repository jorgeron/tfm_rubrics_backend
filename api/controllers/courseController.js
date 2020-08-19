'use strict';
var mongoose = require('mongoose');
var Course = mongoose.model('Courses');
var Actor = mongoose.model('Actors');
var googleApi = require('../../classroom-api');
const actorRoutes = require('../routes/actorRoutes');

exports.get_my_courses = async function (req, res) {
    var tokens = JSON.parse(req.headers.tokens)[0];
    const authenticatedUserEmail = await googleApi.getCurrentUserEmail(tokens);
    console.log('email: ', authenticatedUserEmail);
    Actor.findOne({ email: authenticatedUserEmail }, function (err, actor) {
        if (actor) {
            const teacher_id = actor._id;

            googleApi.getCourses(tokens).then(classroom_courses => {
                classroom_courses.forEach(classroom_course => {
                    Course.findById(classroom_course.id, function (err, course) {
                        if (!course) {
                            var new_course = Course({
                                _id: classroom_course.id,
                                name: classroom_course.name,
                                description: classroom_course.description,
                                room: classroom_course.room,
                                teacher: teacher_id
                            });

                            console.log('new_course: ', new_course);
                            new_course.save(function (err, created_course) {
                                if (!err) {
                                    console.log('Course created successfully');
                                } else {
                                    console.log(err);
                                }
                            })
                        }
                    });
                });

                res.json(classroom_courses);
            }).catch(function (err) {
                res.send(err);
            });

        } else {
            res.send(err);
        }
    })

}
