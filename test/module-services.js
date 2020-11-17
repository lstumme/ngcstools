const { expect, assert } = require('chai');
const { ObjectId } = require('mongodb');
const { dbHandler } = require('ngcstesthelpers');
const ModuleServices = require('../services/moduleservices');
const ToolServices = require('../services/toolservices');
const Module = require('../model/module');

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
            tool = await ToolServices.createTool({ name: 'tool1' });
            const module = new Module({
                name: 'module1',
                toolId: tool.toolId
            });
            await module.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if a module with given name already exists', function (done) {
            const params = {
                name: 'module1',
                toolId: tool.toolId
            };
            ModuleServices.createModule(params)
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
            ModuleServices.createModule(params)
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
                toolId: tool.toolId
            };
            ModuleServices.createModule(params)
                .then(result => {
                    expect(result).to.haveOwnProperty('moduleId');
                    expect(result).to.have.property('name', 'module2');
                    expect(result).to.have.property('toolId', tool.toolId)

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
            const tool = await ToolServices.createTool({ name: 'tool1' });
            module = new Module({
                name: 'module1',
                toolId: tool.toolId
            })
            module = await module.save()
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if module to delete is not found', function (done) {
            const id = new ObjectId();
            const params = { moduleId: id.toString() };
            ModuleServices.deleteModule(params)
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
            ModuleServices.deleteModule(params)
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
            const tool = await ToolServices.createTool({ name: 'tool1' });

            module = new Module({
                name: 'module1',
                toolId: tool.toolId
            })
            module = await module.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if module to update is not found', function (done) {
            const id = new ObjectId();
            const params = { moduleId: id.toString() };
            ModuleServices.updateModuleInformations(params)
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
            ModuleServices.updateModuleInformations(params)
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
            ModuleServices.updateModuleInformations(params)
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
            ModuleServices.updateModuleInformations(params)
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
            let tool = await ToolServices.createTool({ name: 'tool1' });

            registeredModule = new Module({
                name: 'module1',
                toolId: tool.toolId,
                vendor: 'vendor1',
                informations: 'informations1'
            });
            registeredModule = await registeredModule.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if Module not found', function (done) {
            ModuleServices.getModule({ moduleId: ObjectId().toString() })
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
            ModuleServices.getModule({ moduleId: registeredModule._id.toString() })
                .then(result => {
                    expect(result).to.have.property('moduleId', registeredModule._id.toString());
                    expect(result).to.have.property('toolId', registeredModule.toolId.toString());
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

    describe('#getModules function', function () {
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
                    const module = new Module({
                        name: 'module' + i,
                        toolId: tool1.toolId
                    });
                    await module.save();
                } else {
                    const module = new Module({
                        name: 'module' + i,
                        toolId: tool2.toolId
                    });
                    await module.save();
                }
            }
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if range out of bounds', function (done) {
            ModuleServices.getModules({ toolId: tool1.toolId, page: 3, perPage: 10 })
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
            ModuleServices.getModules({ toolId: tool1.toolId, page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('modules').to.have.lengthOf(perPage);
                    for (let i = 0; i < perPage; i++) {
                        expect(result.modules[i]).to.have.property('name', 'module' + (i * 2));
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
            ModuleServices.getModules({ toolId: tool1.toolId, page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('modules').to.have.lengthOf(perPage);
                    for (let i = 0; i < perPage; i++) {
                        expect(result.modules[i]).to.have.property('name', 'module' + i * 2);
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

    describe('#findModule function', function () {
        let module1;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            const tool = await ToolServices.createTool({ name: 'tool1' });
            module1 = new Module({
                name: 'module1',
                toolId: tool.toolId
            })
            module1 = await module1.save()
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return null if Module not found', function (done) {
            ModuleServices.findModule({ name: 'unknownModule' })
                .then(result => {
                    expect(result).to.be.null;
                    done();
                })
        });

        it('should return a module object if Module found', function (done) {
            ModuleServices.findModule({ name: module1.name })
                .then(result => {
                    expect(result).to.have.property('moduleId', module1._id.toString());
                    expect(result).to.have.property('name', module1.name);
                    expect(result).to.have.property('toolId', module1.toolId.toString());
                    done();
                })
        });

    })

});
