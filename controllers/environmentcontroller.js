const EnvironmentServices = require('../services/environmentservices');

exports.createEnvironment = async (req, res, next) => {
	const name = req.body.name;
	if (!name) {
		const error = new Error('Bad arguments');
		error.statusCode = 400;
		next(error);
		return null;
	};

	return EnvironmentServices.createEnvironment({ name })
		.then(response => {
			res.status(201).json({ message: 'Environment created', data: response });
			return null;
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
			return null;
		});
};


exports.updateEnvironment = async (req, res, next) => {
	const environmentId = req.body.environmentId;
	const informations = req.body.informations;
	if (!environmentId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);	
		return null;
	}

	return EnvironmentServices.updateEnvironment({ environmentId, informations})
        .then(response => {
            res.status(201).json({ message: 'Environment updated', data: response });
            return null;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
			return null;
        });
};


exports.deleteEnvironment = async (req, res, next) => {
	const environmentId = req.body.environmentId;
	if (!environmentId) {
		const error = new Error('Bad arguments');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return EnvironmentServices.deleteEnvironment({ environmentId })
		.then(response => {
			res.status(200).json({ message: 'Environment deleted', data: response });
			return null;
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
			return null;
		});
};

exports.getEnvironments = async (req, res, next) => {
	const page = req.query.page;
	const perPage = req.query.perPage;
	if (!page || !perPage) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return EnvironmentServices.getEnvironments({ page, perPage })
		.then(response => {
			res.status(200).json(response);
			return null;
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
			return null;
		});
};

exports.getEnvironment = async (req, res, next) => {
	const environmentId = req.query.environmentId;
	if (!environmentId) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return EnvironmentServices.getEnvironment({ environmentId })
		.then(response => {
			res.status(200).json(response);
			return null;
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
			return null;
		});
};

exports.addModuleVersionToEnvironment = async (req, res, next) => {
	const environmentId = req.body.environmentId;
	const moduleVersionId = req.body.moduleVersionId;
	if (!environmentId || !moduleVersionId) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return EnvironmentServices.addModuleVersionToEnvironment({ environmentId: environmentId, moduleVersionId: moduleVersionId })
		.then(response => {
			res.status(200).json({ message: 'moduleVersion added', data: response });
			return null;
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
			return null;
		});
};

exports.removeModuleVersionFromEnvironment = async (req, res, next) => {
	const environmentId = req.body.environmentId;
	const moduleVersionId = req.body.moduleVersionId;
	if (!environmentId || !moduleVersionId) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return EnvironmentServices.removeModuleVersionFromEnvironment({ environmentId: environmentId, moduleVersionId: moduleVersionId })
		.then(response => {
			res.status(200).json({ message: 'moduleVersion removed', data: response });
			return null;
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
			return null;
		});
};

exports.addToolVersionToEnvironment = async (req, res, next) => {
	const environmentId = req.body.environmentId;
	const toolVersionId = req.body.toolVersionId;
	if (!environmentId || !toolVersionId) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return EnvironmentServices.addToolVersionToEnvironment({ environmentId: environmentId, toolVersionId: toolVersionId })
		.then(response => {
			res.status(200).json({ message: 'toolVersion added', data: response });
			return null;
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
			return null;
		});
};

exports.removeToolVersionFromEnvironment = async (req, res, next) => {
	const environmentId = req.body.environmentId;
	const toolVersionId = req.body.toolVersionId;
	if (!environmentId || !toolVersionId) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return EnvironmentServices.removeToolVersionFromEnvironment({ environmentId: environmentId, toolVersionId: toolVersionId })
		.then(response => {
			res.status(200).json({ message: 'toolVersion removed', data: response });
			return null;
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
			return null;
		});
};


exports.findEnvironmentByName = async (req, res, next) => {
	const name = req.query.name
	if (!name) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return EnvironmentServices.findEnvironmentByName({ name: name })
		.then(response => {
			res.status(200).json(response);
			return null;
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
			return null;
		});
};



