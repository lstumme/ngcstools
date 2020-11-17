const ToolServices = require('../services/toolservices.js');

exports.createTool = async (req, res, next) => {
    const name = req.body.name;
    if (!name) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);
    }
    return ToolServices.createTool({ name })
        .then(response => {
            res.status(201).json({ message: 'Tool created', data: response });
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
        next(error);
    }
    return ToolServices.deleteTool({ toolId })
        .then(response => {
            res.status(201).json({ message: 'Tool deleted', data: response });
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
    const informations = req.body.informations;
    if (!toolId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);
    }
    return ToolServices.updateToolInformations({ toolId, vendor, informations })
        .then(response => {
            res.status(200).json({ message: 'Tool updated', data: response });
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
        next(error);
    }

    return ToolServices.getTool({ toolId })
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
        next(error);
    }
    return ToolServices.getTools({ page, perPage })
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





