const { expect, should, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const { ObjectId } = require('mongodb');
const ModuleVersion = require('../model/moduleversion');
const Module = require('../model/module');
const Tool = require('../model/tool');
const ToolVersion = require('../model/toolversion');
const EnvironmentServices = require('../services/environmentservices');
const Environment = require('../model/environment');

describe('EnvironmentServices', function () {
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
			defaultEnvironment = Environment({
				name: 'defaultName',
			});
			defaultEnvironment = await defaultEnvironment.save();
			
		});

		it('should throw an error if Environment with given name already exists', function (done) {
			const params = {
				name: 'defaultName',
			};

            EnvironmentServices.createEnvironment(params)
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', `E11000 duplicate key error dup key: { : "${params.name}" }`);
                    done();
                })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				})
		});

		it('should create a Environment', function (done) {
			const params = {
				name: 'otherName',
			};
            EnvironmentServices.createEnvironment(params)
                .then(result => {
					expect(result).to.have.ownProperty('environmentId');
					expect(result).to.have.property('name', params.name);
					done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('UserService Error');
					done();
                })
		});
	});

	describe('#updateEnvironment function', function () {
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

		it('should throw an error if Environment to update is not found', function (done) {
			const params = {
				informations: 'newInformations',
			};
			EnvironmentServices.updateEnvironment(params)
				.then(result => {
					assert.fail('updateEnvironment error');
					done();
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Could not find environment.');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should update Environment informations if informations is provided', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				informations: 'newInformations',
			};

			EnvironmentServices.updateEnvironment(params)
				.then(result => {
					expect(result).to.have.property('environmentId', params.environmentId);
					expect(result).to.have.property('informations', params.informations);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});	

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

		it('should throw an error if Environment to delete is not found', function (done) {
			const params = {
				environmentId: ObjectId().toString(),
			};
			EnvironmentServices.deleteEnvironment(params)
				.then(result => {
					assert.fail('deleteEnvironment error');
					done();
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Environment to delete was not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should delete Environment if Environment exists', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
			};
			EnvironmentServices.deleteEnvironment(params)
				.then(result => {
					expect(result).to.have.property('environmentId', params.environmentId);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
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

		it('should throw an error if range out of bounds', function (done) {
            EnvironmentServices.getEnvironments({ page: '3', perPage: '10' })
                .then(result => {
                    assert.fail('Error');
                })
                .catch(err => {
                    expect(err).to.have.property('message', 'Pagination out of bounds.');
                    expect(err).to.have.property('statusCode', 400);
                    done();
                })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should return an object containing the required data and the number if pages', function (done) {
            const perPage = '10';
            EnvironmentServices.getEnvironments({ page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 2);
                    expect(result).to.have.property('environments').to.have.lengthOf(perPage);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail(err);
                    done();
                })			
		});

        it('should return an object containing the required data and the number of pages 2', function (done) {
            const perPage = '7';
            EnvironmentServices.getEnvironments({ page: '1', perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('environments').to.have.lengthOf(perPage);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail(err);
                    done();
                })
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
	
		it('should throw an error if Environment not found', function (done) {
			EnvironmentServices.getEnvironment({ environmentId: ObjectId().toString() })
				.then(result => {
					assert.fail('Error');
				})
				.catch(err => {
					expect(err).to.have.property('statusCode', 404);
					expect(err).to.have.property('message', 'Environment not found');
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				})
		});

		it('should return an object if Environment found', function (done) {
			EnvironmentServices.getEnvironment({ environmentId: defaultEnvironment._id.toString() })
				.then(result => {
					expect(result).to.have.property('environmentId', defaultEnvironment._id.toString());
					expect(result).to.have.property('name', defaultEnvironment.name);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				})
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

		it('should throw an error if Environment is not found', function (done) {
			const params = {
				name: 'otherEnvironmentName',
			};
			EnvironmentServices.findEnvironmentByName(params)
				.then(environment => {
					assert.fail('Error');
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Could not find Environment');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should return an object if Environment is found', function (done) {
			const params = {
				name: defaultEnvironment.name,
			};
			EnvironmentServices.findEnvironmentByName(params)
				.then(environment => {
					expect(environment).not.to.be.null;
					expect(environment).to.have.property('environmentId', defaultEnvironment._id.toString());
					expect(environment).to.have.property('name', defaultEnvironment.name);
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

		it('should throw an error if Environment is not found', function (done) {
			const params = {
				environmentId: new ObjectId().toString(),
				moduleVersionId: innerModuleVersion._id.toString(), 
			};

			EnvironmentServices.addModuleVersionToEnvironment(params)
				.then(() => {
					assert.fail(err);
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Environment not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should throw an error if moduleVersion is not found', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				moduleVersionId: new ObjectId().toString(), 
			};

			EnvironmentServices.addModuleVersionToEnvironment(params)
				.then(() => {
					assert.fail(err);
				})
				.catch(err => {
					expect(err).to.have.property('message', 'ModuleVersion to add not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should throw an error if moduleVersion is already in modules', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				moduleVersionId: innerModuleVersion._id.toString(), 
			};

			defaultEnvironment.modules.push(innerModuleVersion._id.toString());
			defaultEnvironment.save()
				.then(() => {
					EnvironmentServices.addModuleVersionToEnvironment(params)
						.then(() => {
							assert.fail(err);
						})
						.catch(err => {
							expect(err).to.have.property('message', 'ModuleVersion already in modules');
							expect(err).to.have.property('statusCode', 400);
							done();
						})
						.catch(err => {
							console.log(err);
							assert.fail(err);
							done();
						});
				})
		});
		
		it('should add ModuleVersion to Environment modules', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				moduleVersionId: innerModuleVersion._id.toString(), 
			};

			EnvironmentServices.addModuleVersionToEnvironment(params)
				.then(() => {
					Environment.findOne({_id: defaultEnvironment._id.toString() })
						.then(newEnvironment => {
							expect(newEnvironment).not.to.be.null;
							expect(newEnvironment.modules.length).to.be.equal(1);
							expect(newEnvironment.modules.includes(innerModuleVersion._id.toString())).to.be.true;							
							done();
						})
					.catch(err => {
						console.log(err);
						assert.fail(err);
						done();
					})
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

		it('should throw an error if Environment is not found', function (done) {
			const params = {
				environmentId: new ObjectId().toString(),
				moduleVersionId: innerModuleVersion._id.toString(), 
			};

			EnvironmentServices.removeModuleVersionFromEnvironment(params)
				.then(() => {
					assert.fail(err);
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Environment not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should throw an error if moduleVersion is not found', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				moduleVersionId: new ObjectId().toString(), 
			};

			EnvironmentServices.removeModuleVersionFromEnvironment(params)
				.then(() => {
					assert.fail(err);
				})
				.catch(err => {
					expect(err).to.have.property('message', 'ModuleVersion to remove not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should throw an error if moduleVersion is not in modules', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				moduleVersionId: innerModuleVersion._id.toString(), 
			};

			defaultEnvironment.modules = [];
			defaultEnvironment.save()
				.then(() => {
					EnvironmentServices.removeModuleVersionFromEnvironment(params)
						.then(() => {
							assert.fail(err);
						})
						.catch(err => {
							expect(err).to.have.property('message', 'ModuleVersion not in modules');
							expect(err).to.have.property('statusCode', 400);
							done();
						})
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});
		
		it('should remove ModuleVersion from Environment modules', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				moduleVersionId: innerModuleVersion._id.toString(), 
			};

			EnvironmentServices.removeModuleVersionFromEnvironment(params)
				.then(() => {
					Environment.findOne({_id: defaultEnvironment._id.toString() })
						.then(newEnvironment => {
							expect(newEnvironment).not.to.be.null;
							expect(newEnvironment.modules.length).to.be.equal(0);
							expect(newEnvironment.modules.includes(innerModuleVersion._id.toString())).to.be.false;							
							done();
						})
						.catch(err => {
							console.log(err);
							assert.fail(err);
							done();
						})
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

		it('should throw an error if Environment is not found', function (done) {
			const params = {
				environmentId: new ObjectId().toString(),
				toolVersionId: innerToolVersion._id.toString(), 
			};

			EnvironmentServices.addToolVersionToEnvironment(params)
				.then(() => {
					assert.fail(err);
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Environment not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should throw an error if toolVersion is not found', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				toolVersionId: new ObjectId().toString(), 
			};

			EnvironmentServices.addToolVersionToEnvironment(params)
				.then(() => {
					assert.fail(err);
				})
				.catch(err => {
					expect(err).to.have.property('message', 'ToolVersion to add not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should throw an error if toolVersion is already in tools', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				toolVersionId: innerToolVersion._id.toString(), 
			};

			defaultEnvironment.tools.push(innerToolVersion._id.toString());
			defaultEnvironment.save()
				.then(() => {
					EnvironmentServices.addToolVersionToEnvironment(params)
						.then(() => {
							assert.fail(err);
						})
						.catch(err => {
							expect(err).to.have.property('message', 'ToolVersion already in tools');
							expect(err).to.have.property('statusCode', 400);
							done();
						})
						.catch(err => {
							console.log(err);
							assert.fail(err);
							done();
						});
				})
		});
		
		it('should add ToolVersion to Environment tools', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				toolVersionId: innerToolVersion._id.toString(), 
			};

			EnvironmentServices.addToolVersionToEnvironment(params)
				.then(() => {
					Environment.findOne({_id: defaultEnvironment._id.toString() })
						.then(newEnvironment => {
							expect(newEnvironment).not.to.be.null;
							expect(newEnvironment.tools.length).to.be.equal(1);
							expect(newEnvironment.tools.includes(innerToolVersion._id.toString())).to.be.true;							
							done();
						})
					.catch(err => {
						console.log(err);
						assert.fail(err);
						done();
					})
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

		it('should throw an error if Environment is not found', function (done) {
			const params = {
				environmentId: new ObjectId().toString(),
				toolVersionId: innerToolVersion._id.toString(), 
			};

			EnvironmentServices.removeToolVersionFromEnvironment(params)
				.then(() => {
					assert.fail(err);
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Environment not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should throw an error if toolVersion is not found', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				toolVersionId: new ObjectId().toString(), 
			};

			EnvironmentServices.removeToolVersionFromEnvironment(params)
				.then(() => {
					assert.fail(err);
				})
				.catch(err => {
					expect(err).to.have.property('message', 'ToolVersion to remove not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should throw an error if toolVersion is not in tools', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				toolVersionId: innerToolVersion._id.toString(), 
			};

			defaultEnvironment.tools = [];
			defaultEnvironment.save()
				.then(() => {
					EnvironmentServices.removeToolVersionFromEnvironment(params)
						.then(() => {
							assert.fail(err);
						})
						.catch(err => {
							expect(err).to.have.property('message', 'ToolVersion not in tools');
							expect(err).to.have.property('statusCode', 400);
							done();
						})
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});
		
		it('should remove ToolVersion from Environment tools', function (done) {
			const params = {
				environmentId: defaultEnvironment._id.toString(),
				toolVersionId: innerToolVersion._id.toString(), 
			};

			EnvironmentServices.removeToolVersionFromEnvironment(params)
				.then(() => {
					Environment.findOne({_id: defaultEnvironment._id.toString() })
						.then(newEnvironment => {
							expect(newEnvironment).not.to.be.null;
							expect(newEnvironment.tools.length).to.be.equal(0);
							expect(newEnvironment.tools.includes(innerToolVersion._id.toString())).to.be.false;							
							done();
						})
						.catch(err => {
							console.log(err);
							assert.fail(err);
							done();
						})
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});
	});



});
