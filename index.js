var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    admin = require('firebase-admin'),
    serviceAccount = require('./api/keys/tfm-frontend-firebase-adminsdk-6ov10-76e6630874.json'),
    Actor = require('./api/models/actorModel'),
    Area = require('./api/models/areaModel'),
    Assessment = require('./api/models/assessmentModel'),
    Competence = require('./api/models/competenceModel'),
    Rubric = require('./api/models/rubricModel');
    Course = require('./api/models/courseModel');
    const googleApi = require('./classroom-api');

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

// Avoiding CORS errors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, idToken, tokens' //ojo, que si metemos un parametro propio por la cabecera hay que declararlo aquí para que no de el error CORS
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    //res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

app.get("/", (req, res) => {
    res.json({ status: "success", message: "Welcome To Testing API" });
});


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tfm-frontend.firebaseio.com"
});

var routesActor = require('./api/routes/actorRoutes');
var routesArea = require('./api/routes/areaRoutes');
var routesAssessment = require('./api/routes/assessmentRoutes');
var routesCompetence = require('./api/routes/competenceRoutes');
var routesRubric = require('./api/routes/rubricRoutes');
var routesLogin = require('./api/routes/loginRoutes');
var routesCourse = require('./api/routes/courseRoutes');

routesActor(app);
routesArea(app);
routesAssessment(app);
routesCompetence(app);
routesRubric(app);
routesLogin(app);
routesCourse(app)

app.listen(port, () => console.log('Example app listening on port ' + port))

module.exports = app;