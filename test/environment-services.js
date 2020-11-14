const { expect, assert } = require('chai');
const { ObjectId } = require('mongodb');
const { dbHandler } = require('ngcstesthelpers');
const environmentServices = require('../services/environmentservices');
const Environment = require('../model/environment');

describe('Environment Services', function () {
    describe('#createEnvironment function', function () {
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            const environment = new Environment({
                name: 'environment1'
            });
            await environment.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if a environment with given name already exists', function (done) {
            const params = { name: 'environment1' };
            environmentServices.createEnvironment(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Environment ${params.name} already exists`);
                    expect(err).to.have.property('statusCode', 409);
                    done();
                })
        });

        it('should create a environment', function (done) {
            const params = { name: 'environment2' };
            environmentServices.createEnvironment(params)
                .then(result => {
                    expect(result).to.have.property('environmentId');
                    Environment.findOne({ 'name': params.name })
                        .then(newEnvironment => {
                            if (!newEnvironment) {
                                assert.fail('Environment not created');
                            }
                            expect(newEnvironment).to.have.property('name', params.name);
                            done();
                        })
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('EnvironmentService Error');
                })
        });

    });

    describe('#deleteEnvironment function', function () {
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            const environment = new Environment({
                name: 'environment1',
            });
            await environment.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if environment to delete is not found', function (done) {
            const id = new ObjectId();
            const params = { environmentId: id.toString() };
            environmentServices.deleteEnvironment(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Could not find environment.`);
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should delete environment if environment exists', function (done) {
            Environment.findOne({ name: 'environment1' })
                .then(environment => {
                    const params = { environmentId: environment._id.toString() };
                    environmentServices.deleteEnvironment(params)
                        .then(result => {
                            Environment.countDocuments({}, function (err, count) {
                                if (err) {
                                    assert.fail('Database Error');
                                }
                                expect(count).to.equal(0);
                                done();
                            });
                        })
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                })
        });
    });

    describe('#updateEnvironmentInformations function', function () {
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            const environment = new Environment({
                name: 'environment1',
            });
            await environment.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if environment to update is not found', function (done) {
            const id = new ObjectId();
            const params = { environmentId: id.toString() };
            environmentServices.updateEnvironmentInformations(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Could not find environment.`);
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should update Environment informations if informations is provided', function (done) {
            Environment.findOne({ name: 'environment1' })
                .then(environment => {
                    const params = { environmentId: environment._id.toString(), informations: 'Informations' };
                    environmentServices.updateEnvironmentInformations(params)
                        .then(result => {
                            Environment.findOne({ name: 'environment1' })
                                .then(newEnvironment => {
                                    expect(newEnvironment).to.have.property('informations', params.informations);
                                    done();
                                })
                        });
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                });
        });

        it('should do nothing if no awaited argument is defined', function (done) {
            Environment.findOne({ name: 'environment1' })
                .then(environment => {
                    const params = { environmentId: environment._id.toString(), falseparam: 'falseparam' };
                    environmentServices.updateEnvironmentInformations(params)
                        .then(result => {
                            Environment.findOne({ name: 'environment1' })
                                .then(newEnvironment => {
                                    expect(newEnvironment).not.to.have.own.property('vendor', params.falseparam);
                                    done();
                                })
                        });
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                });
        });
    });

    describe('#getEnvironment function', function () {
        let registeredEnvironment;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            const environment = new Environment({
                name: 'environment1',
            });
            registeredEnvironment = await environment.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if Environment not found', function (done) {
            environmentServices.getEnvironment({ environmentId: ObjectId().toString() })
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', 'Environment not found.');
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should return a environment object if environment found', function (done) {
            environmentServices.getEnvironment({ environmentId: registeredEnvironment._id.toString() })
                .then(result => {
                    expect(result).to.have.property('_id');
                    expect(result._id.toString()).to.equal(registeredEnvironment._id.toString());
                    expect(result).to.have.property('name', registeredEnvironment.name);
                    done();
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                })
        });

    });

    describe('#getEnvironments function', function () {
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            for (let i = 0; i < 20; i++) {
                const environment = new Environment({
                    name: 'environment' + i,
                });
                await environment.save();
            }
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if range out of bounds', function (done) {
            environmentServices.getEnvironments({ page: 3, perPage: 10 })
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', 'Pagination out of bounds.');
                    expect(err).to.have.property('statusCode', 400);
                    done();
                })
        });

        it('should return an object contianing the required data and the number of pages', function (done) {
            const perPage = 10;
            environmentServices.getEnvironments({ page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 2);
                    expect(result).to.have.property('environments').to.have.lengthOf(perPage);
                    for (let i = 0; i < perPage; i++) {
                        expect(result.environments[i]).to.have.property('name', 'environment' + i);
                    }
                    done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('Error');
                    done();
                })
        });

        it('should return an object contianing the required data and the number of pages 2', function (done) {
            const perPage = 7;
            environmentServices.getEnvironments({ page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('environments').to.have.lengthOf(perPage);
                    for (let i = 0; i < perPage; i++) {
                        expect(result.environments[i]).to.have.property('name', 'environment' + i);
                    }
                    done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('Error');
                    done();
                })
        });

    });
});
