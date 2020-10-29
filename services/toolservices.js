const Tool = require('../model/tool');
const ToolVersion = require('../model/toolversion');

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

exports.getTools = async ({ page, perPage }) => {
    return Tool.countDocuments()
        .then(count => {
            const pageCount = Math.trunc(count / perPage) + (count % perPage > 0 ? 1 : 0);
            if (count <= perPage * (page - 1) || (perPage * (page - 1) < 0)) {
                const error = new Error('Pagination out of bounds.');
                error.statusCode = 400;
                throw error;
            }
            return Tool.find().skip((page - 1) * perPage).limit(perPage)
                .then(result => {
                    return {
                        tools: result,
                        pageCount: pageCount
                    };

                })
        });
};

exports.createToolVersion = ({ toolId, version }) => {
    return ToolVersion.findOne({ tool: toolId, version: version })
        .then(existingToolVersion => {
            if (existingToolVersion) {
                const error = new Error(`ToolVersion already exists`);
                error.statusCode = 409;
                throw error;
            }
            return Tool.findOne({ _id: toolId })
                .then(existingTool => {
                    if (!existingTool) {
                        const error = new Error('Tool not found');
                        error.statusCode = 404;
                        throw error;
                    }
                    const toolVersion = new ToolVersion({ tool: toolId, version: version });
                    return toolVersion.save()
                        .then(newToolVersion => {
                            return { message: 'ToolVersion created', toolVersionId: newToolVersion._id };
                        })
                })
        })
};

exports.deleteToolVersion = ({ toolVersionId }) => {
    return ToolVersion.findOne({ _id: toolVersionId }).then(toolVersion => {
        if (!toolVersion) {
            const error = new Error('Could not find toolVersion.')
            error.statusCode = 404;
            throw error;
        }
        return { toolVersionId: toolVersion.remove()._id };
    });
};

exports.updateToolVersionInformations = () => {

};
exports.getToolVersion = () => {

};

exports.getToolVersions = () => {

};


