const { expect, assert } = require('chai');
const { ObjectId } = require('mongodb');
const { dbHandler } = require('ngcstesthelpers');
const { RoleServices } = require('ngcsroles');
const { UserServices } = require('ngcsusers');
const ToolServices = require('../services/toolservices');
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
            ToolServices.createTool(params)
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
            ToolServices.createTool(params)
                .then(result => {
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
            ToolServices.deleteTool(params)
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
                    ToolServices.deleteTool(params)
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

        it('should throw an error if tool to update is not found', function (done) {
            const id = new ObjectId();
            const params = { toolId: id.toString() };
            ToolServices.updateToolInformations(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `Could not find tool.`);
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should update Tool vendor if vendor is provided', function (done) {
            Tool.findOne({ name: 'tool1' })
                .then(tool => {
                    const params = { toolId: tool._id.toString(), vendor: 'Vendor' };
                    ToolServices.updateToolInformations(params)
                        .then(result => {
                            Tool.findOne({ name: 'tool1' })
                                .then(newTool => {
                                    expect(newTool).to.have.property('vendor', params.vendor);
                                    done();
                                })
                        });
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                });
        });

        it('should do nothing if no awaited argument is defined', function (done) {
            Tool.findOne({ name: 'tool1' })
                .then(tool => {
                    const params = { toolId: tool._id.toString(), falseparam: 'falseparam' };
                    ToolServices.updateToolInformations(params)
                        .then(result => {
                            Tool.findOne({ name: 'tool1' })
                                .then(newTool => {
                                    expect(newTool).not.to.have.own.property('vendor', params.falseparam);
                                    done();
                                })
                        });
                })
                .catch(err => {
                    assert.fail('Error');
                    done();
                });
        });
    });

    describe('#getTool function', function () {
        let registeredTool;
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
            registeredTool = await tool.save();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if Tool not found', function (done) {
            ToolServices.getTool({ toolId: ObjectId().toString() })
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', 'Tool not found.');
                    expect(err).to.have.property('statusCode', 404);
                    done();
                })
        });

        it('should return a tool object if tool found', function (done) {
            ToolServices.getTool({ toolId: registeredTool._id.toString() })
                .then(result => {
                    expect(result).to.have.property('toolId', registeredTool._id.toString());
                    expect(result).to.have.property('name', registeredTool.name);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('Error');
                    done();
                })
        });

    });

    describe('#getTools function', function () {
        before(async () => {
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        beforeEach(async () => {
            for (let i = 0; i < 20; i++) {
                const tool = new Tool({ name: 'tool' + i });
                await tool.save();
            }
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        it('should throw an error if range out of bounds', function (done) {
            ToolServices.getTools({ page: 3, perPage: 10 })
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
            const perPage = 10;
            ToolServices.getTools({ page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 2);
                    expect(result).to.have.property('tools').to.have.lengthOf(perPage);
                    for (let i = 0; i < perPage; i++) {
                        expect(result.tools[i]).to.have.property('name', 'tool' + i);
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
            ToolServices.getTools({ page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('tools').to.have.lengthOf(perPage);
                    for (let i = 0; i < perPage; i++) {
                        expect(result.tools[i]).to.have.property('name', 'tool' + i);
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

    describe("#isToolManager function", function () {
        let userRole, managerRole, adminRole;

        before(async () => {
            this.timeout(10000);
            await dbHandler.connect();
        });

        after(async () => {
            await dbHandler.closeDatabase();
        });

        afterEach(async () => {
            await dbHandler.clearDatabase();
        });

        beforeEach(async () => {
            // this.timeout =10000;
            userRole = await RoleServices.createRole({
                name: 'userRole',
                label: 'userRole'
            });
            managerRole = await RoleServices.createRole({
                name: 'toolsmanagers',
                label: 'toolsmanagers',
            });
            await RoleServices.addSubRoleToRole({ parentRoleId: managerRole.roleId, subRoleId: userRole.roleId });

            adminRole = await RoleServices.createRole({
                name: 'adminRole',
                label: 'adminRole',
            });
            await RoleServices.addSubRoleToRole({ parentRoleId: adminRole.roleId, subRoleId: userRole.roleId });
            await RoleServices.addSubRoleToRole({ parentRoleId: adminRole.roleId, subRoleId: managerRole.roleId });

            // simpleUser = await UserServices.createUser({
            //     login: 'simpleUser',
            //     password: 'password',
            //     email: 'simpleUser@user.com',
            //     role: userRole.roleId
            // });

            // managerUser = await UserServices.createUser({
            //     login: 'managerUser',
            //     password: 'password',
            //     email: 'managerUser@user.com',
            //     role: managerRole.roleId
            // });

            // adminUser = await UserServices.createUser({
            //     login: 'adminUser',
            //     password: 'password',
            //     email: 'adminUser@user.com',
            //     role: adminRole.roleId
            // });
        });

        it('should return false if user not found', function (done) {
            const userId = new ObjectId();
            ToolServices.isToolManager({ userId: userId.toString() })
                .then(result => {
                    expect(result).to.be.false;
                    done();
                })
        });

        it('should return false if toolsmanager role is not defined', function (done) {
            UserServices.createUser({
                login: 'managerUser',
                password: 'password',
                email: 'managerUser@user.com',
                role: managerRole.roleId
            }).then(managerUser => {
                RoleServices.deleteRole({ roleId: managerRole.roleId })
                    .then(result => {
                        ToolServices.isToolManager({ userId: managerUser.userId })
                            .then(result => {
                                expect(result).to.be.false;
                                done();
                            })
                    })
            })
        });

        it('should return true if user is member of toolManager group', function (done) {
            UserServices.createUser({
                login: 'managerUser',
                password: 'password',
                email: 'managerUser@user.com',
                role: managerRole.roleId
            })
                .then(managerUser => {
                    ToolServices.isToolManager({ userId: managerUser.userId })
                        .then(result => {
                            expect(result).to.be.true;
                            done();
                        })
                });
        });

        it('should return true if user is member of a superGroup of toolManager', function (done) {
            UserServices.createUser({
                login: 'adminUser',
                password: 'password',
                email: 'adminUser@user.com',
                role: adminRole.roleId

            })
                .then(adminUser => {
                    ToolServices.isToolManager({ userId: adminUser.userId })
                        .then(result => {
                            expect(result).to.be.true;
                            done();
                        })
                })
        });

        it('should return false if user is not member of administrators group or from his supergroup', function (done) {
            UserServices.createUser({
                login: 'simpleUser',
                password: 'password',
                email: 'simpleUser@user.com',
                role: userRole.roleId
            })
                .then(simpleUser => {
                    ToolServices.isToolManager({ userId: simpleUser.userId })
                        .then(result => {
                            expect(result).to.be.false;
                            done();
                        })

                })
        });
    });
});
