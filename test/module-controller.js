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

    describe('#deleteModule function', function () {
        beforeEach(function () {
            sinon.stub(moduleServices, 'deleteModule');
        });

        afterEach(function () {
            moduleServices.deleteModule.restore();
        })

        it('should throw an Error if moduleId is not specified', function (done) {
            const req = {
                body: {}
            };
            moduleController.deleteModule(req, {}, () => { })
                .then(response => {
                    assert.fail('deleteModule Error');
                })
                .catch(err => {
                    expect(err).to.have.property('statusCode', 400);
                    done();
                })

        });

        it('should return an object if module deletion succeed', function (done) {
            const req = {
                body: { moduleId: 'abcd' }
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

            moduleServices.deleteModule.returns(new Promise((resolve, reject) => {
                resolve({ moduleId: 'abcd', name: 'modulename', vendor: 'vendor' });
            }));

            moduleController.deleteModule(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('moduleId', 'abcd');
                    expect(res.jsonObject).to.have.property('name', 'modulename');
                    expect(res.jsonObject).to.have.property('vendor', 'vendor');
                    done();
                })

        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: { moduleId: 'abcd' }
            }

            moduleServices.deleteModule.returns(new Promise((resolve, reject) => {
                reject(new Error('module Service error'));
            }));

            let error = null;
            const next = (err) => {
                error = err;
            };
            moduleController.deleteModule(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: { moduleId: 'abcd' }
            }

            moduleServices.deleteModule.returns(new Promise((resolve, reject) => {
                const error = new Error('module Service error');
                error.statusCode = 400;
                reject(error);
            }));
            let error = null;
            const next = (err) => {
                error = err;
            }
            moduleController.deleteModule(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });


    });

    describe('#updateModuleInformations function', function () {
        beforeEach(function () {
            sinon.stub(moduleServices, 'updateModuleInformations');
        });

        afterEach(function () {
            moduleServices.updateModuleInformations.restore();
        });

        it('should throw an error if no moduleId specified', function (done) {
            const req = {
                body: {
                    vendor: 'vendor',
                }
            }
            moduleController.updateModuleInformations(req, {}, () => { })
                .then(response => {
                    assert.fail('deleteModule error');
                    done();
                })
                .catch(err => {
                    expect(err).to.have.property('statusCode', 400);
                    done();
                });
        });

        it('should return an object if update succeed', function (done) {
            const req = {
                body: {
                    moduleId: 'abc',
                    vendor: 'vendor',
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
            moduleServices.updateModuleInformations.returns(new Promise((resolve, reject) => {
                resolve({ moduleId: 'abc' });
            }));

            moduleController.updateModuleInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('moduleId', 'abc');
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    moduleId: 'abc',
                    vendor: 'vendor',
                }
            }
            moduleServices.updateModuleInformations.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            let error = null;
            const next = (err) => {
                error = err;
            };
            moduleController.updateModuleInformations(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    moduleId: 'abc',
                    vendor: 'vendor',
                }
            }
            moduleServices.updateModuleInformations.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            let error = null;
            const next = (err) => {
                error = err;
            }
            moduleController.updateModuleInformations(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });

    });
    describe("#getModule function", function () {
        beforeEach(function () {
            sinon.stub(moduleServices, 'getModule');
        });

        afterEach(function () {
            moduleServices.getModule.restore();
        });

        it('should throw an error if no moduleId specified', function (done) {
            const req = {
                body: {
                }
            }
            moduleController.getModule(req, {}, () => { })
                .then(response => {
                    assert.fail('Test process Error');
                    done();
                })
                .catch(err => {
                    expect(err).to.have.property('statusCode', 400);
                    done();
                });
        });

        it('should return an object if request succeed', function (done) {
            const req = {
                body: {
                    moduleId: 'abc',
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
            moduleServices.getModule.returns(new Promise((resolve, reject) => {
                resolve({ moduleId: 'abc' });
            }));

            moduleController.getModule(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('moduleId', 'abc');
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    moduleId: 'abc',
                }
            }
            moduleServices.getModule.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            let error = null;
            const next = (err) => {
                error = err;
            };
            moduleController.getModule(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    moduleId: 'abc',
                }
            }
            moduleServices.getModule.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            let error = null;
            const next = (err) => {
                error = err;
            }
            moduleController.getModule(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });
    });

});