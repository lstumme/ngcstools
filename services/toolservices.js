const Tool = require('../model/tool');

exports.createTool = ({ name }) => {
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

exports.deleteTool = () => {

};

exports.updateToolInformations = () => {

};

exports.getTool = () => {

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


