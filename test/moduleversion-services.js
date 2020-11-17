const { expect, assert } = require('chai');
const { ObjectId } = require('mongodb');
const { dbHandler } = require('ngcstesthelpers');
const ModuleVersionServices = require('../services/moduleversionservices');
const ModuleServices = require('../services/moduleservices');
const ToolServices = require('../services/toolservices');
const ModuleVersion = require('../model/moduleversion');


describe('ModuleVersion services', function() {
    describe('#createModuleVersion function', function () {
        let module;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = await ToolServices.createTool({name: 'tool1'});
            module = await ModuleServices.createModule({name: 'module1',toolId: tool.toolId});

            const moduleVersion = new ModuleVersion({
                moduleId: module.moduleId,
                version: '1.0.0'
            });
            await moduleVersion.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if a moduleVersion with given version already exists for specified module', function (done) {
            const params = {
                moduleId: module.moduleId,
                version: '1.0.0'
            };
            ModuleVersionServices.createModuleVersion(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Module version ${params.version} already exists for this module`);
                    expect(err).to.have.property('statusCode', 409);
                    done();
                })
        });

        it('should throw an error if a specified tool does not exist', function (done) {
            const params = {
                moduleId: (new ObjectId()).toString(),
                version: '2.0.0'
            };
            ModuleVersionServices.createModuleVersion(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Specified module does not exist`);
                    expect(err).to.have.property('statusCode', 409);
                    done();
                })

        })

        it('should create a module version', function (done) {
            const params = {
                moduleId: module.moduleId,
                version: '2.0.0'
            };
            ModuleVersionServices.createModuleVersion(params)
                .then(result => {
                    expect(result).to.haveOwnProperty('moduleVersionId');
                    expect(result).to.have.property('moduleId', params.moduleId);
                    expect(result).to.have.property('version', params.version);

                    ModuleVersion.findOne({ _id: result.moduleVersionId })
                        .then(newModuleVersion => {
                            if (!newModuleVersion) {
                                assert.fail('Module not created');
                            }
                            done();
                        })
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('ModuleService Error');
                })
        });

    });

    describe('#deleteModuleVersion function', function () {
        let moduleVersion;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = await ToolServices.createTool({name: 'tool1'});
            module = await ModuleServices.createModule({name: 'module1',toolId: tool.toolId});

            moduleVersion = new ModuleVersion({
                moduleId: module.moduleId,
                version: '1.0.0'
            });
            moduleVersion = await moduleVersion.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if moduleVersion to delete is not found', function (done) {
            const id = new ObjectId();
            const params = { moduleId: id.toString() };
            ModuleVersionServices.deleteModuleVersion(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Could not find module version.`);
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should delete module version if module exists', function (done) {
            const params = { moduleVersionId: moduleVersion._id.toString() };
            ModuleVersionServices.deleteModuleVersion(params)
                .then(result => {
                    ModuleVersion.countDocuments({}, function (err, count) {
                        if (err) {
                            assert.fail('Database Error');
                        }
                        expect(count).to.equal(0);
                        done();
                    });
                    expect(result).to.have.property('moduleVersionId', moduleVersion._id.toString());
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('Error');
                    done();
                })
        });
    });

    describe('#updateModuleInformations function', function () {
        let moduleVersion;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = await ToolServices.createTool({name: 'tool1'});
            module = await ModuleServices.createModule({name: 'module1',toolId: tool.toolId});

            moduleVersion = new ModuleVersion({
                moduleId: module.moduleId,
                version: '1.0.0'
            });
            moduleVersion = await moduleVersion.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if moduleVersion to update is not found', function (done) {
            const params = {
                moduleVersionId: (new ObjectId()).toString(),
                location: 'location',
                informations: 'informations'
            };
            ModuleVersionServices.updateModuleVersionInformations(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Could not find module version.`);
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should update Module location if location is provided', function (done) {
            const params = {
                moduleVersionId: moduleVersion._id.toString(),
                location: 'location',
            };
            ModuleVersionServices.updateModuleVersionInformations(params)
                .then(result => {
                    expect(result).to.have.property('location', params.location);
                    ModuleVersion.findOne({ _id: moduleVersion._id })
                        .then(newModuleVersion => {
                            expect(newModuleVersion).to.have.property('location', params.location);
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
            const params = {
                moduleVersionId: moduleVersion._id.toString(),
                informations: 'informations'
            };
            ModuleVersionServices.updateModuleVersionInformations(params)
                .then(result => {
                    expect(result).to.have.property('informations', params.informations);
                    ModuleVersion.findOne({ _id: moduleVersion._id })
                        .then(newModuleVersion => {
                            expect(newModuleVersion).to.have.property('informations', params.informations);
                            done();
                        })
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                });
        });

        it('should do nothing if no awaited argument is defined', function (done) {
            const params = {
                moduleVersionId: moduleVersion._id.toString(),
            };
            ModuleVersionServices.updateModuleVersionInformations(params)
                .then(result => {
                    ModuleVersion.findOne({ _id: params.moduleVersionId })
                        .then(newModuleVersion => {
                            expect(newModuleVersion).not.to.have.own.property('location');
                            expect(newModuleVersion).not.to.have.own.property('informations');
                            done();
                        })
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                });
        });
    });

    describe('#getModuleVersion function', function () {
        let moduleVersion;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = await ToolServices.createTool({name: 'tool1'});
            module = await ModuleServices.createModule({name: 'module1',toolId: tool.toolId});

            moduleVersion = new ModuleVersion({
                moduleId: module.moduleId,
                version: '1.0.0',
                location: 'location1',
                informations: 'informations1'
            });
            moduleVersion = await moduleVersion.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if Module version not found', function (done) {
            ModuleVersionServices.getModuleVersion({ moduleVersionId: ObjectId().toString() })
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', 'Module version not found.');
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should return a module version object if module version found', function (done) {
            ModuleVersionServices.getModuleVersion({ moduleVersionId: moduleVersion._id.toString() })
                .then(result => {
                    expect(result).to.have.property('moduleVersionId', moduleVersion._id.toString());
                    expect(result).to.have.property('moduleId', moduleVersion.moduleId.toString());
                    expect(result).to.have.property('version', moduleVersion.version);
                    expect(result).to.have.property('location', moduleVersion.location);
                    expect(result).to.have.property('informations', moduleVersion.informations);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('Error');
                    done();
                })
        });

    });

    describe('#getModuleVersions function', function () {
        let module1;
        let module2;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = await ToolServices.createTool({name: 'tool1'});
            module1 = await ModuleServices.createModule({name: 'module1',toolId: tool.toolId});
            module2 = await ModuleServices.createModule({name: 'module2',toolId: tool.toolId});

            for (let i = 0; i < 30; i++) {
                if (i % 2 == 0) {
                    const moduleVersion = new ModuleVersion({
                        moduleId: module1.moduleId,
                        version: i + '.0.0'
                    });
                    await moduleVersion.save();
                } else {
                    const moduleVersion = new ModuleVersion({
                        moduleId: module2.moduleId,
                        version: i + '.0.0'
                    });
                    await moduleVersion.save();
                }
            }
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if range out of bounds', function (done) {
            ModuleVersionServices.getModuleVersions({ ModuleId: module1.moduleId, page: 3, perPage: 10 })
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
            ModuleVersionServices.getModuleVersions({ moduleId: module1.moduleId, page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('moduleVersions').to.have.lengthOf(perPage);
                    for (let i = 0; i < perPage; i++) {
                        expect(result.moduleVersions[i]).to.have.property('version', (i * 2) + '.0.0');
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
            ModuleVersionServices.getModuleVersions({ moduleId: module1.moduleId, page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('moduleVersions').to.have.lengthOf(perPage);
                    for (let i = 0; i < perPage; i++) {
                        expect(result.moduleVersions[i]).to.have.property('version', (i * 2) + '.0.0');
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