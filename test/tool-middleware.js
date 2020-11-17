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

        it('should call next(error) if user is not toolManager', function (done) {
            toolServices.isToolManager.returns(new Promise((resolve, reject) => {
                resolve(false);
            }));
            const req = {
                auth: { userId: 'abc' }
            }
            isToolManager(req, {}, (err) => {
                expect(err).not.to.be.null;
                expect(err).to.have.property('statusCode', 401);
                expect(err).to.have.property('message', 'Unauthorized');
                done();
            })
                .then(response => {
                    assert.fail('isToolManager Error');
                })
                .catch(err => {
                    assert.fail('Error thrown');
                })
        });

        it('should call next if user is ToolManager', function (done) {
            toolServices.isToolManager.returns(new Promise((resolve, reject) => {
                resolve(true);
            }));
            const req = {
                auth: { userId: 'abc' }
            }
            isToolManager(req, {}, () => {
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
