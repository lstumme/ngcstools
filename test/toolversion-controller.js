const { expect, assert } = require('chai');
const sinon = require('sinon');
const ToolVersionController = require('../controllers/toolversioncontroller');
const ToolVersionServices = require('../services/toolversionservices');

describe('ToolVersion Controller', function () {
	describe('#createToolVersion function', function () {
		beforeEach(function () {
			sinon.stub(ToolVersionServices, 'createToolVersion');
		});

		afterEach(function () {
			ToolVersionServices.createToolVersion.restore();
		});

		it('should call next(err) if tool is not specified', function (done) {
			const req = {
				body: {
					version: 'defaultVersion', 
				}
			};
			let nextCalled = false;
			ToolVersionController.createToolVersion(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(result => {
					expect(nextCalled).to.be.true;
					expect(result).to.be.null;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});

		it('should call next(err) if version is not specified', function (done) {
			const req = {
				body: {
					tool: 'defaultTool', 
				}
			};
			let nextCalled = false;
			ToolVersionController.createToolVersion(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(result => {
					expect(nextCalled).to.be.true;
					expect(result).to.be.null;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});


		it('should return an object if ToolVersion creation succeed', function (done) {
			const req = {
				body: {
					tool: 'defaultTool', 
					version: 'defaultVersion', 
				}
			};

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

			ToolVersionServices.createToolVersion.returns(new Promise((resolve, reject) => {
				resolve({ 
					toolversionId: 'toolversionIdValue',
					tool: req.body.tool, 
					version: req.body.version, 
				});
			}));

			ToolVersionController.createToolVersion(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 201);
					expect(res.jsonObject).to.have.property('message', 'ToolVersion created');
					expect(res.jsonObject.data).to.have.property('toolversionId', 'toolversionIdValue');
					expect(res.jsonObject.data).to.have.property('tool', req.body.tool); 
					expect(res.jsonObject.data).to.have.property('version', req.body.version); 
					done();				
				})
				.catch(err => {
					console.log(err);
				});		
		});
		
		it('should call next(err) adding default statusCode if not specified', function (done) {
			const req = {
				body: {
					tool: 'defaultTool', 
					version: 'defaultVersion', 
				}
			};

			ToolVersionServices.createToolVersion.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));
			
			let nextCalled = false;
			ToolVersionController.createToolVersion(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 500);
				nextCalled = true;
			})
				.then(result => {
					expect(nextCalled).to.be.true;
					expect(result).to.be.null;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});

		it('should call next(err) keeping specified statusCode', function (done) {
			const req = {
				body: {
					tool: 'defaultTool', 
					version: 'defaultVersion', 
				}
			};

			ToolVersionServices.createToolVersion.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ToolVersionController.createToolVersion(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(result => {
					expect(nextCalled).to.be.true;
					expect(result).to.be.null;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});
	});
	describe('#updateToolVersion function', function () {
		beforeEach(function () {
			sinon.stub(ToolVersionServices, 'updateToolVersion');
		});

		afterEach(function () {
			ToolVersionServices.updateToolVersion.restore();
		});

		it('should call next(err) if no toolVersionId specified', function (done) {
			const req = {
				body: {
					location: 'location1', 
					informations: 'informations1', 
				}
			}

			let nextCalled = false;
			ToolVersionController.updateToolVersion(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(result => {
					expect(nextCalled).to.be.true;
					expect(result).to.be.null;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});

		it('should return an object if update succeed', function (done) {
			const req = {
				body: {
					toolVersionId: 'toolVersionIdValue',
					location: 'location1', 
					informations: 'informations1', 
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

			ToolVersionServices.updateToolVersion.returns(new Promise((resolve, reject) => {
				resolve({ 
					toolVersionId: 'toolVersionIdValue',
					location: 'location1', 
					informations: 'informations1', 
				});
			}));

			ToolVersionController.updateToolVersion(req, res, () => {})
				.then(() => {
					expect(res).to.have.property('statusCode', 201);
					expect(res.jsonObject).to.have.property('message', 'ToolVersion updated');
					expect(res.jsonObject.data).to.have.property('toolVersionId', 'toolVersionIdValue');
					expect(res.jsonObject.data).to.have.property('location', req.body.location); 
					expect(res.jsonObject.data).to.have.property('informations', req.body.informations); 
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});

		it('should call next(err) adding default statusCode if not specified', function (done) {
			const req = {
				body: {
					toolVersionId: 'toolVersionIdValue',
					location: 'location1', 
					informations: 'informations1', 
				}
			};

			ToolVersionServices.updateToolVersion.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ToolVersionController.updateToolVersion(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 500);
				nextCalled = true;
			})
				.then(result => {
					expect(nextCalled).to.be.true;
					expect(result).to.be.null;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});

		it('should call next(err) keeping specified statusCode', function (done) {
			const req = {
				body: {
					toolVersionId: 'toolVersionIdValue',
					location: 'location1', 
					informations: 'informations1', 
				}
			};

			ToolVersionServices.updateToolVersion.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ToolVersionController.updateToolVersion(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(result => {
					expect(nextCalled).to.be.true;
					expect(result).to.be.null;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});
	});


	describe('#deleteToolVersion function', function () {
		beforeEach(function () {
			sinon.stub(ToolVersionServices, 'deleteToolVersion');
		});

		afterEach(function () {
			ToolVersionServices.deleteToolVersion.restore();
		});

		it('should call next(err) if toolVersion is not specified', function (done) {
			const req = {
				body: {
				}
			};

			let nextCalled = false;
		   	ToolVersionController.deleteToolVersion(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(result => {
					expect(nextCalled).to.be.true;
					expect(result).to.be.null;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});

	   it('should return a toolVersionId if ToolVersion deletion succeed', function (done) {
			const req = {
				body: {
					toolVersionId: 'toolVersionId'
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

			ToolVersionServices.deleteToolVersion.returns(new Promise((resolve, reject) => {
				resolve({ toolVersionId: req.body.toolVersionId });
			}));

			ToolVersionController.deleteToolVersion(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'ToolVersion deleted');
					expect(res.jsonObject.data).to.have.property('toolVersionId', req.body.toolVersionId)
					done();
				})
				.catch(err => {
					console.log(err);
					done();				
				});
		});

		it('should call next(err) adding default statusCode if not specified', function (done) {
			const req = {
				body: {
					toolVersionId: 'toolVersionId'
				}
			}

			ToolVersionServices.deleteToolVersion.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				throw error;
			}));

			let nextCalled = false;
			ToolVersionController.deleteToolVersion(req, {}, (err) => { 
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 500);
				nextCalled = true;
			})
				.then(result => {
					expect(nextCalled).to.be.true;
					expect(result).to.be.null;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});

	   	it('should call next(err) keeping specified statusCode', function (done) {
			const req = {
				body: {
					toolVersionId: 'toolVersionId'
				}
			}

			ToolVersionServices.deleteToolVersion.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ToolVersionController.deleteToolVersion(req, {}, (err) => { 
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(result => {
					expect(nextCalled).to.be.true;
					expect(result).to.be.null;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});
	});
	describe('#getToolVersions function', function () {
		beforeEach(function () {
			sinon.stub(ToolVersionServices, 'getToolVersions');
		});

		afterEach(function () {
			ToolVersionServices.getToolVersions.restore();
		});

		it('should call next(err) if no page specified', function (done) {
			const req = {
				query: {
					perPage: '20',
					toolId: 'defaulttoolId',
				}
			}
			let nextCalled = false;
			ToolVersionController.getToolVersions(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(response => {
					expect(response).to.be.null;
					expect(nextCalled).to.be.true;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should call next(err) if no perPage specified', function (done) {
			const req = {
				query: {
					page: '1',
					toolId: 'defaulttoolId',
				}
			}

			let nextCalled = false;
			ToolVersionController.getToolVersions(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(response => {
					expect(response).to.be.null;
					expect(nextCalled).to.be.true;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should call next(err) if no toolId specified', function (done) {
			const req = {
				query: {
					perPage: '20',
					page: '1',
				}
			}

			let nextCalled = false;
			ToolVersionController.getToolVersions(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(response => {
					expect(response).to.be.null;
					expect(nextCalled).to.be.true;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should return an array if request succeed', function (done) {
			const req = {
				query: {
					page: '1',
					perPage: '10',
					toolId: 'defaulttoolId',
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
			ToolVersionServices.getToolVersions.returns(new Promise((resolve, reject) => {
				resolve([
					{ toolVersionId: 'toolVersion1' },
					{ toolVersionId: 'toolVersion2' },
					{ toolVersionId: 'toolVersion3' },
				]);
			}));

			ToolVersionController.getToolVersions(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.lengthOf(3);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should call next(err) adding default statusCode if not specified', function (done) {
			const req = {
				query: {
					page: '1',
					perPage: '10',
					toolId: 'defaulttoolId',
				}
			}
			ToolVersionServices.getToolVersions.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ToolVersionController.getToolVersions(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 500);
				nextCalled = true;
			})
				.then(response => {
					expect(response).to.be.null;
					expect(nextCalled).to.be.true;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
				});
		});

		it('should call next(err) keeping specified statusCode', function (done) {
			const req = {
				query: {
					page: '1',
					perPage: '10',
					toolId: 'defaulttoolId',
				}
			}
			ToolVersionServices.getToolVersions.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ToolVersionController.getToolVersions(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(response => {
					expect(response).to.be.null;
					expect(nextCalled).to.be.true;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
				});
		});		
	});
	describe('#getToolVersion function', function () {
		beforeEach(function () {
			sinon.stub(ToolVersionServices, 'getToolVersion');
		});

		afterEach(function () {
			ToolVersionServices.getToolVersion.restore();
		});

		it('should call next(err) if no toolVersionId specified', function (done) {
			const req = {
				query: {
				}
			}
			let nextCalled = false;
			ToolVersionController.getToolVersion(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(response => {
					expect(response).to.be.null;
					expect(nextCalled).to.be.true;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});

		it('should return an object if request succeed', function (done) {
			const req = {
				query: {
					toolVersionId: 'abc',
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
			ToolVersionServices.getToolVersion.returns(new Promise((resolve, reject) => {
				resolve({ toolVersionId: 'abc' });
			}));

			ToolVersionController.getToolVersion(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('toolVersionId', 'abc');
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should call next(err) adding default statusCode if not specified', function (done) {
			const req = {
				query: {
					toolVersionId: 'abc',
				}
			}
			ToolVersionServices.getToolVersion.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ToolVersionController.getToolVersion(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 500);
				nextCalled = true;
			})
				.then(response => {
					expect(response).to.be.null;
					expect(nextCalled).to.be.true;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});

		it('should call next(err) keeping specified statusCode', function (done) {
			const req = {
				query: {
					toolVersionId: 'abc',
				}
			}
			ToolVersionServices.getToolVersion.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ToolVersionController.getToolVersion(req, {}, (err) => {
				expect(err).not.to.be.null;
				expect(err).to.have.property('statusCode', 400);
				nextCalled = true;
			})
				.then(response => {
					expect(response).to.be.null;
					expect(nextCalled).to.be.true;
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail('Error thrown');
					done();
				});
		});
	});



});
