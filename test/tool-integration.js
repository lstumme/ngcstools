const { expect, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const toolController = require('../controllers/toolcontroller');
const Tool = require('../model/tool');
const ToolVersion = require('../model/toolversion');

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
            tool = new Tool({
                name: 'tool1'
            });
            tool = await tool.save();
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

            toolController.createTool(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Tool created');
                    expect(res.jsonObject.data).to.have.property('name', 'tool2');

                    Tool.findOne({ name: 'tool2' })
                        .then(tool => {
                            done();
                        });
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
            tool = new Tool({
                name: 'tool1',
            });
            tool = await tool.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if tool deletion succeed', function (done) {
            const req = {
                body: { toolId: tool._id.toString() }
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

            toolController.deleteTool(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Tool deleted');
                    expect(res.jsonObject.data).to.have.property('toolId', tool._id.toString());
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
            tool = new Tool({
                name: 'tool1',
            });
            tool = await tool.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if update succeed', function (done) {
            const req = {
                body: {
                    toolId: tool._id.toString(),
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

            toolController.updateToolInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Tool updated');
                expect(res.jsonObject.data).to.have.property('toolId', tool._id.toString());
                expect(res.jsonObject.data).to.have.property('vendor', 'vendor');
                expect(res.jsonObject.data).to.have.property('informations', 'informations');
                done();
            });
        });

    });

    describe('#createToolVersion', function (done) {
        let tool;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = new Tool({
                name: 'tool1'
            });
            tool = await tool.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if tool version creation succeed', function (done) {
            const req = {
                body: {
                    toolId: tool._id.toString(),
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

            toolController.createToolVersion(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Tool version created');
                    expect(res.jsonObject.data).to.haveOwnProperty('toolVersionId');
                    expect(res.jsonObject.data).to.have.property('toolId', tool._id.toString());
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
            tool = new Tool({
                name: 'tool1'
            });
            tool = await tool.save();

            toolVersion = new ToolVersion({
                toolId: tool._id,
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

            toolController.deleteToolVersion(req, res, () => { })
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
            tool = new Tool({
                name: 'tool1'
            });
            tool = await tool.save();

            toolVersion = new ToolVersion({
                toolId: tool._id,
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

            toolController.updateToolVersionInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Tool version updated');
                expect(res.jsonObject.data).to.have.property('toolVersionId', toolVersion._id.toString());
                expect(res.jsonObject.data).to.have.property('informations', 'informations');
                expect(res.jsonObject.data).to.have.property('location', 'location');
                expect(res.jsonObject.data).to.have.property('toolId', tool._id.toString());
                done();
            });
        });


    });
});
