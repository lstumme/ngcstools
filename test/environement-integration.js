const { expect, assert } = require('chai');
const { dbHandler } = require('ngcshelpers');
const environmentController = require('../controllers/environmentcontroller');
const Tool = require('../model/tool');
const Environment = require('../model/environment');

describe('Environment integration', function () {
    describe('#createEnvironment', function (done) {
        let tool;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if environment creation succeed', function (done) {
            const req = {
                body: {
                    name: 'environment1'
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

            environmentController.createEnvironment(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Environment created');
                    expect(res.jsonObject.data).to.have.property('name', 'environment1');

                    Environment.findOne({ name: 'environment1' })
                        .then(environment => {
                            expect(res.jsonObject.data).to.have.property('environmentId', environment._id.toString());
                            done();
                        });
                })
        });
    });

    describe('#deleteEnvironment', function (done) {
        let environment;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            const tool = new Tool({
                name: 'tool1',
            });
            await tool.save();

            environment = new Environment({
                name: 'environment1',
                toolId: tool._id.toString()
            })
            environment = await environment.save()
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if environment deletion succeed', function (done) {
            const req = {
                body: { environmentId: environment._id.toString() }
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

            environmentController.deleteEnvironment(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Environment deleted');
                    expect(res.jsonObject.data).to.have.property('environmentId', environment._id.toString());
                    done();
                })

        });

    });

    describe('#updateEnvironmentInformations', function (done) {
        let environment;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            const tool = new Tool({
                name: 'tool1',
            });
            await tool.save();

            environment = new Environment({
                name: 'environment1',
            })
            environment = await environment.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if update succeed', function (done) {
            const req = {
                body: {
                    environmentId: environment._id.toString(),
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

            environmentController.updateEnvironmentInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Environment updated');
                expect(res.jsonObject.data).to.have.property('environmentId', environment._id.toString());
                expect(res.jsonObject.data).to.have.property('name', environment.name);
                expect(res.jsonObject.data).to.have.property('informations', 'informations');
                done();
            })
                .catch(err => {
                    console.log(err);
                    assert.fail(err.toString());
                });
        });

    });
});
