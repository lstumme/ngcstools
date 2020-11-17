const { RoleServices } = require('ngcsroles');
const { UserServices } = require('ngcsusers');
const Tool = require('../model/tool');

const convertTool2Object = tv => {
    return {
        toolId: tv._id.toString(),
        name: tv.name,
        vendor: tv.vendor,
        informations: tv.informations
    }
};


exports.createTool = async ({ name }) => {
    return Tool.findOne({ name }).then(existingTool => {
        if (existingTool) {
            const error = new Error(`Tool ${name} already exists`);
            error.statusCode = 409;
            throw error;

        }
        const tool = new Tool({ name });
        return tool.save()
            .then(newTool => { return convertTool2Object(newTool) })
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
            return convertTool2Object(t);
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
            return convertTool2Object(tool);
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
                        tools: result.map(t => { return convertTool2Object(t) }),
                        pageCount: pageCount
                    };
                })
        });
};

exports.isToolManager = async ({ userId }) => {
    return RoleServices.findRole({ name: 'toolsmanagers' })
        .then(role => {
            if (!role) {
                return false;
            }
            return UserServices.getUser({ userId: userId })
                .then(user => {
                    if (user.role === role.roleId) {
                        return true;
                    }
                    return RoleServices.getRole({ roleId: user.role })
                        .then(userrole => {
                            return userrole.subRoles.includes(role.roleId);
                        })
                })
        })
        .catch(err=> {
            return false;
        })
};



