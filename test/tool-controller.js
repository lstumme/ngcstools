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
        beforeEach(function () {
            sinon.stub(toolServices, 'deleteTool');
        });

        afterEach(function () {
            toolServices.deleteTool.restore();
        })

        it('should throw an Error if toolId is not specified', function (done) {
            const req = {
                body: {}
            };
            toolController.deleteTool(req, {}, () => { })
                .then(response => {
                    assert.fail('deleteTool Error');
                })
                .catch(err => {
                    expect(err).to.have.property('statusCode', 400);
                    done();
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
                    expect(res.jsonObject).to.have.property('toolId', 'abcd');
                    expect(res.jsonObject).to.have.property('name', 'toolname');
                    expect(res.jsonObject).to.have.property('vendor', 'vendor');
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

            let error = null;
            const next = (err) => {
                error = err;
            };
            toolController.deleteTool(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
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
            let error = null;
            const next = (err) => {
                error = err;
            }
            toolController.deleteTool(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });


    });

    describe('#updateToolInformations function', function () {
        beforeEach(function () {
            sinon.stub(toolServices, 'updateToolInformations');
        });

        afterEach(function () {
            toolServices.updateToolInformations.restore();
        });

        it('should throw an error if no toolId specified', function (done) {
            const req = {
                body: {
                    vendor: 'vendor',
                }
            }
            toolController.updateToolInformations(req, {}, () => { })
                .then(response => {
                    assert.fail('deleteTool error');
                    done();
                })
                .catch(err => {
                    expect(err).to.have.property('statusCode', 400);
                    done();
                });
        });

        it('should throw an error if no vendor parameter specified', function (done) {
            const req = {
                body: {
                    toolId: 'abc'
                }
            }
            toolController.updateToolInformations(req, {}, () => { })
                .then(response => {
                    assert.fail('updateToolInformations error');
                    done();
                })
                .catch(err => {
                    expect(err).to.be.an('error').to.have.property('statusCode', 400);
                    done();
                });
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
                expect(res.jsonObject).to.have.property('toolId', 'abc');
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
            let error = null;
            const next = (err) => {
                error = err;
            };
            toolController.updateToolInformations(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
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
            let error = null;
            const next = (err) => {
                error = err;
            }
            toolController.updateToolInformations(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });

    });

    describe("#getTool function", function () {
        beforeEach(function () {
            sinon.stub(toolServices, 'getTool');
        });

        afterEach(function () {
            toolServices.getTool.restore();
        });

        it('should throw an error if no toolId specified', function (done) {
            const req = {
                body: {
                }
            }
            toolController.getTool(req, {}, () => { })
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
            let error = null;
            const next = (err) => {
                error = err;
            };
            toolController.getTool(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
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
            let error = null;
            const next = (err) => {
                error = err;
            }
            toolController.getTool(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });
    });

    describe("#getTools function", function () {
        beforeEach(function () {
            sinon.stub(toolServices, 'getTools');
        });

        afterEach(function () {
            toolServices.getTools.restore();
        });

        it('should throw an error if no page specified', function (done) {
            const req = {
                body: {
                    perPage: 20
                }
            }
            toolController.getTools(req, {}, () => { })
                .then(response => {
                    assert.fail('Test process Error');
                    done();
                })
                .catch(err => {
                    expect(err).to.have.property('statusCode', 400);
                    done();
                });
        });

        it('should throw an error if no perPage specified', function (done) {
            const req = {
                body: {
                    page: 1
                }
            }
            toolController.getTools(req, {}, () => { })
                .then(response => {
                    assert.fail('Test process Error');
                    done();
                })
                .catch(err => {
                    expect(err).to.have.property('statusCode', 400);
                    done();
                });
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
            let error = null;
            const next = (err) => {
                error = err;
            };
            toolController.getTools(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
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
            let error = null;
            const next = (err) => {
                error = err;
            }
            toolController.getTools(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });

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
