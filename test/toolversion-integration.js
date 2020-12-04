const { expect, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const Tool = require('../model/tool');
const ToolVersionController = require('../controllers/toolversioncontroller');
const ToolVersion = require('../model/toolversion');

describe('ToolVersion Integration', function () {
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
			
			
			
		});
		
		it('should return an object if ToolVersion creation succeed', function (done) {
			const req = {
				body: {
					version: 'defaultVersion', 
					tool: defaultTool._id.toString(), 
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

			ToolVersionController.createToolVersion(req, res, () => { })
				.then(() => {
	                expect(res).to.have.property('statusCode', 201);
	                expect(res.jsonObject).to.have.property('message', 'ToolVersion created');
	                expect(res.jsonObject.data).to.have.ownProperty('toolVersionId');
					expect(res.jsonObject.data).to.have.property('tool', req.body.tool); 
					expect(res.jsonObject.data).to.have.property('version', req.body.version); 
					done();				
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});		
		});
	});
	describe('#updateToolVersion function', function () {
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

       it('should return a toolVersionId if ToolVersion deletion succeed', function (done) {
            const req = {
                body: {
                    toolVersionId: defaultToolVersion._id.toString(),
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

            ToolVersionController.deleteToolVersion(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject).to.have.property('message', 'ToolVersion deleted');
	                expect(res.jsonObject.data).to.have.property('toolVersionId', req.body.toolVersionId)
	                done();
            	})
				.catch(err => {
					console.log(err);
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

        it('should return an array if request succeed', function (done) {
            const req = {
                query: {
					toolId: defaultTool._id.toString(),
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

            ToolVersionController.getToolVersions(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject.toolVersions).to.have.lengthOf(10);
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
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

        it('should return an object if request succeed', function (done) {
            const req = {
                query: {
                    toolVersionId: defaultToolVersion._id.toString(),
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

            ToolVersionController.getToolVersion(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject).to.have.property('toolVersionId', defaultToolVersion._id.toString());
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
