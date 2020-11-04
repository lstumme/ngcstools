const { expect, assert } = require('chai');
const sinon = require('sinon');
const environmentController = require('../controllers/environmentcontroller');
const environmentServices = require('../services/environmentservices');


describe('Environment Controller', function () {
    describe('#createEnvironment function', function () {
        beforeEach(function () {
            sinon.stub(environmentServices, 'createEnvironment');
        })

        afterEach(function () {
            environmentServices.createEnvironment.restore();
        });

        it('should throw an Error if name is not specified', function (done) {
            const req = {
                body: {}
            };
            environmentController.createEnvironment(req, {}, () => { })
                .then(response => {
                    assert.fail('createEnvironment Error');
                })
                .catch(err => {
                    expect(err).to.have.property('statusCode', 400);
                    done();
                })
        });

        it('should return an object if environment creation succeed', function (done) {
            const req = {
                body: { name: 'environment1' }
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

            environmentServices.createEnvironment.returns(new Promise((resolve, reject) => {
                resolve({ environmentId: 'abcd', name: 'environment1' });
            }));

            environmentController.createEnvironment(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Environment created');
                    expect(res.jsonObject.data).to.have.property('environmentId', 'abcd');
                    expect(res.jsonObject.data).to.have.property('name', 'environment1');
                    done();
                })
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: { name: 'environment1' }
            }

            environmentServices.createEnvironment.returns(new Promise((resolve, reject) => {
                reject(new Error('environment Service error'));
            }));

            let error = null;
            const next = (err) => {
                error = err;
            };
            environmentController.createEnvironment(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: { name: 'environment1' }
            }

            environmentServices.createEnvironment.returns(new Promise((resolve, reject) => {
                const error = new Error('environment Service error');
                error.statusCode = 400;
                reject(error);
            }));
            let error = null;
            const next = (err) => {
                error = err;
            }
            environmentController.createEnvironment(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });
    });

    describe('#deleteEnvironment function', function () {
        beforeEach(function () {
            sinon.stub(environmentServices, 'deleteEnvironment');
        });

        afterEach(function () {
            environmentServices.deleteEnvironment.restore();
        })

        it('should throw an Error if environmentId is not specified', function (done) {
            const req = {
                body: {}
            };
            environmentController.deleteEnvironment(req, {}, () => { })
                .then(response => {
                    assert.fail('deleteEnvironment Error');
                })
                .catch(err => {
                    expect(err).to.have.property('statusCode', 400);
                    done();
                })

        });

        it('should return an object if environment deletion succeed', function (done) {
            const req = {
                body: { environmentId: 'abcd' }
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

            environmentServices.deleteEnvironment.returns(new Promise((resolve, reject) => {
                resolve({ environmentId: 'abcd', name: 'environmentname', vendor: 'vendor' });
            }));

            environmentController.deleteEnvironment(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Environment deleted');
                    expect(res.jsonObject.data).to.have.property('environmentId', 'abcd');
                    expect(res.jsonObject.data).to.have.property('name', 'environmentname');
                    expect(res.jsonObject.data).to.have.property('vendor', 'vendor');
                    done();
                })

        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: { environmentId: 'abcd' }
            }

            environmentServices.deleteEnvironment.returns(new Promise((resolve, reject) => {
                reject(new Error('environment Service error'));
            }));

            let error = null;
            const next = (err) => {
                error = err;
            };
            environmentController.deleteEnvironment(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: { environmentId: 'abcd' }
            }

            environmentServices.deleteEnvironment.returns(new Promise((resolve, reject) => {
                const error = new Error('environment Service error');
                error.statusCode = 400;
                reject(error);
            }));
            let error = null;
            const next = (err) => {
                error = err;
            }
            environmentController.deleteEnvironment(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });


    });

    describe('#updateEnvironmentInformations function', function () {
        beforeEach(function () {
            sinon.stub(environmentServices, 'updateEnvironmentInformations');
        });

        afterEach(function () {
            environmentServices.updateEnvironmentInformations.restore();
        });

        it('should throw an error if no environmentId specified', function (done) {
            const req = {
                body: {
                    informations: 'informations',
                }
            }
            environmentController.updateEnvironmentInformations(req, {}, () => { })
                .then(response => {
                    assert.fail('deleteEnvironment error');
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
                    environmentId: 'abc',
                    informations: 'informations',
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
            environmentServices.updateEnvironmentInformations.returns(new Promise((resolve, reject) => {
                resolve({ environmentId: 'abc', information });
            }));

            environmentController.updateEnvironmentInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Environment updated');
                expect(res.jsonObject.data).to.have.property('environmentId', 'abc');
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    environmentId: 'abc',
                    vendor: 'vendor',
                }
            }
            environmentServices.updateEnvironmentInformations.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            let error = null;
            const next = (err) => {
                error = err;
            };
            environmentController.updateEnvironmentInformations(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    environmentId: 'abc',
                    vendor: 'vendor',
                }
            }
            environmentServices.updateEnvironmentInformations.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            let error = null;
            const next = (err) => {
                error = err;
            }
            environmentController.updateEnvironmentInformations(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });

    });

    describe("#getEnvironment function", function () {
        beforeEach(function () {
            sinon.stub(environmentServices, 'getEnvironment');
        });

        afterEach(function () {
            environmentServices.getEnvironment.restore();
        });

        it('should throw an error if no environmentId specified', function (done) {
            const req = {
                body: {
                }
            }
            environmentController.getEnvironment(req, {}, () => { })
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
                    environmentId: 'abc',
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
            environmentServices.getEnvironment.returns(new Promise((resolve, reject) => {
                resolve({ environmentId: 'abc' });
            }));

            environmentController.getEnvironment(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('environmentId', 'abc');
                done();
            });
        });

        it('should call next(err) adding default statusCode if not specified', function (done) {
            const req = {
                body: {
                    environmentId: 'abc',
                }
            }
            environmentServices.getEnvironment.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            let error = null;
            const next = (err) => {
                error = err;
            };
            environmentController.getEnvironment(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 500);
                done();
            });
        });

        it('should call next(err) keeping specified statusCode', function (done) {
            const req = {
                body: {
                    environmentId: 'abc',
                }
            }
            environmentServices.getEnvironment.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            let error = null;
            const next = (err) => {
                error = err;
            }
            environmentController.getEnvironment(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });
    });

    describe("#getEnvironments function", function () {
        beforeEach(function () {
            sinon.stub(environmentServices, 'getEnvironments');
        });

        afterEach(function () {
            environmentServices.getEnvironments.restore();
        });

        it('should throw an error if no page specified', function (done) {
            const req = {
                body: {
                    perPage: 20
                }
            }
            environmentController.getEnvironments(req, {}, () => { })
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
            environmentController.getEnvironments(req, {}, () => { })
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
            environmentServices.getEnvironments.returns(new Promise((resolve, reject) => {
                resolve([
                    { environmentId: 'environment1' },
                    { environmentId: 'environment2' },
                    { environmentId: 'environment3' },
                ]);
            }));

            environmentController.getEnvironments(req, res, () => { }).then(result => {
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
            environmentServices.getEnvironments.returns(new Promise((resolve, reject) => {
                throw new Error('Undefined Error');
            }));
            let error = null;
            const next = (err) => {
                error = err;
            };
            environmentController.getEnvironments(req, {}, next).then(result => {
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
            environmentServices.getEnvironments.returns(new Promise((resolve, reject) => {
                const error = new Error('Udefined Error');
                error.statusCode = 400;
                throw error;
            }));
            let error = null;
            const next = (err) => {
                error = err;
            }
            environmentController.getEnvironments(req, {}, next).then(result => {
                expect(error).to.not.be.null;
                expect(error).to.have.property('statusCode', 400);
                done();
            });
        });

    });
});
