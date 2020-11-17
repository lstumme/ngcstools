const Module = require('../model/module');
const Tool = require('../model/tool');

const convertModule2Object = m => {
    return {
        moduleId: m._id.toString(),
        name: m.name,
        toolId: m.toolId.toString(),
        informations: m.informations,
        vendor: m.vendor
    }
}


exports.createModule = async ({ name, toolId }) => {
    return Module.findOne({ name }).then(existingModule => {
        if (existingModule) {
            const error = new Error(`Module ${name} already exists`);
            error.statusCode = 409;
            throw error;
        }
        return Tool.findOne({ _id: toolId })
            .then(existingTool => {
                if (!existingTool) {
                    const error = new Error('Specified tool does not exist');
                    error.statusCode = 409;
                    throw error;
                }
                const module = new Module({ name, toolId });
                return module.save()
                    .then(newModule => {
                        return convertModule2Object(newModule);
                    })
            })
    });
};

exports.deleteModule = async ({ moduleId }) => {
    return Module.findOne({ _id: moduleId }).then(module => {
        if (!module) {
            const error = new Error('Could not find module.')
            error.statusCode = 404;
            throw error;
        }
        return module.remove()
            .then(m => {
                return { moduleId: module._id.toString() };
            })
    });
};

exports.updateModuleInformations = ({ moduleId, vendor, informations }) => {
    return Module.findOne({ _id: moduleId }).then(module => {
        if (!module) {
            const error = new Error('Could not find module.')
            error.statusCode = 404;
            throw error;
        }
        if (vendor) module.vendor = vendor;
        if (informations) module.informations = informations
        return module.save()
            .then(m => {
                return convertModule2Object(m);
            })
    });
};

exports.getModule = async ({ moduleId }) => {
    return Module.findOne({ _id: moduleId })
        .then(module => {
            if (!module) {
                const error = new Error('Module not found.')
                error.statusCode = 404;
                throw error;
            }
            return convertModule2Object(module);
        });
};

exports.getModules = async ({ toolId, page, perPage }) => {
    return Module.countDocuments({ toolId })
        .then(count => {
            const pageCount = Math.trunc(count / perPage) + (count % perPage > 0 ? 1 : 0);
            if (count <= perPage * (page - 1) || (perPage * (page - 1) < 0)) {
                const error = new Error('Pagination out of bounds.');
                error.statusCode = 400;
                throw error;
            }
            return Module.find({ toolId }).skip((page - 1) * perPage).limit(perPage)
                .then(result => {
                    return {
                        modules: result.map(m => { return convertModule2Object(m) }),
                        pageCount: pageCount
                    };
                })
        });
};

exports.findModule = ({ name }) => {
    return Module.findOne({ name: name })
        .then(m => {
            return m ? convertModule2Object(m) : null;
        })
}

