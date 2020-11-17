const ToolVersionServices = require('../services/toolversionservices');


exports.createToolVersion = async (req, res, next) => {
    const toolId = req.body.toolId;
    const version = req.body.version;
    if (!toolId || !version) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);
    }
    return ToolVersionServices.createToolVersion({ toolId, version })
        .then(response => {
            res.status(201).json({ message: 'Tool version created', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteToolVersion = async (req, res, next) => {
    const toolVersionId = req.body.toolVersionId;
    if (!toolVersionId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);
    }
    return ToolVersionServices.deleteToolVersion({ toolVersionId })
        .then(response => {
            res.status(201).json({ message: 'Tool version deleted', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateToolVersionInformations = async (req, res, next) => {
    const toolVersionId = req.body.toolVersionId;
    const location = req.body.location;
    const informations = req.body.informations;
    if (!toolVersionId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);
    }
    return ToolVersionServices.updateToolVersionInformations({ toolVersionId, location, informations })
        .then(response => {
            res.status(200).json({ message: 'Tool version updated', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getToolVersion = async (req, res, next) => {
    const toolVersionId = req.body.toolVersionId;
    if (!toolVersionId) {
        const error = new Error('Bad arguments.');
        error.statusCode = 400;
        next(error);
    }

    return ToolVersionServices.getToolVersion({ toolVersionId })
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

exports.getToolVersions = async (req, res, next) => {
    const toolId = req.body.toolId;
    const page = req.body.page;
    const perPage = req.body.perPage;
    if (!toolId || !page || !perPage) {
        const error = new Error('Bad arguments.');
        error.statusCode = 400;
        next(error);
    }

    return ToolVersionServices.getToolVersions({ toolId, page, perPage })
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
