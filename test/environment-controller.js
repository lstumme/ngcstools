const { expect, assert } = require('chai');
const sinon = require('sinon');
const EnvironmentController = require('../controllers/environmentcontroller');
const EnvironmentServices = require('../services/environmentservices');

describe('Environment Controller', function () {
	describe('#createEnvironment function', function () {
		beforeEach(function () {
			sinon.stub(EnvironmentServices, 'createEnvironment');
		});

		afterEach(function () {
			EnvironmentServices.createEnvironment.restore();
		});

		it('should call next(err) if name is not specified', function (done) {
			const req = {
				body: {
				}
			};
			let nextCalled = false;
			EnvironmentController.createEnvironment(req, {}, (err) => {
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


		it('should return an object if Environment creation succeed', function (done) {
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

			EnvironmentServices.createEnvironment.returns(new Promise((resolve, reject) => {
				resolve({ 
					environmentId: 'environmentIdValue',
					name: req.body.name, 
				});
			}));

			EnvironmentController.createEnvironment(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 201);
					expect(res.jsonObject).to.have.property('message', 'Environment created');
					expect(res.jsonObject.data).to.have.property('environmentId', 'environmentIdValue');
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

			EnvironmentServices.createEnvironment.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));
			
			let nextCalled = false;
			EnvironmentController.createEnvironment(req, {}, (err) => {
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

			EnvironmentServices.createEnvironment.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			EnvironmentController.createEnvironment(req, {}, (err) => {
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
	describe('#updateEnvironment function', function () {
		beforeEach(function () {
			sinon.stub(EnvironmentServices, 'updateEnvironment');
		});

		afterEach(function () {
			EnvironmentServices.updateEnvironment.restore();
		});

		it('should call next(err) if no environmentId specified', function (done) {
			const req = {
				body: {
					informations: 'informations1', 
				}
			}

			let nextCalled = false;
			EnvironmentController.updateEnvironment(req, {}, (err) => {
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
					environmentId: 'environmentIdValue',
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

			EnvironmentServices.updateEnvironment.returns(new Promise((resolve, reject) => {
				resolve({ 
					environmentId: 'environmentIdValue',
					informations: 'informations1', 
				});
			}));

			EnvironmentController.updateEnvironment(req, res, () => {})
				.then(() => {
					expect(res).to.have.property('statusCode', 201);
					expect(res.jsonObject).to.have.property('message', 'Environment updated');
					expect(res.jsonObject.data).to.have.property('environmentId', 'environmentIdValue');
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
					environmentId: 'environmentIdValue',
					informations: 'informations1', 
				}
			};

			EnvironmentServices.updateEnvironment.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			EnvironmentController.updateEnvironment(req, {}, (err) => {
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
					environmentId: 'environmentIdValue',
					informations: 'informations1', 
				}
			};

			EnvironmentServices.updateEnvironment.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			EnvironmentController.updateEnvironment(req, {}, (err) => {
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


	describe('#deleteEnvironment function', function () {
		beforeEach(function () {
			sinon.stub(EnvironmentServices, 'deleteEnvironment');
		});

		afterEach(function () {
			EnvironmentServices.deleteEnvironment.restore();
		});

		it('should call next(err) if environment is not specified', function (done) {
			const req = {
				body: {
				}
			};

			let nextCalled = false;
		   	EnvironmentController.deleteEnvironment(req, {}, (err) => {
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

	   it('should return a environmentId if Environment deletion succeed', function (done) {
			const req = {
				body: {
					environmentId: 'environmentId'
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

			EnvironmentServices.deleteEnvironment.returns(new Promise((resolve, reject) => {
				resolve({ environmentId: req.body.environmentId });
			}));

			EnvironmentController.deleteEnvironment(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'Environment deleted');
					expect(res.jsonObject.data).to.have.property('environmentId', req.body.environmentId)
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
					environmentId: 'environmentId'
				}
			}

			EnvironmentServices.deleteEnvironment.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				throw error;
			}));

			let nextCalled = false;
			EnvironmentController.deleteEnvironment(req, {}, (err) => { 
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
					environmentId: 'environmentId'
				}
			}

			EnvironmentServices.deleteEnvironment.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			EnvironmentController.deleteEnvironment(req, {}, (err) => { 
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
	describe('#getEnvironments function', function () {
		beforeEach(function () {
			sinon.stub(EnvironmentServices, 'getEnvironments');
		});

		afterEach(function () {
			EnvironmentServices.getEnvironments.restore();
		});

		it('should call next(err) if no page specified', function (done) {
			const req = {
				query: {
					perPage: '20',
				}
			}
			let nextCalled = false;
			EnvironmentController.getEnvironments(req, {}, (err) => {
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
			EnvironmentController.getEnvironments(req, {}, (err) => {
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
			EnvironmentServices.getEnvironments.returns(new Promise((resolve, reject) => {
				resolve([
					{ environmentId: 'environment1' },
					{ environmentId: 'environment2' },
					{ environmentId: 'environment3' },
				]);
			}));

			EnvironmentController.getEnvironments(req, res, () => { })
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
			EnvironmentServices.getEnvironments.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			EnvironmentController.getEnvironments(req, {}, (err) => {
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
			EnvironmentServices.getEnvironments.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			EnvironmentController.getEnvironments(req, {}, (err) => {
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
	describe('#getEnvironment function', function () {
		beforeEach(function () {
			sinon.stub(EnvironmentServices, 'getEnvironment');
		});

		afterEach(function () {
			EnvironmentServices.getEnvironment.restore();
		});

		it('should call next(err) if no environmentId specified', function (done) {
			const req = {
				query: {
				}
			}
			let nextCalled = false;
			EnvironmentController.getEnvironment(req, {}, (err) => {
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
					environmentId: 'abc',
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
			EnvironmentServices.getEnvironment.returns(new Promise((resolve, reject) => {
				resolve({ environmentId: 'abc' });
			}));

			EnvironmentController.getEnvironment(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('environmentId', 'abc');
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
					environmentId: 'abc',
				}
			}
			EnvironmentServices.getEnvironment.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			EnvironmentController.getEnvironment(req, {}, (err) => {
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
					environmentId: 'abc',
				}
			}
			EnvironmentServices.getEnvironment.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			EnvironmentController.getEnvironment(req, {}, (err) => {
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
	describe('#findEnvironmentByName function', function () {
		beforeEach(function () {
			sinon.stub(EnvironmentServices, 'findEnvironmentByName');
		});

		afterEach(function () {
			EnvironmentServices.findEnvironmentByName.restore();
		});

		it('should call next(err) if name is not specified', function (done) {
			const req = {
				query: {
				}
			}

			let nextCalled = false;
			EnvironmentController.findEnvironmentByName(req, {}, (err) => {
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
			EnvironmentServices.findEnvironmentByName.returns(new Promise((resolve, reject) => {
				resolve({ 
					environmentId: 'abc',
					name: 'name1', 
				});
			}));

			EnvironmentController.findEnvironmentByName(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('environmentId', 'abc');
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
			EnvironmentServices.findEnvironmentByName.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			EnvironmentController.findEnvironmentByName(req, {}, (err) => {
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
			EnvironmentServices.findEnvironmentByName.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			EnvironmentController.findEnvironmentByName(req, {}, (err) => {
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

	describe('#addModuleVersionToEnvironment function', function () {
		beforeEach(function () {
			sinon.stub(EnvironmentServices, 'addModuleVersionToEnvironment');
		});

		afterEach(function () {
			EnvironmentServices.addModuleVersionToEnvironment.restore();
		});

		it('should call next(err) if EnvironmentId is not specified', function (done) {
			const req = {
				body: {
					moduleVersionId: 'moduleVersionId', 
				}
			}

			let nextCalled = false;
			EnvironmentController.addModuleVersionToEnvironment(req, {}, (err) => {
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

		it('should call next(err) if moduleVersionId is not specified', function (done) {
			const req = {
				body: {
					environmentId: 'environmentId', 
				}
			}

			let nextCalled = false;
			EnvironmentController.addModuleVersionToEnvironment(req, {}, (err) => {
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
				body: {
					environmentId: 'environmentId', 
					moduleVersionId: 'moduleVersionId1', 
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
			EnvironmentServices.addModuleVersionToEnvironment.returns(new Promise((resolve, reject) => {
				resolve({ 
					environmentId: 'abc',
					modules: ['moduleVersionId1'], 
				});
			}));

			EnvironmentController.addModuleVersionToEnvironment(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'moduleVersion added');
					expect(res.jsonObject.data).to.have.property('environmentId', 'abc');
					expect(res.jsonObject.data.modules).to.have.length(1);
					expect(res.jsonObject.data.modules[0]).to.be.equal('moduleVersionId1');
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
				body: {
					environmentId: 'environmentId', 
					moduleVersionId: 'moduleVersionId1', 
				}
			}
			EnvironmentServices.addModuleVersionToEnvironment.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			EnvironmentController.addModuleVersionToEnvironment(req, {}, (err) => {
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
				body: {
					environmentId: 'environmentId', 
					moduleVersionId: 'moduleVersionId1', 
				}
			}
			EnvironmentServices.addModuleVersionToEnvironment.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			EnvironmentController.addModuleVersionToEnvironment(req, {}, (err) => {
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
	describe('#removeModuleVersionFromEnvironment function', function () {
		beforeEach(function () {
			sinon.stub(EnvironmentServices, 'removeModuleVersionFromEnvironment');
		});

		afterEach(function () {
			EnvironmentServices.removeModuleVersionFromEnvironment.restore();
		});

		it('should call next(err) if EnvironmentId is not specified', function (done) {
			const req = {
				body: {
					moduleVersionId: 'moduleVersionId', 
				}
			}

			let nextCalled = false;
			EnvironmentController.removeModuleVersionFromEnvironment(req, {}, (err) => {
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

		it('should call next(err) if moduleVersionId is not specified', function (done) {
			const req = {
				body: {
					environmentId: 'environmentId', 
				}
			}

			let nextCalled = false;
			EnvironmentController.removeModuleVersionFromEnvironment(req, {}, (err) => {
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
				body: {
					environmentId: 'environmentId', 
					moduleVersionId: 'moduleVersionId1', 
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
			EnvironmentServices.removeModuleVersionFromEnvironment.returns(new Promise((resolve, reject) => {
				resolve({ 
					environmentId: 'abc',
					modules: [], 
				});
			}));

			EnvironmentController.removeModuleVersionFromEnvironment(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'moduleVersion removed');
					expect(res.jsonObject.data).to.have.property('environmentId', 'abc');
					expect(res.jsonObject.data.modules).to.have.length(0);
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
				body: {
					environmentId: 'environmentId', 
					moduleVersionId: 'moduleVersionId1', 
				}
			}
			EnvironmentServices.removeModuleVersionFromEnvironment.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			EnvironmentController.removeModuleVersionFromEnvironment(req, {}, (err) => {
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
				body: {
					environmentId: 'environmentId', 
					moduleVersionId: 'moduleVersionId1', 
				}
			}
			EnvironmentServices.removeModuleVersionFromEnvironment.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			EnvironmentController.removeModuleVersionFromEnvironment(req, {}, (err) => {
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
	describe('#addToolVersionToEnvironment function', function () {
		beforeEach(function () {
			sinon.stub(EnvironmentServices, 'addToolVersionToEnvironment');
		});

		afterEach(function () {
			EnvironmentServices.addToolVersionToEnvironment.restore();
		});

		it('should call next(err) if EnvironmentId is not specified', function (done) {
			const req = {
				body: {
					toolVersionId: 'toolVersionId', 
				}
			}

			let nextCalled = false;
			EnvironmentController.addToolVersionToEnvironment(req, {}, (err) => {
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

		it('should call next(err) if toolVersionId is not specified', function (done) {
			const req = {
				body: {
					environmentId: 'environmentId', 
				}
			}

			let nextCalled = false;
			EnvironmentController.addToolVersionToEnvironment(req, {}, (err) => {
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
				body: {
					environmentId: 'environmentId', 
					toolVersionId: 'toolVersionId1', 
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
			EnvironmentServices.addToolVersionToEnvironment.returns(new Promise((resolve, reject) => {
				resolve({ 
					environmentId: 'abc',
					tools: ['toolVersionId1'], 
				});
			}));

			EnvironmentController.addToolVersionToEnvironment(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'toolVersion added');
					expect(res.jsonObject.data).to.have.property('environmentId', 'abc');
					expect(res.jsonObject.data.tools).to.have.length(1);
					expect(res.jsonObject.data.tools[0]).to.be.equal('toolVersionId1');
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
				body: {
					environmentId: 'environmentId', 
					toolVersionId: 'toolVersionId1', 
				}
			}
			EnvironmentServices.addToolVersionToEnvironment.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			EnvironmentController.addToolVersionToEnvironment(req, {}, (err) => {
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
				body: {
					environmentId: 'environmentId', 
					toolVersionId: 'toolVersionId1', 
				}
			}
			EnvironmentServices.addToolVersionToEnvironment.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			EnvironmentController.addToolVersionToEnvironment(req, {}, (err) => {
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
	describe('#removeToolVersionFromEnvironment function', function () {
		beforeEach(function () {
			sinon.stub(EnvironmentServices, 'removeToolVersionFromEnvironment');
		});

		afterEach(function () {
			EnvironmentServices.removeToolVersionFromEnvironment.restore();
		});

		it('should call next(err) if EnvironmentId is not specified', function (done) {
			const req = {
				body: {
					toolVersionId: 'toolVersionId', 
				}
			}

			let nextCalled = false;
			EnvironmentController.removeToolVersionFromEnvironment(req, {}, (err) => {
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

		it('should call next(err) if toolVersionId is not specified', function (done) {
			const req = {
				body: {
					environmentId: 'environmentId', 
				}
			}

			let nextCalled = false;
			EnvironmentController.removeToolVersionFromEnvironment(req, {}, (err) => {
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
				body: {
					environmentId: 'environmentId', 
					toolVersionId: 'toolVersionId1', 
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
			EnvironmentServices.removeToolVersionFromEnvironment.returns(new Promise((resolve, reject) => {
				resolve({ 
					environmentId: 'abc',
					tools: [], 
				});
			}));

			EnvironmentController.removeToolVersionFromEnvironment(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'toolVersion removed');
					expect(res.jsonObject.data).to.have.property('environmentId', 'abc');
					expect(res.jsonObject.data.tools).to.have.length(0);
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
				body: {
					environmentId: 'environmentId', 
					toolVersionId: 'toolVersionId1', 
				}
			}
			EnvironmentServices.removeToolVersionFromEnvironment.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			EnvironmentController.removeToolVersionFromEnvironment(req, {}, (err) => {
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
				body: {
					environmentId: 'environmentId', 
					toolVersionId: 'toolVersionId1', 
				}
			}
			EnvironmentServices.removeToolVersionFromEnvironment.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			EnvironmentController.removeToolVersionFromEnvironment(req, {}, (err) => {
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
