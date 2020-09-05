const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Rubric Tests", () => {
  let teacher_id = '5f3d515365f8a5242ca72427';
  let rubric_id = '';
  
  

  it("POST Rubric Test", done => {
    chai
      .request(app)
      .post("/v1/rubrics/")
      .send({
        "name": "RubricTESTname",
        "description": "descriptionTEST",
        "teacher": teacher_id,
        "competences": [
                "5f2a9ff2254f8f0b64168ac1", "5f2a9ffd254f8f0b64168aca"
        ]
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        rubric_id = res.body._id;

        if (err) done(err);
        else done();
      });
  });


  it("POST Rubric with no Competences Test", done => {
    chai
      .request(app)
      .post("/v1/rubrics/")
      .send({
        "name": "RubricTESTname",
        "description": "descriptionTEST",
        "teacher": teacher_id,
        "competences": []
      })
      .end((err, res) => {
        expect(res).to.have.status(400);

        if (err) done(err);
        else done();
      });
  });

  it("GET Rubrics By Teacher Test", done => {
    chai
      .request(app)
      .get("/v1/actors/"+teacher_id+"/rubrics")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).not.to.be.empty;
        if (err) done(err);
        else done();
      });
  });


  it("GET Rubric recently created", done => {
    chai
      .request(app)
      .get("/v1/rubrics/" + rubric_id)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name').to.be.equal('RubricTESTname');
        expect(res.body).to.have.property('teacher').to.be.equal(teacher_id);

        if (err) done(err);
        else done();
      });
  });


  it("DELETE Rubric Test", done => {
    chai
      .request(app)
      .delete("/v1/rubrics/" + rubric_id)
      .end((err, res) => {
        expect(err).to.be.be.null;
        expect(res).to.have.status(200);
        if (err) done(err);
        else done();
      });
  });

});