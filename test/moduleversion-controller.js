const { expect, assert } = require('chai');
const sinon = require('sinon');
const ModuleVersionServices = require('../services/moduleversionservices');
const ModuleVersionController = require('../controllers/moduleversioncontroller');

describe('ModuleVersion controller', function () {
    describe('#createModuleVersion function', function () {
        beforeEach(function () {
            sinon.stub(ModuleVersionServices, 'createModuleVersion');
        })

        afterEach(function () {
            ModuleVersionServices.createModuleVersion.restore();
        });

        it('should call next(error) if moduleId is not specified', function (done) {
            const req = {
                body: {
                    version: '1.0.0'
                }
            };
            ModuleVersionController.createModuleVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('createModuleVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) if version is not specified', function (done) {
            const req = {
                body: {
                    moduleId: 'module1'
                }
            };
            ModuleVersionController.createModuleVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('createModuleVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should return an object if module creation succeed', function (done) {
            const req = {
                body: {
                    moduleId: 'moduleId',
                    version: '1.0.0'
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

            ModuleVersionServices.createModuleVersion.returns(new Promise((resolve, reject) => {
                resolve({ moduleId: 'abcd', name: 'module1' });
            }));

            ModuleVersionController.createModuleVersion(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Module version created');
                    expect(res.jsonObject.data).to.have.property('moduleId', 'abcd');
                    expect(res.jsonObject.data).to.have.property('name', 'module1');
                    done();
                })
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    moduleId: 'moduleId',
                    version: '1.0.0'
                }
            }

            ModuleVersionServices.createModuleVersion.returns(new Promise((resolve, reject) => {
                reject(new Error('module Service error'));
            }));

            ModuleVersionController.createModuleVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('createModuleVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    moduleId: 'moduleId',
                    version: '1.0.0'
                }
            }

            ModuleVersionServices.createModuleVersion.returns(new Promise((resolve, reject) => {
                const error = new Error('moduleVersion Service error');
                error.statusCode = 400;
                reject(error);
            }));
            ModuleVersionController.createModuleVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('createModuleVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });
    });

    describe('#deleteModuleVersion function', function () {
        beforeEach(function () {
            sinon.stub(ModuleVersionServices, 'deleteModuleVersion');
        });

        afterEach(function () {
            ModuleVersionServices.deleteModuleVersion.restore();
        })

        it('should call next(error) if moduleVersionId is not specified', function (done) {
            const req = {
                body: {}
            };
            ModuleVersionController.deleteModuleVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('deleteModuleVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should return an object if moduleVersion deletion succeed', function (done) {
            const req = {
                body: { moduleVersionId: 'abcd' }
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

            ModuleVersionServices.deleteModuleVersion.returns(new Promise((resolve, reject) => {
                resolve({ moduleVersionId: 'abcd', name: 'modulename', version: '1.0.0' });
            }));

            ModuleVersionController.deleteModuleVersion(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Module version deleted');
                    expect(res.jsonObject.data).to.have.property('moduleVersionId', 'abcd');
                    expect(res.jsonObject.data).to.have.property('name', 'modulename');
                    expect(res.jsonObject.data).to.have.property('version', '1.0.0');
                    done();
                })
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: { moduleVersionId: 'abcd' }
            }

            ModuleVersionServices.deleteModuleVersion.returns(new Promise((resolve, reject) => {
                reject(new Error('module Service error'));
            }));

            ModuleVersionController.deleteModuleVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('deleteModuleVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: { moduleVersionId: 'abcd' }
            }

            ModuleVersionServices.deleteModuleVersion.returns(new Promise((resolve, reject) => {
                const error = new Error('module Service error');
                error.statusCode = 400;
                reject(error);
            }));
            ModuleVersionController.deleteModuleVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('deleteModuleVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });
    });

    describe('#updateModuleVersionInformations', function () {
        beforeEach(function () {
            sinon.stub(ModuleVersionServices, 'updateModuleVersionInformations');
        });

        afterEach(function () {
            ModuleVersionServices.updateModuleVersionInformations.restore();
        });

        it('should call next(error) if no moduleVersionId specified', function (done) {
            const req = {
                body: {
                    location: 'location',
                    informations: 'informations'
                }
            }
            ModuleVersionController.updateModuleVersionInformations(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('updateModuleVersionInformations Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should return an object if update succeed', function (done) {
            const req = {
                body: {
                    moduleVersionId: 'abc',
                    location: 'location',
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
            ModuleVersionServices.updateModuleVersionInformations.returns(new Promise((resolve, reject) => {
                resolve({ moduleVersionId: 'moduleVersionId', informations: 'informations', location: 'location', moduleId: 'moduleId' });
            }));

            ModuleVersionController.updateModuleVersionInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Module version updated');
                expect(res.jsonObject.data).to.have.property('moduleVersionId', 'moduleVersionId');
                expect(res.jsonObject.data).to.have.property('informations', 'informations');
                expect(res.jsonObject.data).to.have.property('location', 'location');
                expect(res.jsonObject.data).to.have.property('moduleId', 'moduleId');
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    moduleVersionId: 'abc',
                    location: 'location',
                    informations: 'informations'
                }
            }

            ModuleVersionServices.updateModuleVersionInformations.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            ModuleVersionController.updateModuleVersionInformations(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('updateModuleVersionInformations Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    moduleVersionId: 'abc',
                    location: 'location',
                    informations: 'informations'
                }
            }
            ModuleVersionServices.updateModuleVersionInformations.returns(new Promise((resolve, reject) => {
                const error = new Error('Undefined Error');
                error.statusCode = 400;
                throw error;
            }));
            ModuleVersionController.updateModuleVersionInformations(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('updateModuleVersionInformations Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

    });

    describe('#getModuleVersion function', function () {
        beforeEach(function () {
            sinon.stub(ModuleVersionServices, 'getModuleVersion');
        });

        afterEach(function () {
            ModuleVersionServices.getModuleVersion.restore();
        });

        it('should call next(error) if no moduleVersionId specified', function (done) {
            const req = {
                body: {
                }
            }
            ModuleVersionController.getModuleVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getModuleVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should return an object if request succeed', function (done) {
            const req = {
                body: {
                    moduleVersionId: 'abc',
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
            ModuleVersionServices.getModuleVersion.returns(new Promise((resolve, reject) => {
                resolve({ moduleVersionId: 'abc' });
            }));

            ModuleVersionController.getModuleVersion(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('moduleVersionId', 'abc');
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    moduleVersionId: 'abc',
                }
            }
            ModuleVersionServices.getModuleVersion.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            ModuleVersionController.getModuleVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('getModuleVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    moduleVersionId: 'abc',
                }
            }
            ModuleVersionServices.getModuleVersion.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            ModuleVersionController.getModuleVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getModuleVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });
    });

    describe("#getModuleVersions function", function () {
        beforeEach(function () {
            sinon.stub(ModuleVersionServices, 'getModuleVersions');
        });

        afterEach(function () {
            ModuleVersionServices.getModuleVersions.restore();
        });

        it('should call next(error) if no moduleId specified', function (done) {
            const req = {
                body: {
                    page: 1,
                    perPage: 20
                }
            }
            ModuleVersionController.getModuleVersions(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getModuleVersions Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(error) if no page specified', function (done) {
            const req = {
                body: {
                    moduleId: 'toolId',
                    perPage: 20
                }
            }
            ModuleVersionController.getModuleVersions(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getModuleVersions Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(error) if no perPage specified', function (done) {
            const req = {
                body: {
                    moduleId: 'toolId',
                    page: 1
                }
            }
            ModuleVersionController.getModuleVersions(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getModuleVersions Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });


        it('should return an array if request succeed', function (done) {
            const req = {
                body: {
                    moduleId: 'toolId',
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
            ModuleVersionServices.getModuleVersions.returns(new Promise((resolve, reject) => {
                resolve([
                    { moduleVersionId: 'module1' },
                    { moduleVersionId: 'module2' },
                    { moduleVersionId: 'module3' },
                ]);
            }));

            ModuleVersionController.getModuleVersions(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.lengthOf(3);
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    moduleId: 'toolId',
                    page: 1,
                    perPage: 10
                }
            }
            ModuleVersionServices.getModuleVersions.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            ModuleVersionController.getModuleVersions(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('getModuleVersions Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    moduleId: 'toolId',
                    page: 1,
                    perPage: 10
                }
            }
            ModuleVersionServices.getModuleVersions.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            ModuleVersionController.getModuleVersions(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getModuleVersions Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

    });
});