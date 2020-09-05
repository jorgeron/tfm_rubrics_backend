const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Area Tests", () => {
  let test_area_id = '';
  
  it("GET ALL Areas Test", done => {
    chai
      .request(app)
      .get("/v1/areas/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).not.to.be.empty;
        if (err) done(err);
        else done();
      });
  });

  it("POST Area Test", done => {
    chai
      .request(app)
      .post("/v1/areas/")
      .send({
        "name": "areaTest",
        "colorCode": "colorCodeTest"
      })
      .end((err, res) => {
        expect(err).to.be.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        test_area_id = res.body._id;

        if (err) done(err);
        else done();
      });
  });


  it("UPDATE Area recently created", done => {
    chai
      .request(app)
      .put("/v1/areas/" + test_area_id)
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
      .delete("/v1/areas/" + test_area_id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        if (err) done(err);
        else done();
      });
  });

});