'use strict';
var mongoose = require('mongoose');
var Student = mongoose.model('Students');
var googleApi = require('../../classroom-api');

exports.get_students_by_course = async function (req, res) {
    var idCourse = req.params.idCourse;
    var tokens = JSON.parse(req.headers.tokens)[0];
    var students = [];

    googleApi.getStudentsByCourse(idCourse, tokens).then(classroom_students => {
        classroom_students.forEach(classroom_student => {
            Student.findById(classroom_student.userId, function (err, student) {
                if (!student) {
                    var new_student = Student({
                        _id: classroom_student.userId,
                        name: classroom_student.profile.name.givenName,
                        surname: classroom_student.profile.name.familyName,
                        email: classroom_student.profile.emailAddress,
                        course: classroom_student.courseId
                    });

                    console.log('new_Student: ', new_student);
                    new_student.save(function (err, created_student) {
                        if (!err) {
                            console.log('Student created successfully');
                            students.push(created_student);
                        } else {
                            console.log(err);
                        }
                    })
                } else {
                    students.push(student);
                }
            });
        });

        res.json(students);
    }).catch(function (err) {
        res.send(err);
    });
}