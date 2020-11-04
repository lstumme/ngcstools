module.exports = {
    Tool: require('./model/tool'),
    ToolVersion: require('./model/toolversion'),
    Module: require('./model/module'),
    ModuleVersion: require('./model/moduleversion'),
    ToolRoutes: require('./routes/toolroutes'),
    ModuleRoutes: require('./routes/moduleroutes'),
    EnvironmentRoutes: require('./routes/environmentroutes'),
    isToolManager: require('./middleware/is-toolmanager'),
    initToolsDB: require('./config/initdb')
};
