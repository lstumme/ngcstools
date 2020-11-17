const { expect } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const ToolVersionController = require('../controllers/toolversioncontroller');
const ToolServices = require('../services/toolservices');
const ToolVersion = require('../model/toolversion');

describe('Tool version integration', function() {
    describe('#createToolVersion', function (done) {
        let tool;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = await ToolServices.createTool({name: 'tool1'});
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if tool version creation succeed', function (done) {
            const req = {
                body: {
                    toolId: tool.toolId,
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

            ToolVersionController.createToolVersion(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Tool version created');
                    expect(res.jsonObject.data).to.haveOwnProperty('toolVersionId');
                    expect(res.jsonObject.data).to.have.property('toolId', tool.toolId);
                    expect(res.jsonObject.data).to.have.property('version', '1.0.0');
                    done();
                })
        });


    });

    describe('#deleteToolVersion', function (done) {
        let toolVersion;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = await ToolServices.createTool({name: 'tool1'});

            toolVersion = new ToolVersion({
                toolId: tool.toolId,
                version: '1.0.0'
            });
            toolVersion = await toolVersion.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if toolVersion deletion succeed', function (done) {
            const req = {
                body: { toolVersionId: toolVersion._id.toString() }
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

            ToolVersionController.deleteToolVersion(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Tool version deleted');
                    expect(res.jsonObject.data).to.have.property('toolVersionId', toolVersion._id.toString());
                    done();
                })
        });
    });

    describe('#updateToolVersionInformations', function (done) {
        let toolVersion;
        let tool;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = await ToolServices.createTool({name: 'tool1'});

            toolVersion = new ToolVersion({
                toolId: tool.toolId,
                version: '1.0.0'
            });
            toolVersion = await toolVersion.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if update succeed', function (done) {
            const req = {
                body: {
                    toolVersionId: toolVersion._id.toString(),
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

            ToolVersionController.updateToolVersionInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Tool version updated');
                expect(res.jsonObject.data).to.have.property('toolVersionId', toolVersion._id.toString());
                expect(res.jsonObject.data).to.have.property('informations', 'informations');
                expect(res.jsonObject.data).to.have.property('location', 'location');
                expect(res.jsonObject.data).to.have.property('toolId', tool.toolId);
                done();
            });
        });
    });
});