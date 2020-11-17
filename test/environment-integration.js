const { expect, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const environmentController = require('../controllers/environmentcontroller');
const ToolServices = require('../services/toolservices');
const EnvironmentServices = require('../services/environmentservices');

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

                    EnvironmentServices.findEnvironment({ name: 'environment1' })
                        .then(environment => {
                            expect(res.jsonObject.data).to.have.property('environmentId', environment.environmentId);
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
            const tool = await ToolServices.createTool({
                name: 'tool1',
            });

            environment = await EnvironmentServices.createEnvironment({
                name: 'environment1',
                toolId: tool.toolId
            })
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if environment deletion succeed', function (done) {
            const req = {
                body: { environmentId: environment.environmentId }
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
                    expect(res.jsonObject.data).to.have.property('environmentId', environment.environmentId);
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
            environment = await EnvironmentServices.createEnvironment({
                name: 'environment1',
            })
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if update succeed', function (done) {
            const req = {
                body: {
                    environmentId: environment.environmentId,
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
                expect(res.jsonObject.data).to.have.property('environmentId', environment.environmentId);
                expect(res.jsonObject.data).to.have.property('name', environment.name);
                expect(res.jsonObject.data).to.have.property('informations', 'informations');
                done();
            })
            .catch(err=> {
                console.log(err);
            })
        });

    });
});
