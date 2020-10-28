const Tool = require('../model/tool');

exports.createTool = async ({ name }) => {
    return Tool.findOne({ name }).then(existingTool => {
        if (existingTool) {
            const error = new Error(`Tool ${name} already exists`);
            error.statusCode = 409;
            throw error;

        }
        const tool = new Tool({ name });
        return tool.save()
            .then(newTool => {
                return { message: 'Tool created', toolId: newTool._id };
            })
    });
};

exports.deleteTool = async ({ toolId }) => {
    return Tool.findOne({ _id: toolId }).then(tool => {
        if (!tool) {
            const error = new Error('Could not find tool.')
            error.statusCode = 404;
            throw error;
        }
        return { toolId: tool.remove()._id };
    });
};

exports.updateToolInformations = ({ toolId, vendor }) => {
    return Tool.findOne({ _id: toolId }).then(tool => {
        if (!tool) {
            const error = new Error('Could not find tool.')
            error.statusCode = 404;
            throw error;
        }
        const params = {}
        if (vendor) params.vendor = vendor;
        return tool.updateOne({ $set: params });
    });
};

exports.getTool = async ({ toolId }) => {
    return Tool.findOne({ _id: toolId })
        .then(tool => {
            if (!tool) {
                const error = new Error('Tool not found.')
                error.statusCode = 404;
                throw error;
            }
            return tool;
        });
};

exports.getTools = () => {

};


exports.createToolVersion = () => {

};
exports.deleteToolVersion = () => {

};
exports.updateToolVersionInformations = () => {

};
exports.getToolVersion = () => {

};

exports.getToolVersions = () => {

};


