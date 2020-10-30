const moduleServices = require('../services/moduleservices.js');

exports.createModule = async (req, res, next) => {
    const name = req.body.name;
    const toolId = req.body.toolId;
    if (!name || !toolId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return moduleServices.createModule({ name, toolId })
        .then(response => {
            res.status(201).json({ ...response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteModule = async (req, res, next) => {
};

exports.updateModuleInformations = async (req, res, next) => {
};

exports.getModule = async (req, res, next) => {
};

exports.getModules = async (req, res, next) => {
};

exports.createModuleVersion = async (req, res, next) => {
};

exports.deleteModuleVersion = async (req, res, next) => {
};

exports.updateModuleVersionInformations = async (req, res, next) => {
};

exports.getModuleVersion = async (req, res, next) => {
};

exports.getModuleVersions = async (req, res, next) => {
};




