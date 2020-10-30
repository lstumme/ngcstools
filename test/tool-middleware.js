const { expect, assert } = require('chai');
const sinon = require('sinon');
const isToolManager = require('../middleware/is-toolmanager');
const toolServices = require('../services/toolservices');

describe('Tool Middleware', function () {
    describe('#isToolManager', function () {
        beforeEach(function () {
            sinon.stub(toolServices, 'isToolManager');
        });

        afterEach(function () {
            toolServices.isToolManager.restore();
        });

        it('should throw an error if user is not toolManager', function (done) {
            toolServices.isToolManager.returns(new Promise((resolve, reject) => {
                resolve(false);
            }));
            const req = {
                auth: { userId: 'abc' }
            }
            isToolManager(req, {}, () => { assert.fail('Error : next called') })
                .then(result => {
                    assert.fail('Unknown Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', 'Unauthorized');
                    expect(err).to.have.property('statusCode', 401);
                    done();
                });
        });

        it('should call next if user is ToolManager', function (done) {
            toolServices.isToolManager.returns(new Promise((resolve, reject) => {
                resolve(true);
            }));
            const req = {
                auth: { userId: 'abc' }
            }
            isToolManager(req, {}, () => {
                console.log('next called');
                done();
            })
                .then(result => {
                    if (result) {    // Should return nothing
                        assert.fail('Unknown Error');
                    }
                })
                .catch(err => {
                    assert.fail('toolservices Error');
                });
        });

    });
});
