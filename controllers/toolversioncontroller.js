const ToolVersionServices = require('../services/toolversionservices');

exports.createToolVersion = async (req, res, next) => {
	const tool = req.body.tool;
	const version = req.body.version;
	if (!tool || !version) {
		const error = new Error('Bad arguments');
		error.statusCode = 400;
		next(error);
		return null;
	};

	return ToolVersionServices.createToolVersion({ tool, version })
		.then(response => {
			res.status(201).json({ message: 'ToolVersion created', data: response });
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


exports.updateToolVersion = async (req, res, next) => {
	const toolVersionId = req.body.toolVersionId;
	const location = req.body.location;
	const informations = req.body.informations;
	if (!toolVersionId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);	
		return null;
	}

	return ToolVersionServices.updateToolVersion({ toolVersionId, location, informations})
        .then(response => {
            res.status(201).json({ message: 'ToolVersion updated', data: response });
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


exports.deleteToolVersion = async (req, res, next) => {
	const toolVersionId = req.body.toolVersionId;
	if (!toolVersionId) {
		const error = new Error('Bad arguments');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ToolVersionServices.deleteToolVersion({ toolVersionId })
		.then(response => {
			res.status(200).json({ message: 'ToolVersion deleted', data: response });
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

exports.getToolVersions = async (req, res, next) => {
	const toolId = req.query.toolId;
	const page = req.query.page;
	const perPage = req.query.perPage;
	if (!toolId || !page || !perPage) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ToolVersionServices.getToolVersions({ toolId, page, perPage })
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

exports.getToolVersion = async (req, res, next) => {
	const toolVersionId = req.query.toolVersionId;
	if (!toolVersionId) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ToolVersionServices.getToolVersion({ toolVersionId })
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




