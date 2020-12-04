const { expect, assert } = require('chai');
const sinon = require('sinon');
const ModuleController = require('../controllers/modulecontroller');
const ModuleServices = require('../services/moduleservices');

describe('Module Controller', function () {
	describe('#createModule function', function () {
		beforeEach(function () {
			sinon.stub(ModuleServices, 'createModule');
		});

		afterEach(function () {
			ModuleServices.createModule.restore();
		});

		it('should call next(err) if name is not specified', function (done) {
			const req = {
				body: {
					tool: 'defaultTool', 
				}
			};
			let nextCalled = false;
			ModuleController.createModule(req, {}, (err) => {
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

		it('should call next(err) if tool is not specified', function (done) {
			const req = {
				body: {
					name: 'defaultName', 
				}
			};
			let nextCalled = false;
			ModuleController.createModule(req, {}, (err) => {
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


		it('should return an object if Module creation succeed', function (done) {
			const req = {
				body: {
					name: 'defaultName', 
					tool: 'defaultTool', 
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

			ModuleServices.createModule.returns(new Promise((resolve, reject) => {
				resolve({ 
					moduleId: 'moduleIdValue',
					name: req.body.name, 
					tool: req.body.tool, 
				});
			}));

			ModuleController.createModule(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 201);
					expect(res.jsonObject).to.have.property('message', 'Module created');
					expect(res.jsonObject.data).to.have.property('moduleId', 'moduleIdValue');
					expect(res.jsonObject.data).to.have.property('name', req.body.name); 
					expect(res.jsonObject.data).to.have.property('tool', req.body.tool); 
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
					tool: 'defaultTool', 
				}
			};

			ModuleServices.createModule.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));
			
			let nextCalled = false;
			ModuleController.createModule(req, {}, (err) => {
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
					tool: 'defaultTool', 
				}
			};

			ModuleServices.createModule.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ModuleController.createModule(req, {}, (err) => {
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
	describe('#updateModule function', function () {
		beforeEach(function () {
			sinon.stub(ModuleServices, 'updateModule');
		});

		afterEach(function () {
			ModuleServices.updateModule.restore();
		});

		it('should call next(err) if no moduleId specified', function (done) {
			const req = {
				body: {
					informations: 'informations1', 
					vendor: 'vendor1', 
				}
			}

			let nextCalled = false;
			ModuleController.updateModule(req, {}, (err) => {
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
					moduleId: 'moduleIdValue',
					informations: 'informations1', 
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

			ModuleServices.updateModule.returns(new Promise((resolve, reject) => {
				resolve({ 
					moduleId: 'moduleIdValue',
					informations: 'informations1', 
					vendor: 'vendor1', 
				});
			}));

			ModuleController.updateModule(req, res, () => {})
				.then(() => {
					expect(res).to.have.property('statusCode', 201);
					expect(res.jsonObject).to.have.property('message', 'Module updated');
					expect(res.jsonObject.data).to.have.property('moduleId', 'moduleIdValue');
					expect(res.jsonObject.data).to.have.property('informations', req.body.informations); 
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
					moduleId: 'moduleIdValue',
					informations: 'informations1', 
					vendor: 'vendor1', 
				}
			};

			ModuleServices.updateModule.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ModuleController.updateModule(req, {}, (err) => {
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
					moduleId: 'moduleIdValue',
					informations: 'informations1', 
					vendor: 'vendor1', 
				}
			};

			ModuleServices.updateModule.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ModuleController.updateModule(req, {}, (err) => {
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


	describe('#deleteModule function', function () {
		beforeEach(function () {
			sinon.stub(ModuleServices, 'deleteModule');
		});

		afterEach(function () {
			ModuleServices.deleteModule.restore();
		});

		it('should call next(err) if module is not specified', function (done) {
			const req = {
				body: {
				}
			};

			let nextCalled = false;
		   	ModuleController.deleteModule(req, {}, (err) => {
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

	   it('should return a moduleId if Module deletion succeed', function (done) {
			const req = {
				body: {
					moduleId: 'moduleId'
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

			ModuleServices.deleteModule.returns(new Promise((resolve, reject) => {
				resolve({ moduleId: req.body.moduleId });
			}));

			ModuleController.deleteModule(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'Module deleted');
					expect(res.jsonObject.data).to.have.property('moduleId', req.body.moduleId)
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
					moduleId: 'moduleId'
				}
			}

			ModuleServices.deleteModule.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				throw error;
			}));

			let nextCalled = false;
			ModuleController.deleteModule(req, {}, (err) => { 
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
					moduleId: 'moduleId'
				}
			}

			ModuleServices.deleteModule.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ModuleController.deleteModule(req, {}, (err) => { 
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
	describe('#getModules function', function () {
		beforeEach(function () {
			sinon.stub(ModuleServices, 'getModules');
		});

		afterEach(function () {
			ModuleServices.getModules.restore();
		});

		it('should call next(err) if no page specified', function (done) {
			const req = {
				query: {
					perPage: '20',
					toolId: 'defaulttoolId',
				}
			}
			let nextCalled = false;
			ModuleController.getModules(req, {}, (err) => {
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
			ModuleController.getModules(req, {}, (err) => {
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
			ModuleController.getModules(req, {}, (err) => {
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
			ModuleServices.getModules.returns(new Promise((resolve, reject) => {
				resolve([
					{ moduleId: 'module1' },
					{ moduleId: 'module2' },
					{ moduleId: 'module3' },
				]);
			}));

			ModuleController.getModules(req, res, () => { })
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
			ModuleServices.getModules.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ModuleController.getModules(req, {}, (err) => {
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
			ModuleServices.getModules.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ModuleController.getModules(req, {}, (err) => {
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
	describe('#getModule function', function () {
		beforeEach(function () {
			sinon.stub(ModuleServices, 'getModule');
		});

		afterEach(function () {
			ModuleServices.getModule.restore();
		});

		it('should call next(err) if no moduleId specified', function (done) {
			const req = {
				query: {
				}
			}
			let nextCalled = false;
			ModuleController.getModule(req, {}, (err) => {
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
					moduleId: 'abc',
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
			ModuleServices.getModule.returns(new Promise((resolve, reject) => {
				resolve({ moduleId: 'abc' });
			}));

			ModuleController.getModule(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('moduleId', 'abc');
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
					moduleId: 'abc',
				}
			}
			ModuleServices.getModule.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ModuleController.getModule(req, {}, (err) => {
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
					moduleId: 'abc',
				}
			}
			ModuleServices.getModule.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ModuleController.getModule(req, {}, (err) => {
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
	describe('#findModuleByName function', function () {
		beforeEach(function () {
			sinon.stub(ModuleServices, 'findModuleByName');
		});

		afterEach(function () {
			ModuleServices.findModuleByName.restore();
		});

		it('should call next(err) if name is not specified', function (done) {
			const req = {
				query: {
				}
			}

			let nextCalled = false;
			ModuleController.findModuleByName(req, {}, (err) => {
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
			ModuleServices.findModuleByName.returns(new Promise((resolve, reject) => {
				resolve({ 
					moduleId: 'abc',
					name: 'name1', 
				});
			}));

			ModuleController.findModuleByName(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('moduleId', 'abc');
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
			ModuleServices.findModuleByName.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ModuleController.findModuleByName(req, {}, (err) => {
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
			ModuleServices.findModuleByName.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ModuleController.findModuleByName(req, {}, (err) => {
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
