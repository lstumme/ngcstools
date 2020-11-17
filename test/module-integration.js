const { expect } = require('chai');
const {dbHandler} = require('ngcstesthelpers');
const moduleController = require('../controllers/modulecontroller');
const ToolServices = require('../services/toolservices');
const Module = require('../model/module');

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
            tool = await ToolServices.createTool({name: 'tool1'});
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should return an object if module creation succeed', function (done) {
            const req = {
                body: {
                    name: 'module1',
                    toolId: tool.toolId
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
                    expect(res.jsonObject.data).to.have.property('toolId', tool.toolId)

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
            const tool = await ToolServices.createTool({name: 'tool1'});

            module = new Module({
                name: 'module1',
                toolId: tool.toolId
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
            const tool = await ToolServices.createTool({name: 'tool1'});

            module = new Module({
                name: 'module1',
                toolId: tool.toolId
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

});
