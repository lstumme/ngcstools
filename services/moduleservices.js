const Tool = require('../model/tool');
const Module = require('../model/module');

const convertModule2Object = m => {
	return {
		moduleId: m._id.toString(),
		name: m.name,
		informations: m.informations,
		vendor: m.vendor,
		tool: m.tool.toString(),
	};
};

exports.createModule = async ({ name, tool }) => {
	const module = new Module({
		name: name,
		tool: tool,
	});
	return module.save().then(m => {
		return convertModule2Object(m);
	});
};

exports.updateModule =  async ({ moduleId, informations, vendor}) => {    
	return Module.findOne({ _id: moduleId,  }).then(module => {
        if (!module) {
            const error = new Error('Could not find module.')
            error.statusCode = 404;
            throw error;
        }

		if (informations) module.informations = informations;
		if (vendor) module.vendor = vendor;

		return module.save().then(m => {
			return convertModule2Object(m);
		});
	});
};


exports.deleteModule = async ({ moduleId }) => {
	return Module.exists({ _id: moduleId })
		.then(result => {
			if (!result) {
				const error = new Error('Module to delete was not found');
				error.statusCode = 404;
				throw error;
			}
			return result;
		})
		.then(() => {
			return Module.deleteOne({ _id: moduleId })
				.then(() => {
					return { moduleId };
				})
		});
};

exports.getModules = async ({ toolId, page, perPage }) => {
	return Module.countDocuments({ tool: toolId })
		.then(count => {
			const pageCount = Math.trunc(count / perPage) + (count % perPage > 0 ? 1 : 0);
			if (count <= perPage * (page - 1) || (perPage * (page - 1) < 0)) {
				const error = new Error('Pagination out of bounds.');
				error.statusCode = 400;
				throw error;
			}
			return Module.find({ tool: toolId }).skip((page - 1) * perPage).limit(Number.parseInt(perPage))
				.then(result => {
					return {
						modules: result.map(m => { return convertModule2Object(m); }),
						pageCount: pageCount
					};
				})
		});
};

exports.getModule = async ({ moduleId }) => {
	return Module.findOne({ _id: moduleId })
		.then(module => {
			if (!module) {
				const error = new Error('Module not found');
				error.statusCode = 404;
				throw error;
			}
			return convertModule2Object(module);
		})
};


exports.findModuleByName = async ({ name }) => {
	return Module.findOne({ name: name })
		.then(module => {
			if (!module) {
				const error = new Error('Could not find Module');
				error.statusCode = 404;
				throw error;
			}
			return convertModule2Object(module);
		});
};



