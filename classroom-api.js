const google = require("googleapis").google;

/*******************/
/** CONFIGURATION **/
/*******************/
const googleConfig = {
    client_id: process.env.GOOGLE_CLIENT_ID || '471207796850-gvd7u8mi6bb6ocune3fnf4i6moivf5d4.apps.googleusercontent.com',
    client_secret: process.env.GOOGLE_CLIENT_SECRET || '0p9CossGCJH-2lAxavLSPHjc',
    redirect: 'http://localhost:4200/login',
};

const defaultScope = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/classroom.profile.emails",
    "https://www.googleapis.com/auth/classroom.profile.photos",
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.rosters.readonly",
    "https://www.googleapis.com/auth/classroom.coursework.students.readonly",
];

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.client_id,
        googleConfig.client_secret,
        googleConfig.redirect
    );
}

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
        scope: defaultScope
    });
}

/**
 * Create the google url to be sent to the client.
 */
module.exports.urlGoogle = () => {
    const auth = createConnection(); // this is from previous step
    const url = getConnectionUrl(auth);
    return url;
}

function getGoogleClassroomApi(auth) {
    return google.classroom({ version: 'v1', auth });
}

module.exports.getGoogleAccountFromCode = async (code) => {
    const auth = createConnection();

    // get the auth "tokens" from the request
    const data = await auth.getToken(code);
    const tokens = data.tokens;

    // add the tokens to the google api so we have access to the account
    auth.setCredentials(tokens);

    // connect to google plus - need this to get the user's email
    const classroom = getGoogleClassroomApi(auth);
    const me = await classroom.userProfiles.get({ userId: 'me' });

    // get the google id and email
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emailAddress;
    const userGoogleName = me.data.name.givenName;
    const userGoogleSurname = me.data.name.familyName;
    const userGooglePhoto = me.data.photoUrl;
    // return so we can login or sign up the user
    return {
        id: userGoogleId,
        email: userGoogleEmail,
        name: userGoogleName,
        surname: userGoogleSurname,
        photoUrl: userGooglePhoto,
        tokens: tokens, // you can save these to the user if you ever want to get their details without making them log in again
    };
}

module.exports.getCurrentUserEmail = async (tokens) => {
    const auth = createConnection();
    auth.setCredentials(tokens);

    const classroom = getGoogleClassroomApi(auth);
    const me = await classroom.userProfiles.get({ userId: 'me' });

    return me.data.emailAddress;
}

module.exports.getCourses = async (tokens) => {
    const auth = createConnection();
    auth.setCredentials(tokens);

    const classroom = getGoogleClassroomApi(auth);
    const res = await classroom.courses.list({ teacherId: "me", courseStates: "ACTIVE" });

    return res.data.courses ? [...res.data.courses] : [];
};