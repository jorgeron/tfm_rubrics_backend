var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Actor = require('./api/models/actorModel'),
    Area = require('./api/models/areaModel'),
    Assessment = require('./api/models/assessmentModel'),
    Competence = require('./api/models/competenceModel'),
    Rubric = require('./api/models/rubricModel');


var mongoDBURI = process.env.MONGO_DB_URI || "mongodb+srv://admin:rXiTW4Zx4dEJs8K@cluster0.krayx.mongodb.net/tfm_rubrics?retryWrites=true&w=majority";
console.log("Trying to connect DB to: " + mongoDBURI);
mongoose.connect(mongoDBURI, {
    poolSize: 10, // Up to 10 sockets
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // skip trying IPv6
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
console.log("DB connection successfully");


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.json({ status: "success", message: "Welcome To Testing API" });
});


var routesActor = require('./api/routes/actorRoutes');
var routesArea = require('./api/routes/areaRoutes');
var routesAssessment = require('./api/routes/assessmentRoutes');
var routesCompetence = require('./api/routes/competenceRoutes');
var routesRubric = require('./api/routes/rubricRoutes');

routesActor(app);
routesArea(app);
routesAssessment(app);
routesCompetence(app);
routesRubric(app);

app.listen(port, () => console.log('Example app listening on port ' + port))

module.exports = app;