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

exports.deleteModule = async ({ toolId }) => {
};

exports.updateModuleInformations = ({ toolId, vendor }) => {
};

exports.getModule = async ({ toolId }) => {
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

