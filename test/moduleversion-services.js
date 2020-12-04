const { expect, should, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const { ObjectId } = require('mongodb');
const Module = require('../model/module');
const Tool = require('../model/tool');
const ModuleVersionServices = require('../services/moduleversionservices');
const ModuleVersion = require('../model/moduleversion');

describe('ModuleVersionServices', function () {
	describe('#createModuleVersion function', function () {
				let defaultModuleVersion;
				let defaultModule;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await ModuleVersion.createIndexes();
		});
		
		after(async () => {
			await dbHandler.closeDatabase();
		});
		
		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			defaultTool = Tool({
				name: 'defaultName',
			});
			defaultTool = await defaultTool.save();
			
			
			defaultModule = Module({
				name: 'defaultName',
				tool: defaultTool._id.toString(),
			});
			defaultModule = await defaultModule.save();
			
			
			defaultModuleVersion = ModuleVersion({
				version: 'defaultVersion',
				module: defaultModule._id.toString(),
			});
			defaultModuleVersion = await defaultModuleVersion.save();
			
		});

		it('should create a ModuleVersion', function (done) {
			const params = {
				version: 'version',
				module: defaultModule._id.toString(),
			};
            ModuleVersionServices.createModuleVersion(params)
                .then(result => {
					expect(result).to.have.ownProperty('moduleVersionId');
					expect(result).to.have.property('version', params.version);
					expect(result).to.have.property('module', params.module);
					done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('UserService Error');
					done();
                })
		});
	});

	describe('#updateModuleVersion function', function () {
				let defaultModuleVersion;
				let defaultModule;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await ModuleVersion.createIndexes();
		});
		
		after(async () => {
			await dbHandler.closeDatabase();
		});
		
		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			defaultTool = Tool({
				name: 'defaultName',
			});
			defaultTool = await defaultTool.save();
			
			
			defaultModule = Module({
				name: 'defaultName',
				tool: defaultTool._id.toString(),
			});
			defaultModule = await defaultModule.save();
			
			
			defaultModuleVersion = ModuleVersion({
				version: 'defaultVersion',
				module: defaultModule._id.toString(),
			});
			defaultModuleVersion = await defaultModuleVersion.save();
			

		});

		it('should throw an error if ModuleVersion to update is not found', function (done) {
			const params = {
				informations: 'newInformations',
				location: 'newLocation',
			};
			ModuleVersionServices.updateModuleVersion(params)
				.then(result => {
					assert.fail('updateModuleVersion error');
					done();
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Could not find moduleVersion.');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should update ModuleVersion informations if informations is provided', function (done) {
			const params = {
				moduleVersionId: defaultModuleVersion._id.toString(),
				informations: 'newInformations',
			};

			ModuleVersionServices.updateModuleVersion(params)
				.then(result => {
					expect(result).to.have.property('moduleVersionId', params.moduleVersionId);
					expect(result).to.have.property('informations', params.informations);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});	

		it('should update ModuleVersion location if location is provided', function (done) {
			const params = {
				moduleVersionId: defaultModuleVersion._id.toString(),
				location: 'newLocation',
			};

			ModuleVersionServices.updateModuleVersion(params)
				.then(result => {
					expect(result).to.have.property('moduleVersionId', params.moduleVersionId);
					expect(result).to.have.property('location', params.location);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});	

		it('should update ModuleVersion properties if everything is provided', function (done) {
			const params = {
				moduleVersionId: defaultModuleVersion._id.toString(),
				informations: 'newInformations',
				location: 'newLocation',
			};

			ModuleVersionServices.updateModuleVersion(params)
				.then(result => {
					expect(result).to.have.property('moduleVersionId', params.moduleVersionId);
					expect(result).to.have.property('informations', params.informations);
					expect(result).to.have.property('location', params.location);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});
	});

	describe('#deleteModuleVersion function', function () {
				let defaultModuleVersion;
				let defaultModule;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await ModuleVersion.createIndexes();
		});
		
		after(async () => {
			await dbHandler.closeDatabase();
		});
		
		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			defaultTool = Tool({
				name: 'defaultName',
			});
			defaultTool = await defaultTool.save();
			
			
			defaultModule = Module({
				name: 'defaultName',
				tool: defaultTool._id.toString(),
			});
			defaultModule = await defaultModule.save();
			
			
			defaultModuleVersion = ModuleVersion({
				version: 'defaultVersion',
				module: defaultModule._id.toString(),
			});
			defaultModuleVersion = await defaultModuleVersion.save();
			
		});

		it('should throw an error if ModuleVersion to delete is not found', function (done) {
			const params = {
				moduleVersionId: ObjectId().toString(),
			};
			ModuleVersionServices.deleteModuleVersion(params)
				.then(result => {
					assert.fail('deleteModuleVersion error');
					done();
				})
				.catch(err => {
					expect(err).to.have.property('message', 'ModuleVersion to delete was not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should delete ModuleVersion if ModuleVersion exists', function (done) {
			const params = {
				moduleVersionId: defaultModuleVersion._id.toString(),
			};
			ModuleVersionServices.deleteModuleVersion(params)
				.then(result => {
					expect(result).to.have.property('moduleVersionId', params.moduleVersionId);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});		
	});

	describe('#getModuleVersions function', function () {
				let defaultModuleVersion;
				let defaultModule;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await ModuleVersion.createIndexes();
		});
		
		after(async () => {
			await dbHandler.closeDatabase();
		});
		
		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			defaultTool = Tool({
				name: 'defaultName',
			});
			defaultTool = await defaultTool.save();
			
			
			defaultModule = Module({
				name: 'defaultName',
				tool: defaultTool._id.toString(),
			});
			defaultModule = await defaultModule.save();
			
			
			
			for (let i = 0; i < 20; i++) {
				const moduleVersion = new ModuleVersion({
					version: 'Version_' + i,
					module: defaultModule._id.toString(),
				});
				await moduleVersion.save();
			}			
		});

		it('should throw an error if range out of bounds', function (done) {
            ModuleVersionServices.getModuleVersions({ moduleId: defaultModule._id.toString(), page: '3', perPage: '10' })
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
            ModuleVersionServices.getModuleVersions({ moduleId: defaultModule._id.toString(), page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 2);
                    expect(result).to.have.property('moduleVersions').to.have.lengthOf(perPage);
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
            ModuleVersionServices.getModuleVersions({ moduleId: defaultModule._id.toString(), page: '1', perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('moduleVersions').to.have.lengthOf(perPage);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail(err);
                    done();
                })
        });
	});

	describe('#getModuleVersion function', function () {
				let defaultModuleVersion;
				let defaultModule;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await ModuleVersion.createIndexes();
		});
		
		after(async () => {
			await dbHandler.closeDatabase();
		});
		
		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			defaultTool = Tool({
				name: 'defaultName',
			});
			defaultTool = await defaultTool.save();
			
			
			defaultModule = Module({
				name: 'defaultName',
				tool: defaultTool._id.toString(),
			});
			defaultModule = await defaultModule.save();
			
			
			defaultModuleVersion = ModuleVersion({
				version: 'defaultVersion',
				module: defaultModule._id.toString(),
			});
			defaultModuleVersion = await defaultModuleVersion.save();
			
		});
	
		it('should throw an error if ModuleVersion not found', function (done) {
			ModuleVersionServices.getModuleVersion({ moduleVersionId: ObjectId().toString() })
				.then(result => {
					assert.fail('Error');
				})
				.catch(err => {
					expect(err).to.have.property('statusCode', 404);
					expect(err).to.have.property('message', 'ModuleVersion not found');
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				})
		});

		it('should return an object if ModuleVersion found', function (done) {
			ModuleVersionServices.getModuleVersion({ moduleVersionId: defaultModuleVersion._id.toString() })
				.then(result => {
					expect(result).to.have.property('moduleVersionId', defaultModuleVersion._id.toString());
					expect(result).to.have.property('version', defaultModuleVersion.version);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				})
		});
	});





});
