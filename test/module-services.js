const { expect, assert } = require('chai');
const { ObjectId, ObjectID } = require('mongodb');
const dbHandler = require('./db-handler');
const moduleServices = require('../services/moduleservices');
const Tool = require('../model/tool');
const ToolVersion = require('../model/toolversion');
const Module = require('../model/module');
const ModuleVersion = require('../model/moduleversion');
const { Group } = require('ngcsgroups');

describe('Module Services', function () {
    describe('#createModule function', function () {
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

    describe('#deleteModule function', function () {
        let module;
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

            module = new Module({
                name: 'module1',
                tool: tool._id.toString()
            })
            module = await module.save()
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if module to delete is not found', function (done) {
            const id = new ObjectId();
            const params = { moduleId: id.toString() };
            moduleServices.deleteModule(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Could not find module.`);
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should delete module if module exists', function (done) {
            const params = { moduleId: module._id.toString() };
            moduleServices.deleteModule(params)
                .then(result => {
                    Module.countDocuments({}, function (err, count) {
                        if (err) {
                            assert.fail('Database Error');
                        }
                        expect(count).to.equal(0);
                        done();
                    });
                    expect(result).to.have.property('moduleId', module._id.toString());
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('Error');
                    done();
                })
        });
    });

    describe('#updateModuleInformations function', function () {
        let module;
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

            module = new Module({
                name: 'module1',
                tool: tool._id.toString()
            })
            module = await module.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if module to update is not found', function (done) {
            const id = new ObjectId();
            const params = { moduleId: id.toString() };
            moduleServices.updateModuleInformations(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Could not find module.`);
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should update Module vendor if vendor is provided', function (done) {
            const params = { moduleId: module._id.toString(), vendor: 'Vendor' };
            moduleServices.updateModuleInformations(params)
                .then(result => {
                    expect(result).to.have.property('vendor', params.vendor);
                    Module.findOne({ _id: module._id })
                        .then(newModule => {
                            expect(newModule).to.have.property('vendor', params.vendor);
                            done();
                        })
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('Error');
                    done();
                });
        });

        it('should update Module informations if informations is provided', function (done) {
            const params = { moduleId: module._id.toString(), informations: 'informations' };
            moduleServices.updateModuleInformations(params)
                .then(result => {
                    expect(result).to.have.property('informations', params.informations);
                    Module.findOne({ _id: module._id })
                        .then(newModule => {
                            expect(newModule).to.have.property('informations', params.informations);
                            done();
                        })
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                });
        });

        it('should do nothing if no awaited argument is defined', function (done) {
            const params = { moduleId: module._id.toString(), falseparam: 'falseparam' };
            moduleServices.updateModuleInformations(params)
                .then(result => {
                    Module.findOne({ name: 'module1' })
                        .then(newModule => {
                            expect(newModule).not.to.have.own.property('vendor');
                            expect(newModule).not.to.have.own.property('informations');
                            expect(newModule).not.to.haveOwnProperty('falseparam');
                            done();
                        })
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                });
        });
    });

    describe('#getModule function', function () {
        let registeredModule;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            let tool = new Tool({
                name: 'tool1',
            });
            tool = await tool.save();

            registeredModule = new Module({
                name: 'module1',
                tool: tool._id.toString(),
                vendor: 'vendor1',
                informations: 'informations1'
            });
            registeredModule = await registeredModule.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if Module not found', function (done) {
            moduleServices.getModule({ moduleId: ObjectId().toString() })
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', 'Module not found.');
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should return a module object if module found', function (done) {
            moduleServices.getModule({ moduleId: registeredModule._id.toString() })
                .then(result => {
                    expect(result).to.have.property('moduleId', registeredModule._id.toString());
                    expect(result).to.have.property('toolId', registeredModule.tool.toString());
                    expect(result).to.have.property('name', registeredModule.name);
                    expect(result).to.have.property('vendor', registeredModule.vendor);
                    expect(result).to.have.property('informations', registeredModule.informations);
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
