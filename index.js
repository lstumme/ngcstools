module.exports = {
    Tool: require('./model/tool'),
    ToolVersion: require('./model/toolversion'),
    Module: require('./model/module'),
    ModuleVersion: require('./model/moduleversion'),
    Environement: require('./model/environment'),

    ToolRoutes: require('./routes/toolroutes'),
    ModuleRoutes: require('./routes/moduleroutes'),
    EnvironmentRoutes: require('./routes/environmentroutes'),
    isToolManager: require('./middleware/is-toolmanager'),
    
    initToolsDB: require('./config/initdb'),
    
    ToolServices: require('./services/toolservices'),
    ToolVersionServices: require("./services/toolversionservices"),
    ModuleServices: require('./services/moduleservices'),
    ModuleVersionServices: require('./services/moduleversionservices'),
    EnvironmentServices: require('./services/environmentservices')
};
