const { expect, assert } = require('chai');
const { dbHandler } = require('ngcstesthelpers');
const Module = require('../model/module');
const Tool = require('../model/tool');
const ModuleVersionController = require('../controllers/moduleversioncontroller');
const ModuleVersion = require('../model/moduleversion');

describe('ModuleVersion Integration', function () {
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
			
			
			
		});
		
		it('should return an object if ModuleVersion creation succeed', function (done) {
			const req = {
				body: {
					version: 'defaultVersion', 
					module: defaultModule._id.toString(), 
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

			ModuleVersionController.createModuleVersion(req, res, () => { })
				.then(() => {
	                expect(res).to.have.property('statusCode', 201);
	                expect(res.jsonObject).to.have.property('message', 'ModuleVersion created');
	                expect(res.jsonObject.data).to.have.ownProperty('moduleVersionId');
					expect(res.jsonObject.data).to.have.property('module', req.body.module); 
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
	describe('#updateModuleVersion function', function () {
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

       it('should return a moduleVersionId if ModuleVersion deletion succeed', function (done) {
            const req = {
                body: {
                    moduleVersionId: defaultModuleVersion._id.toString(),
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

        it('should return an array if request succeed', function (done) {
            const req = {
                query: {
					moduleId: defaultModule._id.toString(),
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

            ModuleVersionController.getModuleVersions(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject.moduleVersions).to.have.lengthOf(10);
	                done();
	            })
				.catch(err => {
					console.log(err);
					assert.fail(err);
					done();
				});
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

        it('should return an object if request succeed', function (done) {
            const req = {
                query: {
                    moduleVersionId: defaultModuleVersion._id.toString(),
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

            ModuleVersionController.getModuleVersion(req, res, () => { })
				.then(result => {
	                expect(res).to.have.property('statusCode', 200);
	                expect(res.jsonObject).to.have.property('moduleVersionId', defaultModuleVersion._id.toString());
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
