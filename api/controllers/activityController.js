'use strict';
var mongoose = require('mongoose');
var Activity = mongoose.model('Activities');
var googleApi = require('../../classroom-api');

exports.get_activities_by_course = async function (req, res) {
    var idCourse = req.params.idCourse;
    var tokens = JSON.parse(req.headers.tokens)[0];

    googleApi.getActivitiesByCourse(idCourse, tokens).then(classroom_activities => {

        var activities = [];
        var onComplete = function() {
            res.json(activities);
        };

        var taskToGo = classroom_activities.length;
        if (taskToGo === 0) {
            onComplete();
        } else {
            classroom_activities.forEach(classroom_activity => {
                Activity.findById(classroom_activity.id, function (err, activity) {
                    if (!activity) {
                        var new_activity = Activity({
                            _id: classroom_activity.id,
                            title: classroom_activity.title,
                            course: classroom_activity.courseId
                        });
    
                        console.log('new_activity: ', new_activity);
                        new_activity.save(function (err, created_activity) {
                            if (!err) {
                                console.log('Activity created successfully');
                                activities.push(created_activity);
                            } else {
                                console.log(err);
                            }
                        })
                    } else {
                        activities.push(activity);
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
}