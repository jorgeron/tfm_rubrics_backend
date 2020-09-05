const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Actor Tests", () => {
  let test_actor_id = '';
  
  it("GET Actors Test", done => {
    chai
      .request(app)
      .get("/v1/actors/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).not.to.be.empty;
        if (err) done(err);
        else done();
      });
  });

  it("POST Actors Test", done => {
    chai
      .request(app)
      .post("/v1/actors/")
      .send({
        "name": "ActorTESTname",
        "surname": "ActorTESTsurname",
        "email": "actor@testmail.com",
        "role": "TEACHER"
      })
      .end((err, res) => {
        expect(err).to.be.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('role').to.be.equal("TEACHER");
        test_actor_id = res.body._id;

        if (err) done(err);
        else done();
      });
  });



  it("GET Actor recently created", done => {
    chai
      .request(app)
      .get("/v1/actors/" + test_actor_id)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name').to.be.equal('ActorTESTname');
        expect(res.body).to.have.property('email').to.be.equal("actor@testmail.com");

        if (err) done(err);
        else done();
      });
  });


  it("POST Actors Duplicate email", done => {
    chai
      .request(app)
      .post("/v1/actors/")
      .send({
        "name": "actor2name",
        "surname": "actor2surname",
        "email": "actor@testmail.com",
        "role": "TEACHER"
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        if (err) done(err);
        else done();
      });
  });



  it("DELETE Actor Test", done => {
    chai
      .request(app)
      .delete("/v1/actors/" + test_actor_id)
      .end((err, res) => {
        expect(err).to.be.be.null;
        expect(res).to.have.status(200);
        if (err) done(err);
        else done();
      });
  });

  it("GET Actor recently deleted", done => {
    chai
      .request(app)
      .get("/v1/actors/" + test_actor_id)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.lengthOf(0);

        if (err) done(err);
        else done();
      });
  });

});