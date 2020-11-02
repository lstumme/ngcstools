const { Group } = require('ngcsgroups');
const Module = require('../model/module');
const Tool = require('../model/tool');
const ModuleVersion = require('../model/moduleversion');
const ToolVersion = require('../model/toolversion');

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
                const module = new Module({ name, tool: toolId });
                return module.save()
                    .then(newModule => {
                        return {
                            moduleId: newModule._id.toString(),
                            toolId: newModule.tool.toString(),
                            name: newModule.name
                        };
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
                return {
                    moduleId: m._id.toString(),
                    toolId: m.tool.toString(),
                    vendor: m.vendor,
                    informations: m.informations
                }
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
            return {
                moduleId: module._id.toString(),
                name: module.name,
                toolId: module.tool.toString(),
                vendor: module.vendor,
                informations: module.informations
            };
        });
};

exports.getModules = async ({ toolId, page, perPage }) => {
    return Module.countDocuments({ tool: toolId })
        .then(count => {
            const pageCount = Math.trunc(count / perPage) + (count % perPage > 0 ? 1 : 0);
            if (count <= perPage * (page - 1) || (perPage * (page - 1) < 0)) {
                const error = new Error('Pagination out of bounds.');
                error.statusCode = 400;
                throw error;
            }
            return Module.find({ tool: toolId }).skip((page - 1) * perPage).limit(perPage)
                .then(result => {
                    return {
                        modules: result,
                        pageCount: pageCount
                    };
                })
        });
};

exports.createModuleVersion = ({ moduleId, version }) => {
    return ModuleVersion.findOne({ module: moduleId, version: version }).then(existingModuleVersion => {
        if (existingModuleVersion) {
            const error = new Error(`Module version ${version} already exists for this module`);
            error.statusCode = 409;
            throw error;
        }
        return Module.findOne({ _id: moduleId })
            .then(existingModule => {
                if (!existingModule) {
                    const error = new Error('Specified module does not exist');
                    error.statusCode = 409;
                    throw error;
                }
                const moduleVersion = new ModuleVersion({ module: moduleId, version });
                return moduleVersion.save()
                    .then(newModuleVersion => {
                        return {
                            moduleVersionId: newModuleVersion._id.toString(),
                            moduleId: newModuleVersion.module.toString(),
                            version: newModuleVersion.version.toString()
                        };
                    })
            })
    });
};

exports.deleteModuleVersion = ({ moduleVersionId }) => {
    return ModuleVersion.findOne({ _id: moduleVersionId }).then(moduleVersion => {
        if (!moduleVersion) {
            const error = new Error('Could not find module version.')
            error.statusCode = 404;
            throw error;
        }
        return moduleVersion.remove()
            .then(m => {
                return { moduleVersionId: moduleVersion._id.toString() };
            })
    });
};

exports.updateModuleVersionInformations = async ({ moduleVersionId, location, informations }) => {
    return ModuleVersion.findOne({ _id: moduleVersionId }).then(moduleVersion => {
        if (!moduleVersion) {
            const error = new Error('Could not find module version.')
            error.statusCode = 404;
            throw error;
        }
        if (location) moduleVersion.location = location;
        if (informations) moduleVersion.informations = informations
        return moduleVersion.save()
            .then(m => {
                return {
                    moduleVersionId: m._id.toString(),
                    moduleId: m.module.toString(),
                    location: m.vendor,
                    informations: m.informations
                }
            })
    });
};

exports.getModuleVersion = async ({ toolVersionId }) => {
};

exports.getModuleVersions = async ({ toolId, page, perPage }) => {
};

