const ToolServices = require('../services/toolservices');

exports.createTool = async (req, res, next) => {
	const name = req.body.name;
	if (!name) {
		const error = new Error('Bad arguments');
		error.statusCode = 400;
		next(error);
		return null;
	};

	return ToolServices.createTool({ name })
		.then(response => {
			res.status(201).json({ message: 'Tool created', data: response });
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


exports.updateTool = async (req, res, next) => {
	const toolId = req.body.toolId;
	const vendor = req.body.vendor;
	if (!toolId) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        next(error);	
		return null;
	}

	return ToolServices.updateTool({ toolId, vendor})
        .then(response => {
            res.status(201).json({ message: 'Tool updated', data: response });
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


exports.deleteTool = async (req, res, next) => {
	const toolId = req.body.toolId;
	if (!toolId) {
		const error = new Error('Bad arguments');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ToolServices.deleteTool({ toolId })
		.then(response => {
			res.status(200).json({ message: 'Tool deleted', data: response });
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

exports.getTools = async (req, res, next) => {
	const page = req.query.page;
	const perPage = req.query.perPage;
	if (!page || !perPage) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ToolServices.getTools({ page, perPage })
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

exports.getTool = async (req, res, next) => {
	const toolId = req.query.toolId;
	if (!toolId) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ToolServices.getTool({ toolId })
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


exports.findToolByName = async (req, res, next) => {
	const name = req.query.name
	if (!name) {
		const error = new Error('Bad arguments.');
		error.statusCode = 400;
		next(error);
		return null;
	}

	return ToolServices.findToolByName({ name: name })
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



