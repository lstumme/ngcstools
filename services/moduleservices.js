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

exports.getModules = async ({ page, perPage }) => {
};

exports.createModuleVersion = ({ toolId, version }) => {
};

exports.deleteModuleVersion = ({ toolVersionId }) => {
};

exports.updateModuleVersionInformations = async ({ toolVersionId, location }) => {
};

exports.getModuleVersion = async ({ toolVersionId }) => {
};

exports.getModuleVersions = async ({ toolId, page, perPage }) => {
};

