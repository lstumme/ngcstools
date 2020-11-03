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
        throw error;
    }
    return toolServices.deleteTool({ toolId })
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
        throw error;
    }
    return toolServices.updateToolInformations({ toolId, vendor, informations })
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
    const toolId = req.body.toolId;
    const version = req.body.version;
    if (!toolId || !version) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return toolServices.createToolVersion({ toolId, version })
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
        throw error;
    }
    return toolServices.deleteToolVersion({ toolVersionId })
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
        throw error;
    }
    return toolServices.updateToolVersionInformations({ toolVersionId, location, informations })
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
        throw error;
    }

    return toolServices.getToolVersion({ toolVersionId })
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
        throw error;
    }

    return toolServices.getToolVersions({ toolId, page, perPage })
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




