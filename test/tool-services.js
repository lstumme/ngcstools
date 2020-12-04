const { expect, should, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const { ObjectId } = require('mongodb');

const ToolServices = require('../services/toolservices');
const Tool = require('../model/tool');

describe('ToolServices', function () {
	describe('#createTool function', function () {
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await Tool.createIndexes();
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
			
		});

		it('should throw an error if Tool with given name already exists', function (done) {
			const params = {
				name: 'defaultName',
			};

            ToolServices.createTool(params)
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

		it('should create a Tool', function (done) {
			const params = {
				name: 'otherName',
			};
            ToolServices.createTool(params)
                .then(result => {
					expect(result).to.have.ownProperty('toolId');
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

	describe('#updateTool function', function () {
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await Tool.createIndexes();
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
			

		});

		it('should throw an error if Tool to update is not found', function (done) {
			const params = {
				vendor: 'newVendor',
			};
			ToolServices.updateTool(params)
				.then(result => {
					assert.fail('updateTool error');
					done();
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Could not find tool.');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should update Tool vendor if vendor is provided', function (done) {
			const params = {
				toolId: defaultTool._id.toString(),
				vendor: 'newVendor',
			};

			ToolServices.updateTool(params)
				.then(result => {
					expect(result).to.have.property('toolId', params.toolId);
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

	describe('#deleteTool function', function () {
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await Tool.createIndexes();
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
			
		});

		it('should throw an error if Tool to delete is not found', function (done) {
			const params = {
				toolId: ObjectId().toString(),
			};
			ToolServices.deleteTool(params)
				.then(result => {
					assert.fail('deleteTool error');
					done();
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Tool to delete was not found');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should delete Tool if Tool exists', function (done) {
			const params = {
				toolId: defaultTool._id.toString(),
			};
			ToolServices.deleteTool(params)
				.then(result => {
					expect(result).to.have.property('toolId', params.toolId);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});		
	});

	describe('#getTools function', function () {
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await Tool.createIndexes();
		});
		
		after(async () => {
			await dbHandler.closeDatabase();
		});
		
		afterEach(async () => {
			await dbHandler.clearDatabase();
		});
		
		beforeEach(async () => {
			
			for (let i = 0; i < 20; i++) {
				const tool = new Tool({
					name: 'Name_' + i,
				});
				await tool.save();
			}			
		});

		it('should throw an error if range out of bounds', function (done) {
            ToolServices.getTools({ page: '3', perPage: '10' })
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
            ToolServices.getTools({ page: 1, perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 2);
                    expect(result).to.have.property('tools').to.have.lengthOf(perPage);
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
            ToolServices.getTools({ page: '1', perPage: perPage })
                .then(result => {
                    expect(result).to.have.property('pageCount', 3);
                    expect(result).to.have.property('tools').to.have.lengthOf(perPage);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    assert.fail(err);
                    done();
                })
        });
	});

	describe('#getTool function', function () {
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await Tool.createIndexes();
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
			
		});
	
		it('should throw an error if Tool not found', function (done) {
			ToolServices.getTool({ toolId: ObjectId().toString() })
				.then(result => {
					assert.fail('Error');
				})
				.catch(err => {
					expect(err).to.have.property('statusCode', 404);
					expect(err).to.have.property('message', 'Tool not found');
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				})
		});

		it('should return an object if Tool found', function (done) {
			ToolServices.getTool({ toolId: defaultTool._id.toString() })
				.then(result => {
					expect(result).to.have.property('toolId', defaultTool._id.toString());
					expect(result).to.have.property('name', defaultTool.name);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				})
		});
	});

	describe('#findToolByName function', function () {
				let defaultTool;
		
		before(async () => {
			await dbHandler.connect();
			await Tool.createIndexes();
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
			
		});

		it('should throw an error if Tool is not found', function (done) {
			const params = {
				name: 'otherToolName',
			};
			ToolServices.findToolByName(params)
				.then(tool => {
					assert.fail('Error');
				})
				.catch(err => {
					expect(err).to.have.property('message', 'Could not find Tool');
					expect(err).to.have.property('statusCode', 404);
					done();
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
		});

		it('should return an object if Tool is found', function (done) {
			const params = {
				name: defaultTool.name,
			};
			ToolServices.findToolByName(params)
				.then(tool => {
					expect(tool).not.to.be.null;
					expect(tool).to.have.property('toolId', defaultTool._id.toString());
					expect(tool).to.have.property('name', defaultTool.name);
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
