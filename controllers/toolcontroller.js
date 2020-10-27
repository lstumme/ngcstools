const toolServices = require('../services/toolservices.js');

exports.createTool = async (req, res, next) => {
    const name = req.body.name;
    if (!name) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return toolServices.createTool({ name })
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

exports.deleteTool = async (req, res, next) => {
    const toolId = req.body.toolId;
    if (!toolId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return toolServices.deleteTool({ toolId })
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

exports.updateToolInformations = async (req, res, next) => {
    const toolId = req.body.toolId;
    const vendor = req.body.vendor;
    if (!toolId || !vendor) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return toolServices.updateToolInformations({ toolId, vendor })
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

exports.getTool = async (req, res, next) => {
    const toolId = req.body.toolId;
    if (!toolId) {
        const error = new Error('Bad arguments.');
        error.statusCode = 400;
        throw error;
    }

    return toolServices.getTool({ toolId })
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

exports.getTools = async (req, res, next) => {
    const page = req.body.page;
    const perPage = req.body.perPage;
    if (!page || !perPage) {
        const error = new Error('Bad arguments.');
        error.statusCode = 400;
        throw error;
    }
    return toolServices.getTools({ page, perPage })
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

exports.createToolVersion = async (req, res, next) => {

};
exports.deleteToolVersion = async (req, res, next) => {

};
exports.getToolVersion = async (req, res, next) => {

};
exports.getToolVersions = async (req, res, next) => {

};




