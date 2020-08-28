'use strict';
var mongoose = require('mongoose');
var Course = mongoose.model('Courses');
var Actor = mongoose.model('Actors');
var googleApi = require('../../classroom-api');

exports.get_my_courses = async function (req, res) {
    var tokens = JSON.parse(req.headers.tokens)[0];
    
    const authenticatedUserEmail = await googleApi.getCurrentUserEmail(tokens);
    console.log('email: ', authenticatedUserEmail);
    Actor.findOne({ email: authenticatedUserEmail }, function (err, actor) {
        if (actor) {
            const teacher_id = actor._id;
            googleApi.getCourses(tokens).then(classroom_courses => {

                var courses = [];
                var onComplete = function() {
                    res.json(courses);
                };

                var taskToGo = classroom_courses.length;
                if (taskToGo === 0) {
                    onComplete();
                } else {
                    classroom_courses.forEach(function(classroom_course) {
                        Course.findById(classroom_course.id, function (err, course) {
                            if (!course) {
                                var new_course = Course({
                                    _id: classroom_course.id,
                                    name: classroom_course.name,
                                    description: classroom_course.description,
                                    room: classroom_course.room,
                                    teacher: teacher_id
                                });
    
                                new_course.save(function (err, created_course) {
                                    if (!err) {
                                        console.log('Course created successfully');
                                        courses.push(created_course);
                                    } else {
                                        console.log(err);
                                    }
                                })
                            } else {
                                courses.push(course);
                            }
                            
                            if (--taskToGo === 0) {
                                onComplete();
                            }
                            
                        });
                    });
                }

            }).catch(function (err) {
                res.send(err);
            });
        } else {
            res.send(err);
        }
    })

}

/*async function makeListOfCourses(classroom_courses) {
    let result = [];
    var promises = classroom_courses.map( async function (classroom_course) {
        await Course.findById(classroom_course.id, function (err, course) {
            if (course) {
                result.push(course);
                console.log('aqui result:', result);
            } else {
                var new_course = Course({
                    _id: classroom_course.id,
                    name: classroom_course.name,
                    description: classroom_course.description,
                    room: classroom_course.room,
                    teacher: teacher_id
                });

                new_course.save(function (err, created_course) {
                    if (!err) {
                        console.log('Course created successfully');
                        result.push(created_course);
                    } else {
                        console.log(err);
                    }
                })
            }
            
        });
    });

    Promise.all(promises).then(function () {
        console.log('result: ', result);
        return result;
    });
}*/