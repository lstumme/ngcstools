const { expect, assert } = require('chai');
const sinon = require('sinon');
const dbHandler = require('./db-handler');
const toolController = require('../controllers/toolcontroller');
const toolServices = require('../services/toolservices');


describe('Tool Controller', function () {
    describe('#createTool function', function () {
        beforeEach(function () {
            sinon.stub(toolServices, 'createTool');
        })

        afterEach(function () {
            toolServices.createTool.restore();
        });

        it('should throw an Error if name is not specified', function (done) {
            const req = {
                body: {}
            };
            toolController.createTool(req, {}, () => { })
                .then(response => {
                    assert.fail('createTool Error');
                })
                .catch(err => {
                    expect(err).to.have.property('statusCode', 400);
                    done();
                })
        });

        it('should return an object if tool creation succeed', function (done) {
            const req = {
                body: { name: 'tool1' }
            }
            const res = {
                statusCode: 0,
                jsonObject: {},
                status: function (code) {
                    this.statusCode = code;
                    return this;
                },
                json: function (value) {
                    this.jsonObject = value;
                    return this;
                }
            };

            toolServices.createTool.returns(new Promise((resolve, reject) => {
                resolve({ toolId: 'abcd', name: 'tool1' });
            }));

            toolController.createTool(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('toolId', 'abcd');
                    expect(res.jsonObject).to.have.property('name', 'tool1');
                    done();
                })
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: { name: 'tool1' }
            }

            toolServices.createTool.returns(new Promise((resolve, reject) => {
                reject(new Error('tool Service error'));
            }));

            let error = null;
            const next = (err) => {
                error = err;
            };
            toolController.createTool(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: { name: 'tool1' }
            }

            toolServices.createTool.returns(new Promise((resolve, reject) => {
                const error = new Error('tool Service error');
                error.statusCode = 400;
                reject(error);
            }));
            let error = null;
            const next = (err) => {
                error = err;
            }
            toolController.createTool(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });
    });

    describe('#deleteTool function', function () {

    });
    describe('#updateToolInformations function', function () {

    });
    describe('#getTool function', function () {

    });
    describe('#getTools function', function () {

    });
    describe('#createToolVersion function', function () {

    });
    describe('#deleteToolVersion function', function () {

    });
    describe('#getToolVersion function', function () {

    });
    describe('#getToolVersions function', function () {

    });

});
