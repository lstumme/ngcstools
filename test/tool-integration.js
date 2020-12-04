const { expect, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');

const ToolController = require('../controllers/toolcontroller');
const Tool = require('../model/tool');

describe('Tool Integration', function () {
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

			ToolController.createTool(req, res, () => { })
				.then(() => {
	                expect(res).to.have.property('statusCode', 201);
	                expect(res.jsonObject).to.have.property('message', 'Tool created');
	                expect(res.jsonObject.data).to.have.ownProperty('toolId');
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
	describe('#updateTool function', function () {
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

       it('should return a toolId if Tool deletion succeed', function (done) {
            const req = {
                body: {
                    toolId: defaultTool._id.toString(),
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

            ToolController.getTools(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject.tools).to.have.lengthOf(10);
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
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

        it('should return an object if request succeed', function (done) {
            const req = {
                query: {
                    toolId: defaultTool._id.toString(),
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

            ToolController.getTool(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject).to.have.property('toolId', defaultTool._id.toString());
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
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

            ToolController.findToolByName(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject).to.have.property('toolId', defaultTool._id.toString());
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




});
