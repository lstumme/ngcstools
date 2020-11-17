const { expect } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const ModuleVersionController = require('../controllers/moduleversioncontroller');
const ToolServices = require('../services/toolservices');
const ModuleServices = require('../services/moduleservices');
const ModuleVersion = require('../model/moduleversion');

describe('ModuleVersion integration', function() {
    describe('#createModuleVersion', function (done) {
        let module;
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            tool = await ToolServices.createTool({name: 'tool1'});
            module = await ModuleServices.createModule({
                name: 'module1',
                toolId: tool.toolId
            });

            const moduleVersion = new ModuleVersion({
                moduleId: module.moduleId,
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
                    moduleId: module.moduleId,
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

            ModuleVersionController.createModuleVersion(req, res, () => { })
                .then(result => {
                    expect(res).to.have.property('statusCode', 201);
                    expect(res.jsonObject).to.have.property('message', 'Module version created');
                    expect(res.jsonObject.data).to.haveOwnProperty('moduleVersionId');
                    expect(res.jsonObject.data).to.have.property('moduleId', module.moduleId);
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
            tool = await ToolServices.createTool({name: 'tool1'});
            module = await ModuleServices.createModule({
                name: 'module1',
                toolId: tool.toolId
            });

            moduleVersion = new ModuleVersion({
                moduleId: module.moduleId,
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

            ModuleVersionController.deleteModuleVersion(req, res, () => { })
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
            tool = await ToolServices.createTool({name: 'tool1'});
            module = await ModuleServices.createModule({
                name: 'module1',
                toolId: tool.toolId
            });

            moduleVersion = new ModuleVersion({
                moduleId: module.moduleId,
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

            ModuleVersionController.updateModuleVersionInformations(req, res, () => { }).then(result => {
                expect(res).to.have.property('statusCode', 200);
                expect(res.jsonObject).to.have.property('message', 'Module version updated');
                expect(res.jsonObject.data).to.have.property('moduleVersionId', moduleVersion._id.toString());
                expect(res.jsonObject.data).to.have.property('informations', 'informations');
                expect(res.jsonObject.data).to.have.property('location', 'location');
                expect(res.jsonObject.data).to.have.property('moduleId', module.moduleId);
                done();
            });
        });
    });
});