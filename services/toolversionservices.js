const Tool = require('../model/tool');
const ToolVersion = require('../model/toolversion');

const convertToolVersion2Object = t => {
	return {
		toolVersionId: t._id.toString(),
		version: t.version,
		location: t.location,
		informations: t.informations,
		tool: t.tool.toString(),
	};
};

exports.createToolVersion = async ({ tool, version }) => {
	const toolVersion = new ToolVersion({
		version: version,
		tool: tool,
	});
	return toolVersion.save().then(t => {
		return convertToolVersion2Object(t);
	});
};

exports.updateToolVersion =  async ({ toolVersionId, location, informations}) => {    
	return ToolVersion.findOne({ _id: toolVersionId,  }).then(toolVersion => {
        if (!toolVersion) {
            const error = new Error('Could not find toolVersion.')
            error.statusCode = 404;
            throw error;
        }

		if (location) toolVersion.location = location;
		if (informations) toolVersion.informations = informations;

		return toolVersion.save().then(t => {
			return convertToolVersion2Object(t);
		});
	});
};


exports.deleteToolVersion = async ({ toolVersionId }) => {
	return ToolVersion.exists({ _id: toolVersionId })
		.then(result => {
			if (!result) {
				const error = new Error('ToolVersion to delete was not found');
				error.statusCode = 404;
				throw error;
			}
			return result;
		})
		.then(() => {
			return ToolVersion.deleteOne({ _id: toolVersionId })
				.then(() => {
					return { toolVersionId };
				})
		});
};

exports.getToolVersions = async ({ toolId, page, perPage }) => {
	return ToolVersion.countDocuments({ tool: toolId })
		.then(count => {
			const pageCount = Math.trunc(count / perPage) + (count % perPage > 0 ? 1 : 0);
			if (count <= perPage * (page - 1) || (perPage * (page - 1) < 0)) {
				const error = new Error('Pagination out of bounds.');
				error.statusCode = 400;
				throw error;
			}
			return ToolVersion.find({ tool: toolId }).skip((page - 1) * perPage).limit(Number.parseInt(perPage))
				.then(result => {
					return {
						toolVersions: result.map(t => { return convertToolVersion2Object(t); }),
						pageCount: pageCount
					};
				})
		});
};

exports.getToolVersion = async ({ toolVersionId }) => {
	return ToolVersion.findOne({ _id: toolVersionId })
		.then(toolVersion => {
			if (!toolVersion) {
				const error = new Error('ToolVersion not found');
				error.statusCode = 404;
				throw error;
			}
			return convertToolVersion2Object(toolVersion);
		})
};




