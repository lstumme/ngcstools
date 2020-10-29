const { expect, assert } = require('chai');
const { ObjectId, ObjectID } = require('mongodb');
const dbHandler = require('./db-handler');
const toolServices = require('../services/toolservices');
const Tool = require('../model/tool');
const ToolVersion = require('../model/toolversion');

describe('Tool Services', function () {
    describe('#createTool function', function () {
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            const tool = new Tool({
                name: 'tool1'
            });
            await tool.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if a tool with given name already exists', function (done) {
            const params = { name: 'tool1' };
            toolServices.createTool(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Tool ${params.name} already exists`);
                    expect(err).to.have.property('statusCode', 409);
                    done();
                })
        });

        it('should create a tool', function (done) {
            const params = { name: 'tool2' };
            toolServices.createTool(params)
                .then(result => {
                    expect(result).to.have.property('message', `Tool created`);
                    expect(result).to.have.property('toolId');
                    Tool.findOne({ 'name': params.name })
                        .then(newTool => {
                            if (!newTool) {
                                assert.fail('Tool not created');
                            }
                            expect(newTool).to.have.property('name', params.name);
                            done();
                        })
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('ToolService Error');
                })
        });

    });

    describe('#deleteTool function', function () {
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
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if tool to delete is not found', function (done) {
            const id = new ObjectId();
            const params = { toolId: id.toString() };
            toolServices.deleteTool(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Could not find tool.`);
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should delete tool if tool exists', function (done) {
            Tool.findOne({ name: 'tool1' })
                .then(tool => {
                    const params = { toolId: tool._id.toString() };
                    toolServices.deleteTool(params)
                        .then(result => {
                            Tool.countDocuments({}, function (err, count) {
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

    describe('#updateToolInformations function', function () {
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
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if tool to update is not found', function (done) {
            const id = new ObjectId();
            const params = { toolId: id.toString() };
            toolServices.updateToolInformations(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Could not find tool.`);
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should update Tool vendor if vendor is provided', function (done) {
            Tool.findOne({ name: 'tool1' })
                .then(tool => {
                    const params = { toolId: tool._id.toString(), vendor: 'Vendor' };
                    toolServices.updateToolInformations(params)
                        .then(result => {
                            Tool.findOne({ name: 'tool1' })
                                .then(newTool => {
                                    expect(newTool).to.have.property('vendor', params.vendor);
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
            Tool.findOne({ name: 'tool1' })
                .then(tool => {
                    const params = { toolId: tool._id.toString(), falseparam: 'falseparam' };
                    toolServices.updateToolInformations(params)
                        .then(result => {
                            Tool.findOne({ name: 'tool1' })
                                .then(newTool => {
                                    expect(newTool).not.to.have.own.property('vendor', params.falseparam);
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

    describe('#getTool function', function () {
        let registeredTool;
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
            registeredTool = await tool.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if Tool not found', function (done) {
            toolServices.getTool({ toolId: ObjectId().toString() })
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', 'Tool not found.');
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should return a tool object if tool found', function (done) {
            toolServices.getTool({ toolId: registeredTool._id.toString() })
                .then(result => {
                    expect(result).to.have.property('_id');
                    expect(result._id.toString()).to.equal(registeredTool._id.toString());
                    expect(result).to.have.property('name', registeredTool.name);
                    done();
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                })
        });

    });

    describe('#getTools function', function () {
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            for (let i = 0; i < 20; i++) {
                const tool = new Tool({
                    name: 'tool' + i,
                });
                await tool.save();
            }
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if range out of bounds', function (done) {
            toolServices.getTools({ page: 3, perPage: 10 })
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
            toolServices.getTools({ page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 2);
                    expect(result).to.have.property('tools').to.have.lengthOf(perPage);
                    for (let i = 0; i < perPage; i++) {
                        expect(result.tools[i]).to.have.property('name', 'tool' + i);
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
            toolServices.getTools({ page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('tools').to.have.lengthOf(perPage);
                    for (let i = 0; i < perPage; i++) {
                        expect(result.tools[i]).to.have.property('name', 'tool' + i);
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

    describe('#createToolVersion function', function () {
        let tool1;
        let tool2;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            let tool = new Tool({
                name: 'tool1'
            });
            await tool.save();
            tool1 = tool;

            tool = new Tool({
                name: 'tool2'
            });
            await tool.save();
            tool2 = tool;

            const toolVersion = new ToolVersion({
                tool: tool1._id,
                version: '1.0.0'
            });
            await toolVersion.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if a toolversion already exists', function (done) {
            const params = { toolId: tool1._id.toString(), version: '1.0.0' };
            toolServices.createToolVersion(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `ToolVersion already exists`);
                    expect(err).to.have.property('statusCode', 409);
                    done();
                })
        });

        it('should throw an error if tool does not exist', function (done) {
            const params = { toolId: new ObjectID()._id.toString(), version: '1.0.0' };
            toolServices.createToolVersion(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Tool not found`);
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should create a toolVersion if no versions for this tool exists', function (done) {
            const params = { toolId: tool2._id, version: '1.0.0' };
            toolServices.createToolVersion(params)
                .then(result => {
                    expect(result).to.have.property('message', `ToolVersion created`);
                    expect(result).to.have.property('toolVersionId');
                    ToolVersion.findOne({ '_id': result.toolVersionId })
                        .then(newTool => {
                            if (!newTool) {
                                assert.fail('Tool not created');
                            }
                            expect(newTool).to.have.property('version', params.version);
                            done();
                        })
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('ToolService Error');
                })
        });
        it('should create a toolVersion if another version for this tool exists', function (done) {
            const params = { toolId: tool1._id, version: '2.0.0' };
            toolServices.createToolVersion(params)
                .then(result => {
                    expect(result).to.have.property('message', `ToolVersion created`);
                    expect(result).to.have.property('toolVersionId');
                    ToolVersion.findOne({ '_id': result.toolVersionId })
                        .then(newTool => {
                            if (!newTool) {
                                assert.fail('Tool not created');
                            }
                            expect(newTool).to.have.property('version', params.version);
                            expect(newTool.tool.toString()).to.eql(tool1._id.toString());
                            done();
                        })
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('ToolService Error');
                })
        });


    });
    describe('#deleteToolVersion function', function () {

    });
    describe('#getToolVersion function', function () {

    });
    describe('#getToolVersions function', function () {

    });

});
