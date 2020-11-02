const { expect, assert } = require('chai');
const { ObjectId, ObjectID } = require('mongodb');
const dbHandler = require('./db-handler');
const moduleServices = require('../services/moduleservices');
const { User } = require('ngcsusers');
const Tool = require('../model/tool');
const ToolVersion = require('../model/toolversion');
const Module = require('../model/module');
const ModuleVersion = require('../model/moduleversion');
const { Group } = require('ngcsgroups');

describe('Module Services', function () {
    describe('#createMOdule function', function () {
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

            const module = new Module({
                name: 'module1',
                tool: tool._id.toString()
            });
            await module.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if a module with given name already exists', function (done) {
            const params = {
                name: 'module1',
                toolId: tool._id.toString()
            };
            moduleServices.createModule(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Module ${params.name} already exists`);
                    expect(err).to.have.property('statusCode', 409);
                    done();
                })
        });

        it('should throw an error if a specified tool does not exist', function (done) {
            const params = {
                name: 'module2',
                toolId: (new ObjectId()).toString()
            };
            moduleServices.createModule(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Specified tool does not exist`);
                    expect(err).to.have.property('statusCode', 409);
                    done();
                })

        })

        it('should create a module', function (done) {
            const params = {
                name: 'module2',
                toolId: tool._id.toString()
            };
            moduleServices.createModule(params)
                .then(result => {
                    expect(result).to.haveOwnProperty('moduleId');
                    expect(result).to.have.property('name', 'module2');
                    expect(result).to.have.property('toolId', tool._id.toString())

                    Module.findOne({ 'name': params.name })
                        .then(newModule => {
                            if (!newModule) {
                                assert.fail('Module not created');
                            }
                            expect(result).to.have.property('moduleId', newModule._id.toString());
                            done();
                        })
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('ModuleService Error');
                })
        });

    });
});
