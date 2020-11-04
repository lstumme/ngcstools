const { expect, assert } = require('chai');
const {dbHandler} = require('ngcstesthelpers');
const moduleController = require('../controllers/modulecontroller');
const Tool = require('../model/tool');
const Module = require('../model/module');
const ModuleVersion = require('../model/moduleversion');

describe('Module integration', function () {
    describe('#createModule', function (done) {
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

        it('should return an object if module creation succeed', function (done) {
            const req = {
                body: {
                    name: 'module1',
                    toolId: tool._id.toString()
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

            moduleController.createModule(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Module created');
                    expect(res.jsonObject.data).to.have.property('name', 'module1');
                    expect(res.jsonObject.data).to.have.property('toolId', tool._id.toString())

                    Module.findOne({ name: 'module1' })
                        .then(module => {
                            expect(res.jsonObject.data).to.have.property('moduleId', module._id.toString());
                            done();
                        });
                })
        });
    });

    describe('#deleteModule', function (done) {
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
                toolId: tool._id.toString()
            })
            module = await module.save()
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if module deletion succeed', function (done) {
            const req = {
                body: { moduleId: module._id.toString() }
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

            moduleController.deleteModule(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Module deleted');
                    expect(res.jsonObject.data).to.have.property('moduleId', module._id.toString());
                    done();
                })

        });

    });

    describe('#updateModuleInformation', function (done) {
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
                toolId: tool._id.toString()
            })
            module = await module.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if update succeed', function (done) {
            const req = {
                body: {
                    moduleId: module._id.toString(),
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

            moduleController.updateModuleInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Module updated');
                expect(res.jsonObject.data).to.have.property('moduleId', module._id.toString());
                expect(res.jsonObject.data).to.have.property('vendor', 'vendor');
                expect(res.jsonObject.data).to.have.property('informations', 'informations');
                done();
            });
        });

    });

    describe('#createModuleVersion', function (done) {
        let module;
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

            module = new Module({
                name: 'module1',
                toolId: tool._id.toString()
            });
            await module.save();

            const moduleVersion = new ModuleVersion({
                moduleId: module._id,
                version: '1.0.0'
            });
            await moduleVersion.save();

        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if module version creation succeed', function (done) {
            const req = {
                body: {
                    moduleId: module._id.toString(),
                    version: '2.0.0'
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

            moduleController.createModuleVersion(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Module version created');
                    expect(res.jsonObject.data).to.haveOwnProperty('moduleVersionId');
                    expect(res.jsonObject.data).to.have.property('moduleId', module._id.toString());
                    expect(res.jsonObject.data).to.have.property('version', '2.0.0');
                    done();
                })
        });


    });

    describe('#deleteModuleVersion', function (done) {
        let moduleVersion;
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
                toolId: tool._id.toString()
            });
            await module.save();

            moduleVersion = new ModuleVersion({
                moduleId: module._id,
                version: '1.0.0'
            });
            moduleVersion = await moduleVersion.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if moduleVersion deletion succeed', function (done) {
            const req = {
                body: { moduleVersionId: moduleVersion._id.toString() }
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

            moduleController.deleteModuleVersion(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Module version deleted');
                    expect(res.jsonObject.data).to.have.property('moduleVersionId', moduleVersion._id.toString());
                    done();
                })
        });
    });

    describe('#updateModuleVersionInformations', function (done) {
        let moduleVersion;
        let module;
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

            module = new Module({
                name: 'module1',
                toolId: tool._id.toString()
            });
            module = await module.save();

            moduleVersion = new ModuleVersion({
                moduleId: module._id,
                version: '1.0.0'
            });
            moduleVersion = await moduleVersion.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if update succeed', function (done) {
            const req = {
                body: {
                    moduleVersionId: moduleVersion._id.toString(),
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

            moduleController.updateModuleVersionInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Module version updated');
                expect(res.jsonObject.data).to.have.property('moduleVersionId', moduleVersion._id.toString());
                expect(res.jsonObject.data).to.have.property('informations', 'informations');
                expect(res.jsonObject.data).to.have.property('location', 'location');
                expect(res.jsonObject.data).to.have.property('moduleId', module._id.toString());
                done();
            });
        });


    });
});
