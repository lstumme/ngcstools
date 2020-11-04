const environmentServices = require('../services/environmentservices.js');

exports.createEnvironment = async (req, res, next) => {
    const name = req.body.name;
    if (!name) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return environmentServices.createEnvironment({ name })
        .then(response => {
            res.status(201).json({ message: 'Environment created', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteEnvironment = async (req, res, next) => {
    const environmentId = req.body.environmentId;
    if (!environmentId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return environmentServices.deleteEnvironment({ environmentId })
        .then(response => {
            res.status(201).json({ message: 'Environment deleted', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.addToolVersionToEnvironment = async (req, res, next) => {
    const environmentId = req.body.environmentId;
    const toolVersionId = req.body.toolVersionId;
    if(!environmentId || !toolVersionId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return environmentServices.addToolVersionToEnvironment({ environmentId, toolVersionId })
        .then(response => {
            res.status(200).json({ message: 'Environment updated', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.removeToolVersionFromEnvironment = async (req, res, next) => {
    const environmentId = req.body.environmentId;
    const toolVersionId = req.body.toolVersionId;
    if(!environmentId || !toolVersionId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return environmentServices.removeToolVersionFromEnvironment({ environmentId, toolVersionId })
        .then(response => {
            res.status(200).json({ message: 'Environment updated', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateEnvironmentInformations = async (req, res, next) => {
    const environmentId = req.body.environmentId;
    const informations = req.body.informations;
    if (!environmentId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return environmentServices.updateEnvironmentInformations({ environmentId, informations })
        .then(response => {
            res.status(200).json({ message: 'Environment updated', data: response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getEnvironment = async (req, res, next) => {
    const environmentId = req.body.environmentId;
    if (!environmentId) {
        const error = new Error('Bad arguments.');
        error.statusCode = 400;
        throw error;
    }

    return environmentServices.getEnvironment({ environmentId })
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

exports.getEnvironments = async (req, res, next) => {
    const page = req.body.page;
    const perPage = req.body.perPage;
    if (!page || !perPage) {
        const error = new Error('Bad arguments.');
        error.statusCode = 400;
        throw error;
    }
    return environmentServices.getEnvironments({ page, perPage })
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