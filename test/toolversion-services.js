const { expect, should, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const { ObjectId } = require('mongodb');
const Tool = require('../model/tool');
const ToolVersionServices = require('../services/toolversionservices');
const ToolVersion = require('../model/toolversion');

describe('ToolVersionServices', function () {
	describe('#createToolVersion function', function () {
				let defaultToolVersion;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await ToolVersion.createIndexes();
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
			
			
			defaultToolVersion = ToolVersion({
				version: 'defaultVersion',
				tool: defaultTool._id.toString(),
			});
			defaultToolVersion = await defaultToolVersion.save();
			
		});

		it('should create a ToolVersion', function (done) {
			const params = {
				version: 'version',
				tool: defaultTool._id.toString(),
			};
            ToolVersionServices.createToolVersion(params)
                .then(result => {
					expect(result).to.have.ownProperty('toolVersionId');
					expect(result).to.have.property('version', params.version);
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

	describe('#updateToolVersion function', function () {
				let defaultToolVersion;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await ToolVersion.createIndexes();
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
			
			
			defaultToolVersion = ToolVersion({
				version: 'defaultVersion',
				tool: defaultTool._id.toString(),
			});
			defaultToolVersion = await defaultToolVersion.save();
			

		});

		it('should throw an error if ToolVersion to update is not found', function (done) {
			const params = {
				location: 'newLocation',
				informations: 'newInformations',
			};
			ToolVersionServices.updateToolVersion(params)
				.then(result => {
					assert.fail('updateToolVersion error');
					done();
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Could not find toolVersion.');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should update ToolVersion location if location is provided', function (done) {
			const params = {
				toolVersionId: defaultToolVersion._id.toString(),
				location: 'newLocation',
			};

			ToolVersionServices.updateToolVersion(params)
				.then(result => {
					expect(result).to.have.property('toolVersionId', params.toolVersionId);
					expect(result).to.have.property('location', params.location);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});	

		it('should update ToolVersion informations if informations is provided', function (done) {
			const params = {
				toolVersionId: defaultToolVersion._id.toString(),
				informations: 'newInformations',
			};

			ToolVersionServices.updateToolVersion(params)
				.then(result => {
					expect(result).to.have.property('toolVersionId', params.toolVersionId);
					expect(result).to.have.property('informations', params.informations);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});	

		it('should update ToolVersion properties if everything is provided', function (done) {
			const params = {
				toolVersionId: defaultToolVersion._id.toString(),
				location: 'newLocation',
				informations: 'newInformations',
			};

			ToolVersionServices.updateToolVersion(params)
				.then(result => {
					expect(result).to.have.property('toolVersionId', params.toolVersionId);
					expect(result).to.have.property('location', params.location);
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

	describe('#deleteToolVersion function', function () {
				let defaultToolVersion;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await ToolVersion.createIndexes();
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
			
			
			defaultToolVersion = ToolVersion({
				version: 'defaultVersion',
				tool: defaultTool._id.toString(),
			});
			defaultToolVersion = await defaultToolVersion.save();
			
		});

		it('should throw an error if ToolVersion to delete is not found', function (done) {
			const params = {
				toolVersionId: ObjectId().toString(),
			};
			ToolVersionServices.deleteToolVersion(params)
				.then(result => {
					assert.fail('deleteToolVersion error');
					done();
				})
				.catch(err => {
					expect(err).to.have.property('message', 'ToolVersion to delete was not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should delete ToolVersion if ToolVersion exists', function (done) {
			const params = {
				toolVersionId: defaultToolVersion._id.toString(),
			};
			ToolVersionServices.deleteToolVersion(params)
				.then(result => {
					expect(result).to.have.property('toolVersionId', params.toolVersionId);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});		
	});

	describe('#getToolVersions function', function () {
				let defaultToolVersion;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await ToolVersion.createIndexes();
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
				const toolVersion = new ToolVersion({
					version: 'Version_' + i,
					tool: defaultTool._id.toString(),
				});
				await toolVersion.save();
			}			
		});

		it('should throw an error if range out of bounds', function (done) {
            ToolVersionServices.getToolVersions({ toolId: defaultTool._id.toString(), page: '3', perPage: '10' })
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
            ToolVersionServices.getToolVersions({ toolId: defaultTool._id.toString(), page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 2);
                    expect(result).to.have.property('toolVersions').to.have.lengthOf(perPage);
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
            ToolVersionServices.getToolVersions({ toolId: defaultTool._id.toString(), page: '1', perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('toolVersions').to.have.lengthOf(perPage);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail(err);
                    done();
                })
        });
	});

	describe('#getToolVersion function', function () {
				let defaultToolVersion;
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await ToolVersion.createIndexes();
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
			
			
			defaultToolVersion = ToolVersion({
				version: 'defaultVersion',
				tool: defaultTool._id.toString(),
			});
			defaultToolVersion = await defaultToolVersion.save();
			
		});
	
		it('should throw an error if ToolVersion not found', function (done) {
			ToolVersionServices.getToolVersion({ toolVersionId: ObjectId().toString() })
				.then(result => {
					assert.fail('Error');
				})
				.catch(err => {
					expect(err).to.have.property('statusCode', 404);
					expect(err).to.have.property('message', 'ToolVersion not found');
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				})
		});

		it('should return an object if ToolVersion found', function (done) {
			ToolVersionServices.getToolVersion({ toolVersionId: defaultToolVersion._id.toString() })
				.then(result => {
					expect(result).to.have.property('toolVersionId', defaultToolVersion._id.toString());
					expect(result).to.have.property('version', defaultToolVersion.version);
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
