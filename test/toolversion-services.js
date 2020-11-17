const { expect, assert } = require('chai');
const { ObjectId } = require('mongodb');
const { dbHandler } = require('ngcstesthelpers');
const ToolServices = require('../services/toolservices');
const ToolVersionServices = require('../services/toolversionservices');
const ToolVersion = require('../model/toolversion');
describe('ToolVersion services', function () {

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
            tool1 = await ToolServices.createTool({
                name: 'tool1'
            });

            tool2 = await ToolServices.createTool({
                name: 'tool2'
            });

            const toolVersion = new ToolVersion({
                toolId: tool1.toolId,
                version: '1.0.0'
            });
            await toolVersion.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if a toolversion already exists', function (done) {
            const params = { toolId: tool1.toolId, version: '1.0.0' };
            ToolVersionServices.createToolVersion(params)
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
            const params = { toolId: new ObjectId()._id.toString(), version: '1.0.0' };
            ToolVersionServices.createToolVersion(params)
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
            const params = { toolId: tool2.toolId, version: '1.0.0' };
            ToolVersionServices.createToolVersion(params)
                .then(result => {
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
            const params = { toolId: tool1.toolId, version: '2.0.0' };
            ToolVersionServices.createToolVersion(params)
                .then(result => {
                    expect(result).to.have.property('toolVersionId');
                    ToolVersion.findOne({ _id: result.toolVersionId })
                        .then(newTool => {
                            if (!newTool) {
                                assert.fail('Tool not created');
                            }
                            expect(newTool).to.have.property('version', params.version);
                            expect(newTool.toolId.toString()).to.eql(tool1.toolId);
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
        let toolVersion1;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            const tool = await ToolServices.createTool({ name: 'tool1' });
            const toolVersion = new ToolVersion({
                toolId: tool.toolId,
                version: '1.0.0'
            });
            toolVersion1 = await toolVersion.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if toolVersion to delete is not found', function (done) {
            const id = new ObjectId();
            const params = { toolId: id.toString() };
            ToolVersionServices.deleteToolVersion(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Could not find toolVersion.`);
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should delete toolVersion if toolVersion exists', function (done) {
            const params = { toolVersionId: toolVersion1._id.toString() };
            ToolVersionServices.deleteToolVersion(params)
                .then(result => {
                    ToolVersion.countDocuments({}, function (err, count) {
                        if (err) {
                            assert.fail('Database Error');
                        }
                        expect(count).to.equal(0);
                        done();
                    });
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                })
        });
    });

    describe('#updateToolVersionInformations function', function () {
        let toolVersion1;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            const tool = await ToolServices.createTool({ name: 'tool1' });
            const toolVersion = new ToolVersion({
                toolId: tool.toolId,
                version: '1.0.0'
            });
            toolVersion1 = await toolVersion.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if toolVersion to update is not found', function (done) {
            const id = new ObjectId();
            const params = { toolId: id.toString(), location: 'location' };
            ToolVersionServices.updateToolVersionInformations(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Could not find toolVersion.`);
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should update ToolVersion location if location is provided', function (done) {
            const params = { toolVersionId: toolVersion1._id.toString(), location: 'location1' };
            ToolVersionServices.updateToolVersionInformations(params)
                .then(result => {
                    ToolVersion.findOne({ _id: toolVersion1._id.toString() })
                        .then(newToolVersion => {
                            expect(newToolVersion).to.have.property('location', params.location);
                            done();
                        })
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                });
        });

        it('should do nothing if no awaited argument is defined', function (done) {
            const params = { toolVersionId: toolVersion1._id.toString() };
            ToolVersionServices.updateToolVersionInformations(params)
                .then(result => {
                    ToolVersion.findOne({ _id: toolVersion1._id.toString() })
                        .then(newToolVersion => {
                            expect(newToolVersion).to.not.have.own.property('location');
                            done();
                        })
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                });
        });
    });

    describe('#getToolVersion function', function () {
        let toolVersion1, tool1;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool1 = await ToolServices.createTool({ name: 'tool1' });

            toolVersion1 = new ToolVersion({
                toolId: tool1.toolId,
                version: '1.0.0'
            });
            toolVersion1 = await toolVersion1.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if ToolVersion not found', function (done) {
            ToolVersionServices.getToolVersion({ toolVersionId: ObjectId().toString() })
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', 'ToolVersion not found.');
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should return a toolVersion object if toolversion found', function (done) {
            ToolVersionServices.getToolVersion({ toolVersionId: toolVersion1._id.toString() })
                .then(result => {
                    expect(result).to.have.property('toolVersionId', toolVersion1._id.toString());
                    expect(result).to.have.property('toolId', tool1.toolId);
                    expect(result).to.have.property('version', toolVersion1.version);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('Error');
                    done();
                })
        });

    });

    describe('#getToolVersions function', function () {
        let tool1;
        let tool2;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool1 = await ToolServices.createTool({ name: 'tool1' });
            tool2 = await ToolServices.createTool({ name: 'tool2' });

            for (let i = 0; i < 30; i++) {
                if (i % 2 == 0) {
                    const toolVersion = new ToolVersion({
                        toolId: tool1.toolId,
                        version: i + '.0.0'
                    });
                    await toolVersion.save();
                } else {
                    const toolVersion = new ToolVersion({
                        toolId: tool2.toolId,
                        version: i + '.0.0'
                    });
                    await toolVersion.save();
                }
            }

        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if toolId not found', function (done) {
            ToolVersionServices.getToolVersions({ toolId: new ObjectId().toString(), page: 1, perPage: 10 })
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', 'Tool not found');
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should throw an error if range out of bounds', function (done) {
            ToolVersionServices.getToolVersions({ toolId: tool1.toolId, page: 5, perPage: 10 })
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
            const perPage = 5;
            ToolVersionServices.getToolVersions({ toolId: tool1.toolId, page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('toolVersions').to.have.lengthOf(perPage);
                    for (let i = 0; i < perPage; i++) {
                        expect(result.toolVersions[i].toolId).to.equal(tool1.toolId);
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
            const perPage = 10;
            ToolVersionServices.getToolVersions({ toolId: tool1.toolId, page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 2);
                    expect(result).to.have.property('toolVersions').to.have.lengthOf(perPage);
                    for (let i = 0; i < perPage; i++) {
                        expect(result.toolVersions[i].toolId).to.equal(tool1.toolId);
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
