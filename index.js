module.exports = {
	Tool: require('./model/tool'),
	ToolController: require('./controllers/toolcontroller'),
	ToolServices: require('./services/toolservices'),
	ToolVersion: require('./model/toolversion'),
	ToolVersionController: require('./controllers/toolversioncontroller'),
	ToolVersionServices: require('./services/toolversionservices'),
	Module: require('./model/module'),
	ModuleController: require('./controllers/modulecontroller'),
	ModuleServices: require('./services/moduleservices'),
	ModuleVersion: require('./model/moduleversion'),
	ModuleVersionController: require('./controllers/moduleversioncontroller'),
	ModuleVersionServices: require('./services/moduleversionservices'),
	Environment: require('./model/environment'),
	EnvironmentController: require('./controllers/environmentcontroller'),
	EnvironmentServices: require('./services/environmentservices'),
};
