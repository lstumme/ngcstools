const { expect, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const ToolController = require('../controllers/toolcontroller');
const ToolServices = require('../services/toolservices');
const Tool = require('../model/tool');

describe('Tool integration', function () {
    describe('#createTool', function (done) {
        let tool;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = await ToolServices.createTool({ name: 'tool1' });
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if tool creation succeed', function (done) {
            const req = {
                body: {
                    name: 'tool2',
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

            ToolController.createTool(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Tool created');
                    expect(res.jsonObject.data).to.have.property('name', 'tool2');

                    Tool.findOne({ name: 'tool2' })
                        .then(tool => {
                            done();
                        });
                })
                .catch(err => {
                    console.log(err);
                })
        });
    });

    describe('#deleteTool', function (done) {
        let tool;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = await ToolServices.createTool({ name: 'tool1' });
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if tool deletion succeed', function (done) {
            const req = {
                body: { toolId: tool.toolId }
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

            ToolController.deleteTool(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Tool deleted');
                    expect(res.jsonObject.data).to.have.property('toolId', tool.toolId);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail(err.toString());
                });
        });
    });

    describe('#updateToolInformation', function (done) {
        let tool;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = await ToolServices.createTool({ name: 'tool1' });
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if update succeed', function (done) {
            const req = {
                body: {
                    toolId: tool.toolId,
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

            ToolController.updateToolInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Tool updated');
                expect(res.jsonObject.data).to.have.property('toolId', tool.toolId);
                expect(res.jsonObject.data).to.have.property('vendor', 'vendor');
                expect(res.jsonObject.data).to.have.property('informations', 'informations');
                done();
            })
                .catch(err => {
                    console.log(err);
                })
        });
    });
});
