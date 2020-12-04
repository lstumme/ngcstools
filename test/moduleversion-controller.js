const { expect, assert } = require('chai');
const sinon = require('sinon');
const ModuleVersionController = require('../controllers/moduleversioncontroller');
const ModuleVersionServices = require('../services/moduleversionservices');

describe('ModuleVersion Controller', function () {
	describe('#createModuleVersion function', function () {
		beforeEach(function () {
			sinon.stub(ModuleVersionServices, 'createModuleVersion');
		});

		afterEach(function () {
			ModuleVersionServices.createModuleVersion.restore();
		});

		it('should call next(err) if module is not specified', function (done) {
			const req = {
				body: {
					version: 'defaultVersion', 
				}
			};
			let nextCalled = false;
			ModuleVersionController.createModuleVersion(req, {}, (err) => {
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
					module: 'defaultModule', 
				}
			};
			let nextCalled = false;
			ModuleVersionController.createModuleVersion(req, {}, (err) => {
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


		it('should return an object if ModuleVersion creation succeed', function (done) {
			const req = {
				body: {
					module: 'defaultModule', 
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

			ModuleVersionServices.createModuleVersion.returns(new Promise((resolve, reject) => {
				resolve({ 
					moduleversionId: 'moduleversionIdValue',
					module: req.body.module, 
					version: req.body.version, 
				});
			}));

			ModuleVersionController.createModuleVersion(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 201);
					expect(res.jsonObject).to.have.property('message', 'ModuleVersion created');
					expect(res.jsonObject.data).to.have.property('moduleversionId', 'moduleversionIdValue');
					expect(res.jsonObject.data).to.have.property('module', req.body.module); 
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
					module: 'defaultModule', 
					version: 'defaultVersion', 
				}
			};

			ModuleVersionServices.createModuleVersion.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));
			
			let nextCalled = false;
			ModuleVersionController.createModuleVersion(req, {}, (err) => {
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
					module: 'defaultModule', 
					version: 'defaultVersion', 
				}
			};

			ModuleVersionServices.createModuleVersion.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ModuleVersionController.createModuleVersion(req, {}, (err) => {
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
	describe('#updateModuleVersion function', function () {
		beforeEach(function () {
			sinon.stub(ModuleVersionServices, 'updateModuleVersion');
		});

		afterEach(function () {
			ModuleVersionServices.updateModuleVersion.restore();
		});

		it('should call next(err) if no moduleVersionId specified', function (done) {
			const req = {
				body: {
					informations: 'informations1', 
					location: 'location1', 
				}
			}

			let nextCalled = false;
			ModuleVersionController.updateModuleVersion(req, {}, (err) => {
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
					moduleVersionId: 'moduleVersionIdValue',
					informations: 'informations1', 
					location: 'location1', 
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

			ModuleVersionServices.updateModuleVersion.returns(new Promise((resolve, reject) => {
				resolve({ 
					moduleVersionId: 'moduleVersionIdValue',
					informations: 'informations1', 
					location: 'location1', 
				});
			}));

			ModuleVersionController.updateModuleVersion(req, res, () => {})
				.then(() => {
					expect(res).to.have.property('statusCode', 201);
					expect(res.jsonObject).to.have.property('message', 'ModuleVersion updated');
					expect(res.jsonObject.data).to.have.property('moduleVersionId', 'moduleVersionIdValue');
					expect(res.jsonObject.data).to.have.property('informations', req.body.informations); 
					expect(res.jsonObject.data).to.have.property('location', req.body.location); 
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
					moduleVersionId: 'moduleVersionIdValue',
					informations: 'informations1', 
					location: 'location1', 
				}
			};

			ModuleVersionServices.updateModuleVersion.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ModuleVersionController.updateModuleVersion(req, {}, (err) => {
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
					moduleVersionId: 'moduleVersionIdValue',
					informations: 'informations1', 
					location: 'location1', 
				}
			};

			ModuleVersionServices.updateModuleVersion.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ModuleVersionController.updateModuleVersion(req, {}, (err) => {
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


	describe('#deleteModuleVersion function', function () {
		beforeEach(function () {
			sinon.stub(ModuleVersionServices, 'deleteModuleVersion');
		});

		afterEach(function () {
			ModuleVersionServices.deleteModuleVersion.restore();
		});

		it('should call next(err) if moduleVersion is not specified', function (done) {
			const req = {
				body: {
				}
			};

			let nextCalled = false;
		   	ModuleVersionController.deleteModuleVersion(req, {}, (err) => {
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

	   it('should return a moduleVersionId if ModuleVersion deletion succeed', function (done) {
			const req = {
				body: {
					moduleVersionId: 'moduleVersionId'
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

			ModuleVersionServices.deleteModuleVersion.returns(new Promise((resolve, reject) => {
				resolve({ moduleVersionId: req.body.moduleVersionId });
			}));

			ModuleVersionController.deleteModuleVersion(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'ModuleVersion deleted');
					expect(res.jsonObject.data).to.have.property('moduleVersionId', req.body.moduleVersionId)
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
					moduleVersionId: 'moduleVersionId'
				}
			}

			ModuleVersionServices.deleteModuleVersion.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				throw error;
			}));

			let nextCalled = false;
			ModuleVersionController.deleteModuleVersion(req, {}, (err) => { 
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
					moduleVersionId: 'moduleVersionId'
				}
			}

			ModuleVersionServices.deleteModuleVersion.returns(new Promise((resolve, reject) => {
				const error = new Error('Undefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ModuleVersionController.deleteModuleVersion(req, {}, (err) => { 
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
	describe('#getModuleVersions function', function () {
		beforeEach(function () {
			sinon.stub(ModuleVersionServices, 'getModuleVersions');
		});

		afterEach(function () {
			ModuleVersionServices.getModuleVersions.restore();
		});

		it('should call next(err) if no page specified', function (done) {
			const req = {
				query: {
					perPage: '20',
					moduleId: 'defaultmoduleId',
				}
			}
			let nextCalled = false;
			ModuleVersionController.getModuleVersions(req, {}, (err) => {
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
					moduleId: 'defaultmoduleId',
				}
			}

			let nextCalled = false;
			ModuleVersionController.getModuleVersions(req, {}, (err) => {
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

		it('should call next(err) if no moduleId specified', function (done) {
			const req = {
				query: {
					perPage: '20',
					page: '1',
				}
			}

			let nextCalled = false;
			ModuleVersionController.getModuleVersions(req, {}, (err) => {
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
					moduleId: 'defaultmoduleId',
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
			ModuleVersionServices.getModuleVersions.returns(new Promise((resolve, reject) => {
				resolve([
					{ moduleVersionId: 'moduleVersion1' },
					{ moduleVersionId: 'moduleVersion2' },
					{ moduleVersionId: 'moduleVersion3' },
				]);
			}));

			ModuleVersionController.getModuleVersions(req, res, () => { })
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
					moduleId: 'defaultmoduleId',
				}
			}
			ModuleVersionServices.getModuleVersions.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ModuleVersionController.getModuleVersions(req, {}, (err) => {
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
					moduleId: 'defaultmoduleId',
				}
			}
			ModuleVersionServices.getModuleVersions.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ModuleVersionController.getModuleVersions(req, {}, (err) => {
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
	describe('#getModuleVersion function', function () {
		beforeEach(function () {
			sinon.stub(ModuleVersionServices, 'getModuleVersion');
		});

		afterEach(function () {
			ModuleVersionServices.getModuleVersion.restore();
		});

		it('should call next(err) if no moduleVersionId specified', function (done) {
			const req = {
				query: {
				}
			}
			let nextCalled = false;
			ModuleVersionController.getModuleVersion(req, {}, (err) => {
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
					moduleVersionId: 'abc',
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
			ModuleVersionServices.getModuleVersion.returns(new Promise((resolve, reject) => {
				resolve({ moduleVersionId: 'abc' });
			}));

			ModuleVersionController.getModuleVersion(req, res, () => { })
				.then(result => {
					expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('moduleVersionId', 'abc');
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
					moduleVersionId: 'abc',
				}
			}
			ModuleVersionServices.getModuleVersion.returns(new Promise((resolve, reject) => {
				throw new Error('Undefined Error');
			}));

			let nextCalled = false;
			ModuleVersionController.getModuleVersion(req, {}, (err) => {
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
					moduleVersionId: 'abc',
				}
			}
			ModuleVersionServices.getModuleVersion.returns(new Promise((resolve, reject) => {
				const error = new Error('Udefined Error');
				error.statusCode = 400;
				throw error;
			}));

			let nextCalled = false;
			ModuleVersionController.getModuleVersion(req, {}, (err) => {
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
