const ModuleVersionServices = require('../services/moduleversionservices');

exports.createModuleVersion = async (req, res, next) => {
	const module = req.body.module;
	const version = req.body.version;
	if (!module || !version) {
		const error = new Error('Bad arguments');
		error.statusCode = 400;
		next(error);
		return null;
	};

	return ModuleVersionServices.createModuleVersion({ module, version })
		.then(response => {
			res.status(201).json({ message: 'ModuleVersion created', data: response });
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


exports.updateModuleVersion = async (req, res, next) => {
	const moduleVersionId = req.body.moduleVersionId;
	const informations = req.body.informations;
	const location = req.body.location;
	if (!moduleVersionId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);	
		return null;
	}

	return ModuleVersionServices.updateModuleVersion({ moduleVersionId, informations, location})
        .then(response => {
            res.status(201).json({ message: 'ModuleVersion updated', data: response });
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


exports.deleteModuleVersion = async (req, res, next) => {
	const moduleVersionId = req.body.moduleVersionId;
	if (!moduleVersionId) {
		const error = new Error('Bad arguments');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ModuleVersionServices.deleteModuleVersion({ moduleVersionId })
		.then(response => {
			res.status(200).json({ message: 'ModuleVersion deleted', data: response });
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

exports.getModuleVersions = async (req, res, next) => {
	const moduleId = req.query.moduleId;
	const page = req.query.page;
	const perPage = req.query.perPage;
	if (!moduleId || !page || !perPage) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ModuleVersionServices.getModuleVersions({ moduleId, page, perPage })
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

exports.getModuleVersion = async (req, res, next) => {
	const moduleVersionId = req.query.moduleVersionId;
	if (!moduleVersionId) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ModuleVersionServices.getModuleVersion({ moduleVersionId })
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




