module.exports = {
	Tool: require('./model/tool'),
	ToolController: require('./controller/toolcontroller'),
	ToolServices: require('./services/toolservices'),
	ToolVersion: require('./model/toolversion'),
	ToolVersionController: require('./controller/toolversioncontroller'),
	ToolVersionServices: require('./services/toolversionservices'),
	Module: require('./model/module'),
	ModuleController: require('./controller/modulecontroller'),
	ModuleServices: require('./services/moduleservices'),
	ModuleVersion: require('./model/moduleversion'),
	ModuleVersionController: require('./controller/moduleversioncontroller'),
	ModuleVersionServices: require('./services/moduleversionservices'),
	Environment: require('./model/environment'),
	EnvironmentController: require('./controller/environmentcontroller'),
	EnvironmentServices: require('./services/environmentservices'),
};
