const { expect, assert } = require('chai');
const sinon = require('sinon');
const ToolController = require('../controllers/toolcontroller');
const ToolServices = require('../services/toolservices');

describe('Tool Controller', function () {
	describe('#createTool function', function () {
		beforeEach(function () {
			sinon.stub(ToolServices, 'createTool');
		});

		afterEach(function () {
			ToolServices.createTool.restore();
		});

		it('should call next(err) if name is not specified', function (done) {
			const req = {
				body: {
				}
			};
			let nextCalled = false;
			ToolController.createTool(req, {}, (err) => {
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


		it('should return an object if Tool creation succeed', function (done) {
			const req = {
				body: {
					name: 'defaultName', 
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

			ToolServices.createTool.returns(new Promise((resolve, reject) => {
				resolve({ 
					toolId: 'toolIdValue',
					name: req.body.name, 
				});
			}));

			ToolController.createTool(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 201);
					expect(res.jsonObject).to.have.property('message', 'Tool created');
					expect(res.jsonObject.data).to.have.property('toolId', 'toolIdValue');
					expect(res.jsonObject.data).to.have.property('name', req.body.name); 
					done();				
				})
				.catch(err => {
					console.log(err);
				});		
		});
		
		it('should call next(err) adding default statusCode if not specified', function (done) {
			const req = {
				body: {
					name: 'defaultName', 
				}
			};

			ToolServices.createTool.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));
			
			let nextCalled = false;
			ToolController.createTool(req, {}, (err) => {
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
					name: 'defaultName', 
				}
			};

			ToolServices.createTool.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ToolController.createTool(req, {}, (err) => {
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
	describe('#updateTool function', function () {
		beforeEach(function () {
			sinon.stub(ToolServices, 'updateTool');
		});

		afterEach(function () {
			ToolServices.updateTool.restore();
		});

		it('should call next(err) if no toolId specified', function (done) {
			const req = {
				body: {
					vendor: 'vendor1', 
				}
			}

			let nextCalled = false;
			ToolController.updateTool(req, {}, (err) => {
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
					toolId: 'toolIdValue',
					vendor: 'vendor1', 
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

			ToolServices.updateTool.returns(new Promise((resolve, reject) => {
				resolve({ 
					toolId: 'toolIdValue',
					vendor: 'vendor1', 
				});
			}));

			ToolController.updateTool(req, res, () => {})
				.then(() => {
					expect(res).to.have.property('statusCode', 201);
					expect(res.jsonObject).to.have.property('message', 'Tool updated');
					expect(res.jsonObject.data).to.have.property('toolId', 'toolIdValue');
					expect(res.jsonObject.data).to.have.property('vendor', req.body.vendor); 
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
					toolId: 'toolIdValue',
					vendor: 'vendor1', 
				}
			};

			ToolServices.updateTool.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ToolController.updateTool(req, {}, (err) => {
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
					toolId: 'toolIdValue',
					vendor: 'vendor1', 
				}
			};

			ToolServices.updateTool.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ToolController.updateTool(req, {}, (err) => {
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


	describe('#deleteTool function', function () {
		beforeEach(function () {
			sinon.stub(ToolServices, 'deleteTool');
		});

		afterEach(function () {
			ToolServices.deleteTool.restore();
		});

		it('should call next(err) if tool is not specified', function (done) {
			const req = {
				body: {
				}
			};

			let nextCalled = false;
		   	ToolController.deleteTool(req, {}, (err) => {
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

	   it('should return a toolId if Tool deletion succeed', function (done) {
			const req = {
				body: {
					toolId: 'toolId'
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

			ToolServices.deleteTool.returns(new Promise((resolve, reject) => {
				resolve({ toolId: req.body.toolId });
			}));

			ToolController.deleteTool(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'Tool deleted');
					expect(res.jsonObject.data).to.have.property('toolId', req.body.toolId)
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
					toolId: 'toolId'
				}
			}

			ToolServices.deleteTool.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				throw error;
			}));

			let nextCalled = false;
			ToolController.deleteTool(req, {}, (err) => { 
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
					toolId: 'toolId'
				}
			}

			ToolServices.deleteTool.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ToolController.deleteTool(req, {}, (err) => { 
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
	describe('#getTools function', function () {
		beforeEach(function () {
			sinon.stub(ToolServices, 'getTools');
		});

		afterEach(function () {
			ToolServices.getTools.restore();
		});

		it('should call next(err) if no page specified', function (done) {
			const req = {
				query: {
					perPage: '20',
				}
			}
			let nextCalled = false;
			ToolController.getTools(req, {}, (err) => {
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
				}
			}

			let nextCalled = false;
			ToolController.getTools(req, {}, (err) => {
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
			ToolServices.getTools.returns(new Promise((resolve, reject) => {
				resolve([
					{ toolId: 'tool1' },
					{ toolId: 'tool2' },
					{ toolId: 'tool3' },
				]);
			}));

			ToolController.getTools(req, res, () => { })
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
				}
			}
			ToolServices.getTools.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ToolController.getTools(req, {}, (err) => {
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
				}
			}
			ToolServices.getTools.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ToolController.getTools(req, {}, (err) => {
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
	describe('#getTool function', function () {
		beforeEach(function () {
			sinon.stub(ToolServices, 'getTool');
		});

		afterEach(function () {
			ToolServices.getTool.restore();
		});

		it('should call next(err) if no toolId specified', function (done) {
			const req = {
				query: {
				}
			}
			let nextCalled = false;
			ToolController.getTool(req, {}, (err) => {
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
					toolId: 'abc',
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
			ToolServices.getTool.returns(new Promise((resolve, reject) => {
				resolve({ toolId: 'abc' });
			}));

			ToolController.getTool(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('toolId', 'abc');
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
					toolId: 'abc',
				}
			}
			ToolServices.getTool.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ToolController.getTool(req, {}, (err) => {
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
					toolId: 'abc',
				}
			}
			ToolServices.getTool.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ToolController.getTool(req, {}, (err) => {
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
	describe('#findToolByName function', function () {
		beforeEach(function () {
			sinon.stub(ToolServices, 'findToolByName');
		});

		afterEach(function () {
			ToolServices.findToolByName.restore();
		});

		it('should call next(err) if name is not specified', function (done) {
			const req = {
				query: {
				}
			}

			let nextCalled = false;
			ToolController.findToolByName(req, {}, (err) => {
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
					name: 'name1',
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
			ToolServices.findToolByName.returns(new Promise((resolve, reject) => {
				resolve({ 
					toolId: 'abc',
					name: 'name1', 
				});
			}));

			ToolController.findToolByName(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('toolId', 'abc');
					expect(res.jsonObject).to.have.property('name', 'name1');
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
					name: 'name1',
				}
			}
			ToolServices.findToolByName.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ToolController.findToolByName(req, {}, (err) => {
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
					name: 'name1',
				}
			}
			ToolServices.findToolByName.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ToolController.findToolByName(req, {}, (err) => {
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
