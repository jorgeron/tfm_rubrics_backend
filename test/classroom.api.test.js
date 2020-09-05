const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const classroom_api = require("../classroom-api");
const assert = require('assert')

const { expect } = chai;
//chai.use(chaiHttp);
describe("Classroom Integration Tests", () => {
  /*let tokens = [{"access_token":"ya29.a0AfH6SMCgnP-8yltNIXqPmQH2oV1XPImlfIIYi-5E3ty5UfcREUNqhRwCqQz5SQUYqlMCPwsV6xWEr8nsVSW_VIOJ5cUR4665GfvO_GnDULGb6ld4JgiQeGOVH1SDsHR741mESpcGx9itSPHNWUuTPw-t5W8WgZGB1ZI",
  "refresh_token":"1//03kDjQK9n7vUoCgYIARAAGAMSNwF-L9IriWQmLemA-xz385iBVsvS_5Ad-Ney9899RmGj3hf1Fav9-6h_Jjev5oA9C9WfN9l8ZdU",
  "scope":"https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.student-submissions.students.readonly https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email",
  "token_type":"Bearer",
  "id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJjNDk1MzBlMWZmOTA4M2RkNWVlYWEwNmJlMmNlNDM3ZjQ5YzkwNWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0NzEyMDc3OTY4NTAtZ3ZkN3U4bWk2YmI2b2N1bmUzZm5mNGk2bW9pdmY1ZDQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0NzEyMDc3OTY4NTAtZ3ZkN3U4bWk2YmI2b2N1bmUzZm5mNGk2bW9pdmY1ZDQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYxMzkxMDUwMzMxMTY5NjExNDEiLCJoZCI6ImZ1bmRhY2lvbnNhZmEuZXMiLCJlbWFpbCI6Impyb25jZWxAZnVuZGFjaW9uc2FmYS5lcyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoidFFRdnRNbEpXTHVpQVRMX0g4dE9ZZyIsIm5hbWUiOiJKb3JnZSBSb25jZWwgQ2FtZXJvIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqclRrd0VBX0NTbmR5YVdVYnVwWUlaMUVDbF9uRnNOSEtCRXhBaj1zOTYtYyIsImdpdmVuX25hbWUiOiJKb3JnZSIsImZhbWlseV9uYW1lIjoiUm9uY2VsIENhbWVybyIsImxvY2FsZSI6ImVzIiwiaWF0IjoxNTk4OTcxNzg2LCJleHAiOjE1OTg5NzUzODZ9.dEs49DjxK-xYgHqhvZCFbmDXkp7bXMO6MZleMuhjHVZgehw2-QFfH18ab4I6lfhQSLGLIloRq4V35-i1gaxi04lzkTJa9_WRmJVP1bn77hGqluvUP-AsZRph8dc-wve3NqzWWUMyk20UoqFd76xytZWnMoNfn_F5n891FMIoCd3C6OXolIFFZv0SV46ygIv9ldeDy-Ty5GlysLx6VisNoWoCv06zeGDh6ibQ2DjkINn54vBh3AhyUMajULTRBKeuS3N43Ev7JFzjuiryCuLmkH0VaFUo-lGKi5nV-qltrt98UDLVdFlc7Ca1yhMFtRosbssUD5qP9RxvRW48SDu0ZQ",
  "expiry_date":1598975385327}];*/

  /*before((done) => {
    let auth_code = '';
    let tokens;
    // Autenticación con Oauth2
    chai
    .request(app)
    .get('/v1/google-login')
    .end((err, res) => {
    if(err) {
        done(err);
    } else {
        auth_code = res.body.url;
        console.log("auth_code: ", auth_code)
        chai
        .request(app)
        .get('/v1/google-login?code=4/3wEpI8wcNgNtvP95woHsgmtYKVEsBa-6XsfA0ry2uSGGh8CR5vs6QxTwBrayUukNW-ZYpwEzqvqNNPIhIEfcjpE&scope=email%20profile%20https://www.googleapis.com/auth/classroom.student-submissions.students.readonly%20https://www.googleapis.com/auth/classroom.profile.emails%20https://www.googleapis.com/auth/classroom.profile.photos%20https://www.googleapis.com/auth/classroom.rosters.readonly%20https://www.googleapis.com/auth/classroom.courses.readonly%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email%20openid&authuser=1&hd=fundacionsafa.es&prompt=consent&access_type=offline')
        .end((err, res) => {
        if(err) {
            done(err);
        } else {
            console.log("AQUI: ", res)
            tokens = res.body.tokens;
            console.log("tokens: ", tokens)
            done();
        }
        })

        done();
    }
    })

    

  });
  
  it('should return 2 courses', function(done){
    classroom_api.getCourses(tokens,
        function(courses){
            assert.isNotEmpty(courses.length);
            done();
        })
    
});
*/

});