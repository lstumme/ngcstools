const Tool = require('../model/tool');

const convertTool2Object = t => {
	return {
		toolId: t._id.toString(),
		name: t.name,
		vendor: t.vendor,
	};
};

exports.createTool = async ({ name }) => {
	const tool = new Tool({
		name: name,
	});
	return tool.save().then(t => {
		return convertTool2Object(t);
	});
};

exports.updateTool =  async ({ toolId, vendor}) => {    
	return Tool.findOne({ _id: toolId,  }).then(tool => {
        if (!tool) {
            const error = new Error('Could not find tool.')
            error.statusCode = 404;
            throw error;
        }

		if (vendor) tool.vendor = vendor;

		return tool.save().then(t => {
			return convertTool2Object(t);
		});
	});
};


exports.deleteTool = async ({ toolId }) => {
	return Tool.exists({ _id: toolId })
		.then(result => {
			if (!result) {
				const error = new Error('Tool to delete was not found');
				error.statusCode = 404;
				throw error;
			}
			return result;
		})
		.then(() => {
			return Tool.deleteOne({ _id: toolId })
				.then(() => {
					return { toolId };
				})
		});
};

exports.getTools = async ({ page, perPage }) => {
	return Tool.countDocuments()
		.then(count => {
			const pageCount = Math.trunc(count / perPage) + (count % perPage > 0 ? 1 : 0);
			if (count <= perPage * (page - 1) || (perPage * (page - 1) < 0)) {
				const error = new Error('Pagination out of bounds.');
				error.statusCode = 400;
				throw error;
			}
			return Tool.find().skip((page - 1) * perPage).limit(Number.parseInt(perPage))
				.then(result => {
					return {
						tools: result.map(t => { return convertTool2Object(t); }),
						pageCount: pageCount
					};
				})
		});
};

exports.getTool = async ({ toolId }) => {
	return Tool.findOne({ _id: toolId })
		.then(tool => {
			if (!tool) {
				const error = new Error('Tool not found');
				error.statusCode = 404;
				throw error;
			}
			return convertTool2Object(tool);
		})
};


exports.findToolByName = async ({ name }) => {
	return Tool.findOne({ name: name })
		.then(tool => {
			if (!tool) {
				const error = new Error('Could not find Tool');
				error.statusCode = 404;
				throw error;
			}
			return convertTool2Object(tool);
		});
};



