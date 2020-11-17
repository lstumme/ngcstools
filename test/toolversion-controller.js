const { expect, assert } = require('chai');
const sinon = require('sinon');
const ToolVersionController = require('../controllers/toolversioncontroller');
const ToolVersionServices = require('../services/toolversionservices');


describe('ToolVersion Controller', function () {
    describe('#createToolVersion function', function () {
        beforeEach(function () {
            sinon.stub(ToolVersionServices, 'createToolVersion');
        })

        afterEach(function () {
            ToolVersionServices.createToolVersion.restore();
        });

        it('should call next(error) if toolId is not specified', function (done) {
            const req = {
                body: { version: '1.0.0' }
            };
            ToolVersionController.createToolVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('createToolVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(error) if version is not specified', function (done) {
            const req = {
                body: { toolId: 'toolId' }
            };
            ToolVersionController.createToolVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('createToolVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should return an object if tool version creation succeed', function (done) {
            const req = {
                body: {
                    toolId: 'toolId',
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

            ToolVersionServices.createToolVersion.returns(new Promise((resolve, reject) => {
                resolve({ toolVersionId: 'abcd', toolId: 'toolId', version: 'version' });
            }));

            ToolVersionController.createToolVersion(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Tool version created');
                    expect(res.jsonObject.data).to.have.property('toolVersionId', 'abcd');
                    expect(res.jsonObject.data).to.have.property('toolId', 'toolId');
                    expect(res.jsonObject.data).to.have.property('version', 'version');
                    done();
                })
                .catch(err => {
                    console.log(err);
                })
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    toolId: 'toolId',
                    version: '1.0.0'
                }
            }

            ToolVersionServices.createToolVersion.returns(new Promise((resolve, reject) => {
                reject(new Error('tool Service error'));
            }));

            ToolVersionController.createToolVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('createToolVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    toolId: 'toolId',
                    version: '1.0.0'
                }
            }

            ToolVersionServices.createToolVersion.returns(new Promise((resolve, reject) => {
                const error = new Error('tool Service error');
                error.statusCode = 400;
                reject(error);
            }));
            ToolVersionController.createToolVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('createToolVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

    });

    describe('#deleteToolVersion function', function () {
        beforeEach(function () {
            sinon.stub(ToolVersionServices, 'deleteToolVersion');
        });

        afterEach(function () {
            ToolVersionServices.deleteToolVersion.restore();
        })

        it('should call next(error) if toolVersionId is not specified', function (done) {
            const req = {
                body: {}
            };
            ToolVersionController.deleteToolVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('deleteToolVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should return an object if tool version deletion succeed', function (done) {
            const req = {
                body: { toolVersionId: 'abcd' }
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

            ToolVersionServices.deleteToolVersion.returns(new Promise((resolve, reject) => {
                resolve({ toolVersionId: 'abcd' });
            }));

            ToolVersionController.deleteToolVersion(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Tool version deleted');
                    expect(res.jsonObject.data).to.have.property('toolVersionId', 'abcd');
                    done();
                })

        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: { toolVersionId: 'abcd' }
            }

            ToolVersionServices.deleteToolVersion.returns(new Promise((resolve, reject) => {
                reject(new Error('tool Service error'));
            }));

            ToolVersionController.deleteToolVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('deleteToolVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: { toolVersionId: 'abcd' }
            }

            ToolVersionServices.deleteToolVersion.returns(new Promise((resolve, reject) => {
                const error = new Error('tool Service error');
                error.statusCode = 400;
                reject(error);
            }));
            ToolVersionController.deleteToolVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('deleteToolVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });


    });

    describe('#updateToolVersionInformations function', function () {
        beforeEach(function () {
            sinon.stub(ToolVersionServices, 'updateToolVersionInformations');
        });

        afterEach(function () {
            ToolVersionServices.updateToolVersionInformations.restore();
        });

        it('should call next(error) if no toolVersionId specified', function (done) {
            const req = {
                body: {
                    location: 'location',
                }
            }
            ToolVersionController.updateToolVersionInformations(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('updateToolVersionInformations Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should return an object if update succeed', function (done) {
            const req = {
                body: {
                    toolVersionId: 'abc',
                    location: 'vendor',
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
            ToolVersionServices.updateToolVersionInformations.returns(new Promise((resolve, reject) => {
                resolve({ toolVersionId: 'abc' });
            }));

            ToolVersionController.updateToolVersionInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Tool version updated');
                expect(res.jsonObject.data).to.have.property('toolVersionId', 'abc');
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    toolVersionId: 'abc',
                    location: 'vendor',
                }
            }
            ToolVersionServices.updateToolVersionInformations.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            ToolVersionController.updateToolVersionInformations(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('updateToolVersionInformations Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    toolVersionId: 'abc',
                    location: 'vendor',
                }
            }
            ToolVersionServices.updateToolVersionInformations.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            ToolVersionController.updateToolVersionInformations(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('updateToolVersionInformations Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

    });

    describe('#getToolVersion function', function () {
        beforeEach(function () {
            sinon.stub(ToolVersionServices, 'getToolVersion');
        });

        afterEach(function () {
            ToolVersionServices.getToolVersion.restore();
        });

        it('should call next(error) if no toolVersionId specified', function (done) {
            const req = {
                body: {
                }
            }
            ToolVersionController.getToolVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getToolVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should return an object if request succeed', function (done) {
            const req = {
                body: {
                    toolVersionId: 'abc',
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
            ToolVersionServices.getToolVersion.returns(new Promise((resolve, reject) => {
                resolve({ toolVersionId: 'abc' });
            }));

            ToolVersionController.getToolVersion(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('toolVersionId', 'abc');
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    toolVersionId: 'abc',
                }
            }
            ToolVersionServices.getToolVersion.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            ToolVersionController.getToolVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('getToolVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    toolVersionId: 'abc',
                }
            }
            ToolVersionServices.getToolVersion.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            ToolVersionController.getToolVersion(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getToolVersion Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });
    });

    describe('#getToolVersions function', function () {
        beforeEach(function () {
            sinon.stub(ToolVersionServices, 'getToolVersions');
        });

        afterEach(function () {
            ToolVersionServices.getToolVersions.restore();
        });

        it('should call next(error) if no toolId specified', function (done) {
            const req = {
                body: {
                    page: 1,
                    perPage: 20
                }
            }
            ToolVersionController.getToolVersions(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getToolVersions Error');
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
            ToolVersionController.getToolVersions(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getToolVersions Error');
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
            ToolVersionController.getToolVersions(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getToolVersions Error');
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
            ToolVersionServices.getToolVersions.returns(new Promise((resolve, reject) => {
                resolve([
                    { toolVersion: 'toolVersion1' },
                    { toolVersion: 'toolVersion2' },
                    { toolVersion: 'toolVersion3' },
                ]);
            }));

            ToolVersionController.getToolVersions(req, res, () => { }).then(result => {
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
            ToolVersionServices.getToolVersions.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            ToolVersionController.getToolVersions(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('getToolVersions Error');
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
            ToolVersionServices.getToolVersions.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            ToolVersionController.getToolVersions(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getToolVersions Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });
    });
});
