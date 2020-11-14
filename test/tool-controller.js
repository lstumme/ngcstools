const { expect, assert } = require('chai');
const sinon = require('sinon');
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

        it('should call next(error) if name is not specified', function (done) {
            const req = {
                body: {}
            };
            toolController.createTool(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('createTool Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
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
                    expect(res.jsonObject).to.have.property('message', 'Tool created');
                    expect(res.jsonObject.data).to.have.property('toolId', 'abcd');
                    expect(res.jsonObject.data).to.have.property('name', 'tool1');
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

            toolController.createTool(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('createTool Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
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
            toolController.createTool(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('createTool Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });
    });

    describe('#deleteTool function', function () {
        beforeEach(function () {
            sinon.stub(toolServices, 'deleteTool');
        });

        afterEach(function () {
            toolServices.deleteTool.restore();
        })

        it('should call next(error) if toolId is not specified', function (done) {
            const req = {
                body: {}
            };
            toolController.deleteTool(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('deleteTool Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should return an object if tool deletion succeed', function (done) {
            const req = {
                body: { toolId: 'abcd' }
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

            toolServices.deleteTool.returns(new Promise((resolve, reject) => {
                resolve({ toolId: 'abcd', name: 'toolname', vendor: 'vendor' });
            }));

            toolController.deleteTool(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Tool deleted');
                    expect(res.jsonObject.data).to.have.property('toolId', 'abcd');
                    expect(res.jsonObject.data).to.have.property('name', 'toolname');
                    expect(res.jsonObject.data).to.have.property('vendor', 'vendor');
                    done();
                })

        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: { toolId: 'abcd' }
            }

            toolServices.deleteTool.returns(new Promise((resolve, reject) => {
                reject(new Error('tool Service error'));
            }));

            toolController.deleteTool(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('deleteTool Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: { toolId: 'abcd' }
            }

            toolServices.deleteTool.returns(new Promise((resolve, reject) => {
                const error = new Error('tool Service error');
                error.statusCode = 400;
                reject(error);
            }));
            toolController.deleteTool(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('deleteTool Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });


    });

    describe('#updateToolInformations function', function () {
        beforeEach(function () {
            sinon.stub(toolServices, 'updateToolInformations');
        });

        afterEach(function () {
            toolServices.updateToolInformations.restore();
        });

        it('should call next(error) if no toolId specified', function (done) {
            const req = {
                body: {
                    vendor: 'vendor',
                }
            }
            toolController.updateToolInformations(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('updateToolInformations Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should return an object if update succeed', function (done) {
            const req = {
                body: {
                    toolId: 'abc',
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
            toolServices.updateToolInformations.returns(new Promise((resolve, reject) => {
                resolve({ toolId: 'abc' });
            }));

            toolController.updateToolInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Tool updated');
                expect(res.jsonObject.data).to.have.property('toolId', 'abc');
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    toolId: 'abc',
                    vendor: 'vendor',
                }
            }
            toolServices.updateToolInformations.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            toolController.updateToolInformations(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('updateToolInformations Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    toolId: 'abc',
                    vendor: 'vendor',
                }
            }
            toolServices.updateToolInformations.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            toolController.updateToolInformations(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('updateToolInformations Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

    });

    describe("#getTool function", function () {
        beforeEach(function () {
            sinon.stub(toolServices, 'getTool');
        });

        afterEach(function () {
            toolServices.getTool.restore();
        });

        it('should call next(error) if no toolId specified', function (done) {
            const req = {
                body: {
                }
            }
            toolController.getTool(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getTool Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should return an object if request succeed', function (done) {
            const req = {
                body: {
                    toolId: 'abc',
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
            toolServices.getTool.returns(new Promise((resolve, reject) => {
                resolve({ toolId: 'abc' });
            }));

            toolController.getTool(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('toolId', 'abc');
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    toolId: 'abc',
                }
            }
            toolServices.getTool.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            toolController.getTool(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('getTool Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    toolId: 'abc',
                }
            }
            toolServices.getTool.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            toolController.getTool(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getTool Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });
    });

    describe("#getTools function", function () {
        beforeEach(function () {
            sinon.stub(toolServices, 'getTools');
        });

        afterEach(function () {
            toolServices.getTools.restore();
        });

        it('should call next(error) if no page specified', function (done) {
            const req = {
                body: {
                    perPage: 20
                }
            }
            toolController.getTools(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getTools Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(error) if no perPage specified', function (done) {
            const req = {
                body: {
                    page: 1
                }
            }
            toolController.getTools(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getTools Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });


        it('should return an array if request succeed', function (done) {
            const req = {
                body: {
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
            toolServices.getTools.returns(new Promise((resolve, reject) => {
                resolve([
                    { toolId: 'tool1' },
                    { toolId: 'tool2' },
                    { toolId: 'tool3' },
                ]);
            }));

            toolController.getTools(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.lengthOf(3);
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    page: 1,
                    perPage: 10
                }
            }
            toolServices.getTools.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            toolController.getTools(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 500);
                done();
            })
                .then(response => {
                    assert.fail('getTools Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    page: 1,
                    perPage: 10
                }
            }
            toolServices.getTools.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            toolController.getTools(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 400);
                done();
            })
                .then(response => {
                    assert.fail('getTools Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

    });

    describe('#createToolVersion function', function () {
        beforeEach(function () {
            sinon.stub(toolServices, 'createToolVersion');
        })

        afterEach(function () {
            toolServices.createToolVersion.restore();
        });

        it('should call next(error) if toolId is not specified', function (done) {
            const req = {
                body: { version: '1.0.0' }
            };
            toolController.createToolVersion(req, {}, (err) => {
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
            toolController.createToolVersion(req, {}, (err) => {
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

            toolServices.createToolVersion.returns(new Promise((resolve, reject) => {
                resolve({ toolVersionId: 'abcd', toolId: 'toolId', version: 'version' });
            }));

            toolController.createToolVersion(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Tool version created');
                    expect(res.jsonObject.data).to.have.property('toolVersionId', 'abcd');
                    expect(res.jsonObject.data).to.have.property('toolId', 'toolId');
                    expect(res.jsonObject.data).to.have.property('version', 'version');
                    done();
                })
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    toolId: 'toolId',
                    version: '1.0.0'
                }
            }

            toolServices.createToolVersion.returns(new Promise((resolve, reject) => {
                reject(new Error('tool Service error'));
            }));

            toolController.createToolVersion(req, {}, (err) => {
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

            toolServices.createToolVersion.returns(new Promise((resolve, reject) => {
                const error = new Error('tool Service error');
                error.statusCode = 400;
                reject(error);
            }));
            toolController.createToolVersion(req, {}, (err) => {
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
            sinon.stub(toolServices, 'deleteToolVersion');
        });

        afterEach(function () {
            toolServices.deleteToolVersion.restore();
        })

        it('should call next(error) if toolVersionId is not specified', function (done) {
            const req = {
                body: {}
            };
            toolController.deleteToolVersion(req, {}, (err) => {
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

            toolServices.deleteToolVersion.returns(new Promise((resolve, reject) => {
                resolve({ toolVersionId: 'abcd' });
            }));

            toolController.deleteToolVersion(req, res, () => { })
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

            toolServices.deleteToolVersion.returns(new Promise((resolve, reject) => {
                reject(new Error('tool Service error'));
            }));

            toolController.deleteToolVersion(req, {}, (err) => {
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

            toolServices.deleteToolVersion.returns(new Promise((resolve, reject) => {
                const error = new Error('tool Service error');
                error.statusCode = 400;
                reject(error);
            }));
            toolController.deleteToolVersion(req, {}, (err) => {
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
            sinon.stub(toolServices, 'updateToolVersionInformations');
        });

        afterEach(function () {
            toolServices.updateToolVersionInformations.restore();
        });

        it('should call next(error) if no toolVersionId specified', function (done) {
            const req = {
                body: {
                    location: 'location',
                }
            }
            toolController.updateToolVersionInformations(req, {}, (err) => {
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
            toolServices.updateToolVersionInformations.returns(new Promise((resolve, reject) => {
                resolve({ toolVersionId: 'abc' });
            }));

            toolController.updateToolVersionInformations(req, res, () => { }).then(result => {
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
            toolServices.updateToolVersionInformations.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            toolController.updateToolVersionInformations(req, {}, (err) => {
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
            toolServices.updateToolVersionInformations.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            toolController.updateToolVersionInformations(req, {}, (err) => {
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
            sinon.stub(toolServices, 'getToolVersion');
        });

        afterEach(function () {
            toolServices.getToolVersion.restore();
        });

        it('should call next(error) if no toolVersionId specified', function (done) {
            const req = {
                body: {
                }
            }
            toolController.getToolVersion(req, {}, (err) => {
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
            toolServices.getToolVersion.returns(new Promise((resolve, reject) => {
                resolve({ toolVersionId: 'abc' });
            }));

            toolController.getToolVersion(req, res, () => { }).then(result => {
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
            toolServices.getToolVersion.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            toolController.getToolVersion(req, {}, (err) => {
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
            toolServices.getToolVersion.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            toolController.getToolVersion(req, {}, (err) => {
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
            sinon.stub(toolServices, 'getToolVersions');
        });

        afterEach(function () {
            toolServices.getToolVersions.restore();
        });

        it('should call next(error) if no toolId specified', function (done) {
            const req = {
                body: {
                    page: 1,
                    perPage: 20
                }
            }
            toolController.getToolVersions(req, {}, (err) => {
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
            toolController.getToolVersions(req, {}, (err) => {
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
            toolController.getToolVersions(req, {}, (err) => {
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
            toolServices.getToolVersions.returns(new Promise((resolve, reject) => {
                resolve([
                    { toolVersion: 'toolVersion1' },
                    { toolVersion: 'toolVersion2' },
                    { toolVersion: 'toolVersion3' },
                ]);
            }));

            toolController.getToolVersions(req, res, () => { }).then(result => {
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
            toolServices.getToolVersions.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            toolController.getToolVersions(req, {}, (err) => {
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
            toolServices.getToolVersions.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            toolController.getToolVersions(req, {}, (err) => {
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
