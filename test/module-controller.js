const { expect, assert } = require('chai');
const sinon = require('sinon');
const ModuleController = require('../controllers/modulecontroller');
const ModuleServices = require('../services/moduleservices');


describe('Module Controller', function () {
    describe('#createModule function', function () {
        beforeEach(function () {
            sinon.stub(ModuleServices, 'createModule');
        })

        afterEach(function () {
            ModuleServices.createModule.restore();
        });

        it('should call next(error) if name is not specified', function (done) {
            const req = {
                body: { toolId: 'toolId' }
            };
            ModuleController.createModule(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('createModule Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(error) if toolId is not specified', function (done) {
            const req = {
                body: { name: 'module1' }
            };
            ModuleController.createModule(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('createModule Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
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

            ModuleServices.createModule.returns(new Promise((resolve, reject) => {
                resolve({ moduleId: 'abcd', name: 'module1' });
            }));

            ModuleController.createModule(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Module created');
                    expect(res.jsonObject.data).to.have.property('moduleId', 'abcd');
                    expect(res.jsonObject.data).to.have.property('name', 'module1');
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

            ModuleServices.createModule.returns(new Promise((resolve, reject) => {
                reject(new Error('module Service error'));
            }));

            ModuleController.createModule(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('createModule Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    name: 'module1',
                    toolId: 'toolId'
                }
            }

            ModuleServices.createModule.returns(new Promise((resolve, reject) => {
                const error = new Error('module Service error');
                error.statusCode = 400;
                reject(error);
            }));
            ModuleController.createModule(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('createModule Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });
    });

    describe('#deleteModule function', function () {
        beforeEach(function () {
            sinon.stub(ModuleServices, 'deleteModule');
        });

        afterEach(function () {
            ModuleServices.deleteModule.restore();
        })

        it('should call next(error) if moduleId is not specified', function (done) {
            const req = {
                body: {}
            };
            ModuleController.deleteModule(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('deleteModule Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
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

            ModuleServices.deleteModule.returns(new Promise((resolve, reject) => {
                resolve({ moduleId: 'abcd', name: 'modulename', vendor: 'vendor' });
            }));

            ModuleController.deleteModule(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Module deleted');
                    expect(res.jsonObject.data).to.have.property('moduleId', 'abcd');
                    expect(res.jsonObject.data).to.have.property('name', 'modulename');
                    expect(res.jsonObject.data).to.have.property('vendor', 'vendor');
                    done();
                })

        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: { moduleId: 'abcd' }
            }

            ModuleServices.deleteModule.returns(new Promise((resolve, reject) => {
                reject(new Error('module Service error'));
            }));

            ModuleController.deleteModule(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('deleteModule Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: { moduleId: 'abcd' }
            }

            ModuleServices.deleteModule.returns(new Promise((resolve, reject) => {
                const error = new Error('module Service error');
                error.statusCode = 400;
                reject(error);
            }));
            ModuleController.deleteModule(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('deleteModule Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });


    });

    describe('#updateModuleInformations function', function () {
        beforeEach(function () {
            sinon.stub(ModuleServices, 'updateModuleInformations');
        });

        afterEach(function () {
            ModuleServices.updateModuleInformations.restore();
        });

        it('should call next(error) if no moduleId specified', function (done) {
            const req = {
                body: {
                    vendor: 'vendor',
                }
            }
            ModuleController.updateModuleInformations(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('updateModuleInformations Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should return an object if update succeed', function (done) {
            const req = {
                body: {
                    moduleId: 'abc',
                    vendor: 'vendor',
                    informations: 'informations'
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
            ModuleServices.updateModuleInformations.returns(new Promise((resolve, reject) => {
                resolve({ moduleId: 'abc' });
            }));

            ModuleController.updateModuleInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Module updated');
                expect(res.jsonObject.data).to.have.property('moduleId', 'abc');
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
            ModuleServices.updateModuleInformations.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            ModuleController.updateModuleInformations(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('updateModuleInformations Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    moduleId: 'abc',
                    vendor: 'vendor',
                }
            }
            ModuleServices.updateModuleInformations.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            ModuleController.updateModuleInformations(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('updateModuleInformations Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

    });

    describe('#getModule function', function () {
        beforeEach(function () {
            sinon.stub(ModuleServices, 'getModule');
        });

        afterEach(function () {
            ModuleServices.getModule.restore();
        });

        it('should call next(error) if no moduleId specified', function (done) {
            const req = {
                body: {
                }
            }
            ModuleController.getModule(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getModule Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
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
            ModuleServices.getModule.returns(new Promise((resolve, reject) => {
                resolve({ moduleId: 'abc' });
            }));

            ModuleController.getModule(req, res, () => { }).then(result => {
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
            ModuleServices.getModule.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            ModuleController.getModule(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('getModule Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })

        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    moduleId: 'abc',
                }
            }
            ModuleServices.getModule.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            ModuleController.getModule(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getModule Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })

        });
    });

    describe("#getModules function", function () {
        beforeEach(function () {
            sinon.stub(ModuleServices, 'getModules');
        });

        afterEach(function () {
            ModuleServices.getModules.restore();
        });

        it('should call next(err) if no toolId specified', function (done) {
            const req = {
                body: {
                    page: 1,
                    perPage: 20
                }
            }
            ModuleController.getModules(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getModules Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })

        });

        it('should call next(error) if no page specified', function (done) {
            const req = {
                body: {
                    toolId: 'toolId',
                    perPage: 20
                }
            }
            ModuleController.getModules(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getModules Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(error) if no perPage specified', function (done) {
            const req = {
                body: {
                    toolId: 'toolId',
                    page: 1
                }
            }
            ModuleController.getModules(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getModules Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });


        it('should return an array if request succeed', function (done) {
            const req = {
                body: {
                    toolId: 'toolId',
                    page: 1,
                    perPage: 10
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
            ModuleServices.getModules.returns(new Promise((resolve, reject) => {
                resolve([
                    { moduleId: 'module1' },
                    { moduleId: 'module2' },
                    { moduleId: 'module3' },
                ]);
            }));

            ModuleController.getModules(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.lengthOf(3);
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    toolId: 'toolId',
                    page: 1,
                    perPage: 10
                }
            }
            ModuleServices.getModules.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            ModuleController.getModules(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('getModules Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    toolId: 'toolId',
                    page: 1,
                    perPage: 10
                }
            }
            ModuleServices.getModules.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            ModuleController.getModules(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getModules Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

    });
});