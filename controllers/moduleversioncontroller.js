const ModuleVersionServices = require('../services/moduleversionservices');


exports.createModuleVersion = async (req, res, next) => {
    const moduleId = req.body.moduleId;
    const version = req.body.version;
    if (!moduleId || !version) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);
    }
    return ModuleVersionServices.createModuleVersion({ moduleId, version })
        .then(response => {
            res.status(201).json({ message: 'Module version created', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteModuleVersion = async (req, res, next) => {
    const moduleVersionId = req.body.moduleVersionId;
    if (!moduleVersionId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);
    }
    return ModuleVersionServices.deleteModuleVersion({ moduleVersionId })
        .then(response => {
            res.status(201).json({ message: 'Module version deleted', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateModuleVersionInformations = async (req, res, next) => {
    const moduleVersionId = req.body.moduleVersionId;
    const location = req.body.location;
    const informations = req.body.informations;
    if (!moduleVersionId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);
    }
    return ModuleVersionServices.updateModuleVersionInformations({ moduleVersionId, location, informations })
        .then(response => {
            res.status(200).json({ message: 'Module version updated', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getModuleVersion = async (req, res, next) => {
    const moduleVersionId = req.body.moduleVersionId;
    if (!moduleVersionId) {
        const error = new Error('Bad arguments.');
        error.statusCode = 400;
        next(error);
    }

    return ModuleVersionServices.getModuleVersion({ moduleVersionId })
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

exports.getModuleVersions = async (req, res, next) => {
    const page = req.body.page;
    const perPage = req.body.perPage;
    const moduleId = req.body.moduleId;
    if (!moduleId || !page || !perPage) {
        const error = new Error('Bad arguments.');
        error.statusCode = 400;
        next(error);
    }
    return ModuleVersionServices.getModuleVersions({ moduleId, page, perPage })
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




