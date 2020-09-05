const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { isValidObjectId } = require("mongoose");

const { expect } = chai;
chai.use(chaiHttp);
describe("Assessments Tests", () => {
  let test_assessment_id = '';
  
/*
  it("POST ASSESSMENT Test", done => {
    chai
      .request(app)
      .post("/v1/assessments/")
      .send({
        "rubric": ObjectId("5f4a8598546c9651b6bb9117"),
        "activity": "112494286810",
        "student": "114903569666992300696",
        "scores": [
            {
                "competence": "5f2a9fad254f8f0b64168aaf",
                "proficiencyLevel": {
                    "level": 7,
                    "descriptor": "testdescriptor"
                }
            },
            {
                "competence": "5f4f4eae148ebf75822c1e99",
                "proficiencyLevel": {
                    "level": 6,
                    "descriptor": "testdescriptor"
                }
            },
        ]
      })
      .end((err, res) => {
        expect(err).to.be.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        test_assessment_id = res.body._id;

        if (err) done(err);
        else done();
      });
  });


  it("UPDATE Area recently created", done => {
    chai
      .request(app)
      .put("/v1/areas/" + test_assessment_id)
      .send({
        "name": "areaTestUPDATED",
        "colorCode": "colorCodeTestUPDATED"
      })
      .end((err, res) => {
        expect(err).to.be.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name').to.be.equal('areaTestUPDATED');
        expect(res.body).to.have.property('colorCode').to.be.equal('colorCodeTestUPDATED');

        if (err) done(err);
        else done();
      });
  });


  it("POST Area without colorCode", done => {
    chai
      .request(app)
      .post("/v1/areas/")
      .send({
        "name": "failArea",
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        if (err) done(err);
        else done();
      });
  });



  it("DELETE Area Test", done => {
    chai
      .request(app)
      .delete("/v1/areas/" + test_assessment_id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        if (err) done(err);
        else done();
      });
  });
*/
});