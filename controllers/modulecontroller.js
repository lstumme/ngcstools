const moduleServices = require('../services/moduleservices.js');

exports.createModule = async (req, res, next) => {
    const name = req.body.name;
    const toolId = req.body.toolId;
    if (!name || !toolId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);
    }
    return moduleServices.createModule({ name, toolId })
        .then(response => {
            res.status(201).json({ message: 'Module created', data: response });
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
    const moduleId = req.body.moduleId;
    if (!moduleId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);
    }
    return moduleServices.deleteModule({ moduleId })
        .then(response => {
            res.status(201).json({ message: 'Module deleted', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateModuleInformations = async (req, res, next) => {
    const moduleId = req.body.moduleId;
    const vendor = req.body.vendor;
    const informations = req.body.informations;
    if (!moduleId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);
    }
    return moduleServices.updateModuleInformations({ moduleId, vendor, informations })
        .then(response => {
            res.status(200).json({ message: 'Module updated', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getModule = async (req, res, next) => {
    const moduleId = req.body.moduleId;
    if (!moduleId) {
        const error = new Error('Bad arguments.');
        error.statusCode = 400;
        next(error);
    }

    return moduleServices.getModule({ moduleId })
        .then(response => {
            res.status(200).json({ ...response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


exports.getModules = async (req, res, next) => {
    const page = req.body.page;
    const perPage = req.body.perPage;
    const toolId = req.body.toolId;
    if (!toolId || !page || !perPage) {
        const error = new Error('Bad arguments.');
        error.statusCode = 400;
        next(error);
    }
    return moduleServices.getModules({ toolId, page, perPage })
        .then(response => {
            res.status(200).json(response);
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


