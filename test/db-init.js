const { expect, assert } = require('chai');
const { Group } = require('ngcsgroups');
const initdb = require('../config/initdb');
const {dbHandler} = require('ngcstesthelpers');

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

    const createAdministratorsGroup = async () => {
        const adminGroup = new Group({
            name: 'administrators'
        });
        return adminGroup.save();
    };

    it('should throw an error if administrators group does not exists', function (done) {
        initdb()
            .then(result => {
                assert.fail('initdb failed');
                done();
            })
            .catch(err => {
                expect(err).to.have.property('message', 'Administrators group not found');
                done();
            })
    });

    it('should create toolsmanagers group if not exists and add administrators group to it', function (done) {
        createAdministratorsGroup()
            .then(adminGroup => {
                initdb()
                    .then(result => {
                        Group.findOne({ name: 'toolsManagers' })
                            .then(toolsManager => {
                                if (!toolsManager) {
                                    assert.fail('InitDb error');
                                    done();
                                }
                                expect(toolsManager.groups.includes(adminGroup._id.toString())).to.be.true;
                                done();
                            })
                    })
            })
            .catch(err => {
                console.log(err);
                assert.fail('InitDb error');
                done();
            });
    });

    it('should add administrators group to toolsmanagers.groups if not present', function (done) {
        createAdministratorsGroup()
            .then(adminGroup => {
                const group = new Group({
                    name: 'toolsManagers'
                });
                group.save()
                    .then(toolsManager => {
                        initdb()
                            .then(result => {
                                Group.findOne({ name: 'toolsManagers' })
                                    .then(toolsManager => {
                                        if (!toolsManager) {
                                            assert.fail('InitDb error');
                                            done();
                                        }
                                        expect(toolsManager.groups.includes(adminGroup._id.toString())).to.be.true;
                                        done();
                                    })
                            })
                    })
            });
    })

    it('should not change anything if everything is in order', function (done) {
        createAdministratorsGroup()
            .then(adminGroup => {
                const group = new Group({
                    name: 'toolsManagers',
                    groups: [adminGroup._id.toString()]
                });
                group.save()
                    .then(toolsManager => {
                        initdb()
                            .then(result => {
                                Group.findOne({ name: 'toolsManagers' })
                                    .then(toolsManager => {
                                        if (!toolsManager) {
                                            assert.fail('InitDb error');
                                            done();
                                        }
                                        expect(toolsManager.groups.includes(adminGroup._id.toString())).to.be.true;
                                        done();
                                    })
                            })
                    })
            });

    })
});


