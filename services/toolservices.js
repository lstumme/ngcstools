const { Role } = require('ngcsroles');
const { UserServices } = require('ngcsusers');
const { RoleServices } = require('ngcsroles');
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
                return {
                    toolId: newTool._id.toString(),
                    name: newTool.name
                };
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
        return tool.remove().then(t => {
            return { toolId: tool._id.toString() };
        })
    });
};

exports.updateToolInformations = ({ toolId, vendor, informations }) => {
    return Tool.findOne({ _id: toolId }).then(tool => {
        if (!tool) {
            const error = new Error('Could not find tool.')
            error.statusCode = 404;
            throw error;
        }
        const params = {}
        if (vendor) tool.vendor = vendor;
        if (informations) tool.informations = informations;
        return tool.save().then(t => {
            return {
                toolId: t._id.toString(),
                name: t.name,
                vendor: t.vendor,
                informations: t.informations
            }
        });
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
                            return {
                                toolVersionId: tv._id.toString(),
                                toolId: tv.toolId.toString(),
                                version: tv.version
                            };
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
        return toolVersion.save().then(t => {
            return {
                toolVersionId: t._id.toString(),
                toolId: t.toolId.toString(),
                version: t.version,
                location: t.location,
                informations
            }
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
            return toolVersion;
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
                                toolVersions: result,
                                pageCount: pageCount
                            };

                        })
                })
        })
};

exports.isToolManager = async ({ userId }) => {
    return RoleServices.findRole({ name: 'toolsmanagers' })
        .then(role => {
            if (!role) {
                console.log('role not found');
                return false;
            }
            return UserServices.getUser({ userId: userId })
                .then(user => {
                    if (!user) {
                        return false;
                    }
                    if (user.role === role.roleId) {
                        return true;
                    }
                    return RoleServices.getRole({roleId: user.role})
                        .then(userrole => {
                            return userrole.subRoles.includes(role.roleId); 
                        })
                })
        })
};


