const { expect, should, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const { ObjectId } = require('mongodb');
const Tool = require('../model/tool');
const ModuleServices = require('../services/moduleservices');
const Module = require('../model/module');

describe('ModuleServices', function () {
	describe('#createModule function', function () {
				let defaultModule;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await Module.createIndexes();
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
			
		});

		it('should throw an error if Module with given name already exists', function (done) {
			const params = {
				name: 'defaultName',
				tool: defaultTool._id.toString(),
			};

            ModuleServices.createModule(params)
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

		it('should create a Module', function (done) {
			const params = {
				name: 'otherName',
				tool: defaultTool._id.toString(),
			};
            ModuleServices.createModule(params)
                .then(result => {
					expect(result).to.have.ownProperty('moduleId');
					expect(result).to.have.property('name', params.name);
					expect(result).to.have.property('tool', params.tool);
					done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail('UserService Error');
					done();
                })
		});
	});

	describe('#updateModule function', function () {
				let defaultModule;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await Module.createIndexes();
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
			

		});

		it('should throw an error if Module to update is not found', function (done) {
			const params = {
				informations: 'newInformations',
				vendor: 'newVendor',
			};
			ModuleServices.updateModule(params)
				.then(result => {
					assert.fail('updateModule error');
					done();
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Could not find module.');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should update Module informations if informations is provided', function (done) {
			const params = {
				moduleId: defaultModule._id.toString(),
				informations: 'newInformations',
			};

			ModuleServices.updateModule(params)
				.then(result => {
					expect(result).to.have.property('moduleId', params.moduleId);
					expect(result).to.have.property('informations', params.informations);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});	

		it('should update Module vendor if vendor is provided', function (done) {
			const params = {
				moduleId: defaultModule._id.toString(),
				vendor: 'newVendor',
			};

			ModuleServices.updateModule(params)
				.then(result => {
					expect(result).to.have.property('moduleId', params.moduleId);
					expect(result).to.have.property('vendor', params.vendor);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});	

		it('should update Module properties if everything is provided', function (done) {
			const params = {
				moduleId: defaultModule._id.toString(),
				informations: 'newInformations',
				vendor: 'newVendor',
			};

			ModuleServices.updateModule(params)
				.then(result => {
					expect(result).to.have.property('moduleId', params.moduleId);
					expect(result).to.have.property('informations', params.informations);
					expect(result).to.have.property('vendor', params.vendor);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});
	});

	describe('#deleteModule function', function () {
				let defaultModule;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await Module.createIndexes();
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
			
		});

		it('should throw an error if Module to delete is not found', function (done) {
			const params = {
				moduleId: ObjectId().toString(),
			};
			ModuleServices.deleteModule(params)
				.then(result => {
					assert.fail('deleteModule error');
					done();
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Module to delete was not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should delete Module if Module exists', function (done) {
			const params = {
				moduleId: defaultModule._id.toString(),
			};
			ModuleServices.deleteModule(params)
				.then(result => {
					expect(result).to.have.property('moduleId', params.moduleId);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});		
	});

	describe('#getModules function', function () {
				let defaultModule;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await Module.createIndexes();
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
			
			
			
			for (let i = 0; i < 20; i++) {
				const module = new Module({
					name: 'Name_' + i,
					tool: defaultTool._id.toString(),
				});
				await module.save();
			}			
		});

		it('should throw an error if range out of bounds', function (done) {
            ModuleServices.getModules({ toolId: defaultTool._id.toString(), page: '3', perPage: '10' })
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
            ModuleServices.getModules({ toolId: defaultTool._id.toString(), page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 2);
                    expect(result).to.have.property('modules').to.have.lengthOf(perPage);
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
            ModuleServices.getModules({ toolId: defaultTool._id.toString(), page: '1', perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('modules').to.have.lengthOf(perPage);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail(err);
                    done();
                })
        });
	});

	describe('#getModule function', function () {
				let defaultModule;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await Module.createIndexes();
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
			
		});
	
		it('should throw an error if Module not found', function (done) {
			ModuleServices.getModule({ moduleId: ObjectId().toString() })
				.then(result => {
					assert.fail('Error');
				})
				.catch(err => {
					expect(err).to.have.property('statusCode', 404);
					expect(err).to.have.property('message', 'Module not found');
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				})
		});

		it('should return an object if Module found', function (done) {
			ModuleServices.getModule({ moduleId: defaultModule._id.toString() })
				.then(result => {
					expect(result).to.have.property('moduleId', defaultModule._id.toString());
					expect(result).to.have.property('name', defaultModule.name);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				})
		});
	});

	describe('#findModuleByName function', function () {
				let defaultModule;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await Module.createIndexes();
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
			
		});

		it('should throw an error if Module is not found', function (done) {
			const params = {
				name: 'otherModuleName',
			};
			ModuleServices.findModuleByName(params)
				.then(module => {
					assert.fail('Error');
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Could not find Module');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should return an object if Module is found', function (done) {
			const params = {
				name: defaultModule.name,
			};
			ModuleServices.findModuleByName(params)
				.then(module => {
					expect(module).not.to.be.null;
					expect(module).to.have.property('moduleId', defaultModule._id.toString());
					expect(module).to.have.property('name', defaultModule.name);
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
