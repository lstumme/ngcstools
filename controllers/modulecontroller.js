const ModuleServices = require('../services/moduleservices');

exports.createModule = async (req, res, next) => {
	const name = req.body.name;
	const tool = req.body.tool;
	if (!name || !tool) {
		const error = new Error('Bad arguments');
		error.statusCode = 400;
		next(error);
		return null;
	};

	return ModuleServices.createModule({ name, tool })
		.then(response => {
			res.status(201).json({ message: 'Module created', data: response });
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


exports.updateModule = async (req, res, next) => {
	const moduleId = req.body.moduleId;
	const informations = req.body.informations;
	const vendor = req.body.vendor;
	if (!moduleId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);	
		return null;
	}

	return ModuleServices.updateModule({ moduleId, informations, vendor})
        .then(response => {
            res.status(201).json({ message: 'Module updated', data: response });
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


exports.deleteModule = async (req, res, next) => {
	const moduleId = req.body.moduleId;
	if (!moduleId) {
		const error = new Error('Bad arguments');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ModuleServices.deleteModule({ moduleId })
		.then(response => {
			res.status(200).json({ message: 'Module deleted', data: response });
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

exports.getModules = async (req, res, next) => {
	const toolId = req.query.toolId;
	const page = req.query.page;
	const perPage = req.query.perPage;
	if (!toolId || !page || !perPage) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ModuleServices.getModules({ toolId, page, perPage })
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

exports.getModule = async (req, res, next) => {
	const moduleId = req.query.moduleId;
	if (!moduleId) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ModuleServices.getModule({ moduleId })
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


exports.findModuleByName = async (req, res, next) => {
	const name = req.query.name
	if (!name) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ModuleServices.findModuleByName({ name: name })
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



