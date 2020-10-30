const { expect, assert } = require('chai');
const sinon = require('sinon');
const moduleController = require('../controllers/modulecontroller');
const moduleServices = require('../services/moduleservices');


describe('Module Controller', function () {
    describe('#createModule function', function () {
        beforeEach(function () {
            sinon.stub(moduleServices, 'createModule');
        })

        afterEach(function () {
            moduleServices.createModule.restore();
        });

        it('should throw an Error if name is not specified', function (done) {
            const req = {
                body: { toolId: 'toolId' }
            };
            moduleController.createModule(req, {}, () => { })
                .then(response => {
                    assert.fail('createModule Error');
                })
                .catch(err => {
                    expect(err).to.have.property('statusCode', 400);
                    done();
                })
        });

        it('should throw an Error if toolId is not specified', function (done) {
            const req = {
                body: { name: 'module1' }
            };
            moduleController.createModule(req, {}, () => { })
                .then(response => {
                    assert.fail('createModule Error');
                })
                .catch(err => {
                    expect(err).to.have.property('statusCode', 400);
                    done();
                })
        });

        it('should return an object if module creation succeed', function (done) {
            const req = {
                body: {
                    name: 'module1',
                    toolId: 'toolId'
                }
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

            moduleServices.createModule.returns(new Promise((resolve, reject) => {
                resolve({ moduleId: 'abcd', name: 'module1' });
            }));

            moduleController.createModule(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('moduleId', 'abcd');
                    expect(res.jsonObject).to.have.property('name', 'module1');
                    done();
                })
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    name: 'module1',
                    toolId: 'toolId'
                }
            }

            moduleServices.createModule.returns(new Promise((resolve, reject) => {
                reject(new Error('module Service error'));
            }));

            let error = null;
            const next = (err) => {
                error = err;
            };
            moduleController.createModule(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    name: 'module1',
                    toolId: 'toolId'
                }
            }

            moduleServices.createModule.returns(new Promise((resolve, reject) => {
                const error = new Error('module Service error');
                error.statusCode = 400;
                reject(error);
            }));
            let error = null;
            const next = (err) => {
                error = err;
            }
            moduleController.createModule(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });
    });

});