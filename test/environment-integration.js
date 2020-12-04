const { expect, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const ModuleVersion = require('../model/moduleversion');
const Module = require('../model/module');
const Tool = require('../model/tool');
const ToolVersion = require('../model/toolversion');
const EnvironmentController = require('../controllers/environmentcontroller');
const Environment = require('../model/environment');

describe('Environment Integration', function () {
describe('#createEnvironment function', function () {
		let defaultEnvironment;

		before(async () => {
			await dbHandler.connect();
			await Environment.createIndexes();
		});

		after(async () => {
			await dbHandler.closeDatabase();
		});

		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		beforeEach(async () => {
			
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

			EnvironmentController.createEnvironment(req, res, () => { })
				.then(() => {
	                expect(res).to.have.property('statusCode', 201);
	                expect(res.jsonObject).to.have.property('message', 'Environment created');
	                expect(res.jsonObject.data).to.have.ownProperty('environmentId');
					expect(res.jsonObject.data).to.have.property('name', req.body.name); 
					done();				
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});		
		});
	});
	describe('#updateEnvironment function', function () {
	});

	describe('#deleteEnvironment function', function () {
		let defaultEnvironment;

		before(async () => {
			await dbHandler.connect();
			await Environment.createIndexes();
		});

		after(async () => {
			await dbHandler.closeDatabase();
		});

		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			defaultEnvironment = Environment({
				name: 'defaultName',
			});
			defaultEnvironment = await defaultEnvironment.save();
			
		});

       it('should return a environmentId if Environment deletion succeed', function (done) {
            const req = {
                body: {
                    environmentId: defaultEnvironment._id.toString(),
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


	});

	describe('#getEnvironments function', function () {
		let defaultEnvironment;

		before(async () => {
			await dbHandler.connect();
			await Environment.createIndexes();
		});

		after(async () => {
			await dbHandler.closeDatabase();
		});

		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			
			for (let i = 0; i < 20; i++) {
				const environment = new Environment({
					name: 'Name_' + i,
				});
				await environment.save();
			}			
		});

        it('should return an array if request succeed', function (done) {
            const req = {
                query: {
					page: '1',
                    perPage: '10'
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

            EnvironmentController.getEnvironments(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject.environments).to.have.lengthOf(10);
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
        });
	});

	describe('#getEnvironment function', function () {
		let defaultEnvironment;

		before(async () => {
			await dbHandler.connect();
			await Environment.createIndexes();
		});

		after(async () => {
			await dbHandler.closeDatabase();
		});

		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			defaultEnvironment = Environment({
				name: 'defaultName',
			});
			defaultEnvironment = await defaultEnvironment.save();
			
		});

        it('should return an object if request succeed', function (done) {
            const req = {
                query: {
                    environmentId: defaultEnvironment._id.toString(),
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

            EnvironmentController.getEnvironment(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject).to.have.property('environmentId', defaultEnvironment._id.toString());
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
        });

	});

	describe('#findEnvironmentByName function', function () {
		let defaultEnvironment;

		before(async () => {
			await dbHandler.connect();
			await Environment.createIndexes();
		});

		after(async () => {
			await dbHandler.closeDatabase();
		});

		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			defaultEnvironment = Environment({
				name: 'defaultName',
			});
			defaultEnvironment = await defaultEnvironment.save();
			
		});

        it('should return an object if request succeed', function (done) {
            const req = {
                query: {
					name: 'defaultName',
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

            EnvironmentController.findEnvironmentByName(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject).to.have.property('environmentId', defaultEnvironment._id.toString());
					expect(res.jsonObject).to.have.property('name', 'defaultName');
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
        });
	});


	describe('#addModuleVersionToEnvironment function', function () {
		let defaultEnvironment;

		let innerModuleVersion;
		before(async () => {
			await dbHandler.connect();
			await Environment.createIndexes();
		});

		after(async () => {
			await dbHandler.closeDatabase();
		});

		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			defaultEnvironment = Environment({
				name: 'defaultName',
			});
			defaultEnvironment = await defaultEnvironment.save();
			
			innerTool = Tool({
				name: 'innerName',
			});
			innerTool = await innerTool.save();
			
			
			innerModule = Module({
				name: 'innerName',
				tool: innerTool._id.toString(),
			});
			innerModule = await innerModule.save();
			
			
			innerModuleVersion = ModuleVersion({
				version: 'innerVersion',
				module: innerModule._id.toString(),
			});
			innerModuleVersion = await innerModuleVersion.save();
			
		});

        it('should return an object if request succeed', function (done) {
            const req = {
                body: {
					environmentId: defaultEnvironment._id.toString(),
					moduleVersionId: innerModuleVersion._id.toString(), 
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

            EnvironmentController.addModuleVersionToEnvironment(req, res, () => { })
				.then(() => {
	                expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'moduleVersion added');
	                expect(res.jsonObject.data).to.have.property('environmentId', defaultEnvironment._id.toString());
	                expect(res.jsonObject.data).to.have.ownProperty('modules');
					expect(res.jsonObject.data.modules.length).to.be.equal(1);
					expect(res.jsonObject.data.modules.includes(innerModuleVersion._id.toString())).to.be.true;							
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
        });
	});
	describe('#removeModuleVersionFromEnvironment function', function () {
		let defaultEnvironment;

		let innerModuleVersion;
		before(async () => {
			await dbHandler.connect();
			await Environment.createIndexes();
		});

		after(async () => {
			await dbHandler.closeDatabase();
		});

		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			defaultEnvironment = Environment({
				name: 'defaultName',
			});
			defaultEnvironment = await defaultEnvironment.save();
						
			innerTool = Tool({
				name: 'innerName',
			});
			innerTool = await innerTool.save();
			
			
			innerModule = Module({
				name: 'innerName',
				tool: innerTool._id.toString(),
			});
			innerModule = await innerModule.save();
			
			
			innerModuleVersion = ModuleVersion({
				version: 'innerVersion',
				module: innerModule._id.toString(),
			});
			innerModuleVersion = await innerModuleVersion.save();
			
			
			defaultEnvironment.modules.push(innerModuleVersion._id);
			defaultEnvironment = await defaultEnvironment.save();
		});

        it('should return an object if request succeed', function (done) {
            const req = {
                body: {
					environmentId: defaultEnvironment._id.toString(),
					moduleVersionId: innerModuleVersion._id.toString(), 
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

            EnvironmentController.removeModuleVersionFromEnvironment(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'moduleVersion removed');
	                expect(res.jsonObject.data).to.have.property('environmentId', defaultEnvironment._id.toString());
	                expect(res.jsonObject.data).to.have.ownProperty('modules');
					expect(res.jsonObject.data.modules.length).to.be.equal(0);
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
        });

	});
	describe('#addToolVersionToEnvironment function', function () {
		let defaultEnvironment;

		let innerToolVersion;
		before(async () => {
			await dbHandler.connect();
			await Environment.createIndexes();
		});

		after(async () => {
			await dbHandler.closeDatabase();
		});

		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			defaultEnvironment = Environment({
				name: 'defaultName',
			});
			defaultEnvironment = await defaultEnvironment.save();
			
			innerTool = Tool({
				name: 'innerName',
			});
			innerTool = await innerTool.save();
			
			
			innerToolVersion = ToolVersion({
				version: 'innerVersion',
				tool: innerTool._id.toString(),
			});
			innerToolVersion = await innerToolVersion.save();
			
		});

        it('should return an object if request succeed', function (done) {
            const req = {
                body: {
					environmentId: defaultEnvironment._id.toString(),
					toolVersionId: innerToolVersion._id.toString(), 
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

            EnvironmentController.addToolVersionToEnvironment(req, res, () => { })
				.then(() => {
	                expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'toolVersion added');
	                expect(res.jsonObject.data).to.have.property('environmentId', defaultEnvironment._id.toString());
	                expect(res.jsonObject.data).to.have.ownProperty('tools');
					expect(res.jsonObject.data.tools.length).to.be.equal(1);
					expect(res.jsonObject.data.tools.includes(innerToolVersion._id.toString())).to.be.true;							
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
        });
	});
	describe('#removeToolVersionFromEnvironment function', function () {
		let defaultEnvironment;

		let innerToolVersion;
		before(async () => {
			await dbHandler.connect();
			await Environment.createIndexes();
		});

		after(async () => {
			await dbHandler.closeDatabase();
		});

		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			defaultEnvironment = Environment({
				name: 'defaultName',
			});
			defaultEnvironment = await defaultEnvironment.save();
						
			innerTool = Tool({
				name: 'innerName',
			});
			innerTool = await innerTool.save();
			
			
			innerToolVersion = ToolVersion({
				version: 'innerVersion',
				tool: innerTool._id.toString(),
			});
			innerToolVersion = await innerToolVersion.save();
			
			
			defaultEnvironment.tools.push(innerToolVersion._id);
			defaultEnvironment = await defaultEnvironment.save();
		});

        it('should return an object if request succeed', function (done) {
            const req = {
                body: {
					environmentId: defaultEnvironment._id.toString(),
					toolVersionId: innerToolVersion._id.toString(), 
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

            EnvironmentController.removeToolVersionFromEnvironment(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
					expect(res.jsonObject).to.have.property('message', 'toolVersion removed');
	                expect(res.jsonObject.data).to.have.property('environmentId', defaultEnvironment._id.toString());
	                expect(res.jsonObject.data).to.have.ownProperty('tools');
					expect(res.jsonObject.data.tools.length).to.be.equal(0);
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
        });

	});


});
