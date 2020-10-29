module.exports = {
    Tool: requires('./model/tool'),
    ToolVersion: require('./model/toolversion'),
    ToolRoutes: require('./routes/toolroutes'),
    isToolManager: require('./middleware/is-toolmanager'),
};
