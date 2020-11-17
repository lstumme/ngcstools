const ToolVersion = require('../model/toolversion');
const Tool = require('../model/tool');
const ToolService = require('./toolservices');

const convertToolVersion2Object = tv => {
    return {
        toolVersionId: tv._id.toString(),
        toolId: tv.toolId.toString(),
        version: tv.version,
        location: tv.location,
        informations: tv.informations,
        creationDate: tv.creationDate
    }
};

exports.createToolVersion = ({ toolId, version }) => {
    return ToolVersion.findOne({ toolId: toolId, version: version })
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
                    const toolVersion = new ToolVersion({ toolId, version });
                    return toolVersion.save()
                        .then(tv => {
                            return convertToolVersion2Object(tv);
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
        return toolVersion.remove().then(tv => {
            return {
                toolVersionId: toolVersion._id.toString()
            }
        })
    });
};

exports.updateToolVersionInformations = async ({ toolVersionId, location, informations }) => {
    return ToolVersion.findOne({ _id: toolVersionId }).then(toolVersion => {
        if (!toolVersion) {
            const error = new Error('Could not find toolVersion.')
            error.statusCode = 404;
            throw error;
        }
        const params = {}
        if (location) toolVersion.location = location;
        if (informations) toolVersion.informations = informations;
        return toolVersion.save().then(tv => {
            return convertToolVersion2Object(tv);
        })
    });

};

exports.getToolVersion = async ({ toolVersionId }) => {
    return ToolVersion.findOne({ _id: toolVersionId })
        .then(toolVersion => {
            if (!toolVersion) {
                const error = new Error('ToolVersion not found.')
                error.statusCode = 404;
                throw error;
            }
            return convertToolVersion2Object(toolVersion);
        });
};

exports.getToolVersions = async ({ toolId, page, perPage }) => {
    return Tool.findOne({ _id: toolId })
        .then(tool => {
            if (!tool) {
                const error = new Error('Tool not found');
                error.statusCode = 404;
                throw error;
            }
            return ToolVersion.countDocuments({ toolId })
                .then(count => {
                    const pageCount = Math.trunc(count / perPage) + (count % perPage > 0 ? 1 : 0);
                    if (count <= perPage * (page - 1) || (perPage * (page - 1) < 0)) {
                        const error = new Error('Pagination out of bounds.');
                        error.statusCode = 400;
                        throw error;
                    }
                    return ToolVersion.find({ toolId }).skip((page - 1) * perPage).limit(perPage)
                        .then(result => {
                            return {
                                toolVersions: result.map(tv => { return convertToolVersion2Object(tv) }),
                                pageCount: pageCount
                            };

                        })
                })
        })
};

