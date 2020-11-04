module.exports = {
    Tool: requires('./model/tool'),
    ToolVersion: require('./model/toolversion'),
    Module: require('./model/module'),
    ModuleVersion: require('./model/moduleversion'),
    ToolRoutes: require('./routes/toolroutes'),
    ModuleRoutes: require('./routes/moduleroutes'),
    EnvironmentRoutes: require('./routes/environmentroutes'),
    isToolManager: require('./middleware/is-toolmanager'),
    ToolDB: require('./config/initdb')
};
