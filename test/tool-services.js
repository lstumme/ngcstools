const { expect, assert } = require('chai');
const { ObjectId } = require('mongodb');
const dbHandler = require('./db-handler');
const toolServices = require('../services/toolservices');
const Tool = require('../model/tool');

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

    });
    describe('#getTool function', function () {

    });
    describe('#getTools function', function () {

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
