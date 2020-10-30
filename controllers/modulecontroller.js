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
    const moduleId = req.body.moduleId;
    if (!moduleId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return moduleServices.deleteModule({ moduleId })
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

exports.updateModuleInformations = async (req, res, next) => {
    const moduleId = req.body.moduleId;
    const vendor = req.body.vendor;
    if (!moduleId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return moduleServices.updateModuleInformations({ moduleId, vendor })
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

exports.getModule = async (req, res, next) => {
    const moduleId = req.body.moduleId;
    if (!moduleId) {
        const error = new Error('Bad arguments.');
        error.statusCode = 400;
        throw error;
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
        throw error;
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


exports.createModuleVersion = async (req, res, next) => {
    const name = req.body.name;
    const moduleId = req.body.moduleId;
    const version = req.body.version;
    if (!name || !moduleId || !version) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return moduleServices.createModuleVersion({ name, moduleId, version })
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

exports.deleteModuleVersion = async (req, res, next) => {
    const moduleVersionId = req.body.moduleVersionId;
    if (!moduleVersionId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return moduleServices.deleteModuleVersion({ moduleVersionId })
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

exports.updateModuleVersionInformations = async (req, res, next) => {
};

exports.getModuleVersion = async (req, res, next) => {
    const moduleVersionId = req.body.moduleVersionId;
    if (!moduleVersionId) {
        const error = new Error('Bad arguments.');
        error.statusCode = 400;
        throw error;
    }

    return moduleServices.getModuleVersion({ moduleVersionId })
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
};




