const { expect, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const { RoleServices } = require('ngcsroles');
const initdb = require('../config/initdb');

describe('Databse Initialization', function () {
    before(async () => {
        await dbHandler.connect();
    });

    after(async () => {
        await dbHandler.closeDatabase();
    });

    afterEach(async () => {
        await dbHandler.clearDatabase();
    });

    it('should throw an error if administrators role not found', function (done) {
        initdb()
            .then(result => {
                console.log("result : " + result)
                assert.fail();
            })
            .catch(err => {
                expect(err).to.have.property('message', 'administrators role not found');
                done();
            })
    });

    it('should create a toolsmanager role and add it as subRole to admins ', function (done) {
        RoleServices.createRole({ name: 'administrators', label: 'administrators' })
            .then(admins => {
                initdb()
                    .then(result => {
                        RoleServices.findRole({ name: 'toolsmanagers' })
                            .then(tools => {
                                expect(tools).not.to.be.null;
                                expect(tools).not.to.be.undefined;
                                return tools;
                            })
                            .then(users => {
                                return RoleServices.findRole({ name: 'administrators' })
                                    .then(newAdmins => {
                                        expect(newAdmins.subRoles).to.include(users.roleId);
                                        return users;
                                    })
                            })
                            .then(users => {
                                done();
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        assert(fail);
                    })
            })
    });


    it('should add users as subRole of administrators', function (done) {
        RoleServices.createRole({ name: 'toolsmanagers', label: 'toolsmanagers' })
            .then(users => {
                RoleServices.createRole({ name: 'administrators', label: 'administrators' })
                    .then(admins => {
                        initdb()
                            .then(result => {
                                return users;
                            })
                            .then(users => {
                                return RoleServices.findRole({ name: 'administrators' })
                                    .then(newAdmins => {
                                        expect(newAdmins.subRoles).includes(users.roleId);
                                        return users;
                                    })
                            })
                            .then(users => {
                                done();
                            })
                    });
            });
    });
});
