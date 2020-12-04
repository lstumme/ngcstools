const { expect, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const Tool = require('../model/tool');
const ModuleController = require('../controllers/modulecontroller');
const Module = require('../model/module');

describe('Module Integration', function () {
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
			
			
			
		});
		
		it('should return an object if Module creation succeed', function (done) {
			const req = {
				body: {
					name: 'defaultName', 
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

			ModuleController.createModule(req, res, () => { })
				.then(() => {
	                expect(res).to.have.property('statusCode', 201);
	                expect(res.jsonObject).to.have.property('message', 'Module created');
	                expect(res.jsonObject.data).to.have.ownProperty('moduleId');
					expect(res.jsonObject.data).to.have.property('name', req.body.name); 
					expect(res.jsonObject.data).to.have.property('tool', req.body.tool); 
					done();				
				})
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});		
		});
	});
	describe('#updateModule function', function () {
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

       it('should return a moduleId if Module deletion succeed', function (done) {
            const req = {
                body: {
                    moduleId: defaultModule._id.toString(),
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

            ModuleController.deleteModule(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject).to.have.property('message', 'Module deleted');
	                expect(res.jsonObject.data).to.have.property('moduleId', req.body.moduleId)
	                done();
            	})
				.catch(err => {
					console.log(err);
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

            ModuleController.getModules(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject.modules).to.have.lengthOf(10);
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
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

        it('should return an object if request succeed', function (done) {
            const req = {
                query: {
                    moduleId: defaultModule._id.toString(),
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

            ModuleController.getModule(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject).to.have.property('moduleId', defaultModule._id.toString());
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
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

            ModuleController.findModuleByName(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject).to.have.property('moduleId', defaultModule._id.toString());
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
