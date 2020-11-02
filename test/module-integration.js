const { expect, assert } = require('chai');
const moduleController = require('../controllers/modulecontroller');
const Tool = require('../model/tool');
const Module = require('../model/module');
const dbHandler = require('./db-handler');

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
                tool: tool._id.toString()
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
});
