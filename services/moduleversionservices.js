const Module = require('../model/module');
const Tool = require('../model/tool');
const ModuleVersion = require('../model/moduleversion');

const convertModuleVersion2Object = m => {
	return {
		moduleVersionId: m._id.toString(),
		informations: m.informations,
		version: m.version,
		location: m.location,
		creationDate: m.creationDate,
		module: m.module.toString(),
	};
};

exports.createModuleVersion = async ({ module, version }) => {
	const moduleVersion = new ModuleVersion({
		version: version,
		module: module,
	});
	return moduleVersion.save().then(m => {
		return convertModuleVersion2Object(m);
	});
};

exports.updateModuleVersion =  async ({ moduleVersionId, informations, location}) => {    
	return ModuleVersion.findOne({ _id: moduleVersionId,  }).then(moduleVersion => {
        if (!moduleVersion) {
            const error = new Error('Could not find moduleVersion.')
            error.statusCode = 404;
            throw error;
        }

		if (informations) moduleVersion.informations = informations;
		if (location) moduleVersion.location = location;

		return moduleVersion.save().then(m => {
			return convertModuleVersion2Object(m);
		});
	});
};


exports.deleteModuleVersion = async ({ moduleVersionId }) => {
	return ModuleVersion.exists({ _id: moduleVersionId })
		.then(result => {
			if (!result) {
				const error = new Error('ModuleVersion to delete was not found');
				error.statusCode = 404;
				throw error;
			}
			return result;
		})
		.then(() => {
			return ModuleVersion.deleteOne({ _id: moduleVersionId })
				.then(() => {
					return { moduleVersionId };
				})
		});
};

exports.getModuleVersions = async ({ moduleId, page, perPage }) => {
	return ModuleVersion.countDocuments({ module: moduleId })
		.then(count => {
			const pageCount = Math.trunc(count / perPage) + (count % perPage > 0 ? 1 : 0);
			if (count <= perPage * (page - 1) || (perPage * (page - 1) < 0)) {
				const error = new Error('Pagination out of bounds.');
				error.statusCode = 400;
				throw error;
			}
			return ModuleVersion.find({ module: moduleId }).skip((page - 1) * perPage).limit(Number.parseInt(perPage))
				.then(result => {
					return {
						moduleVersions: result.map(m => { return convertModuleVersion2Object(m); }),
						pageCount: pageCount
					};
				})
		});
};

exports.getModuleVersion = async ({ moduleVersionId }) => {
	return ModuleVersion.findOne({ _id: moduleVersionId })
		.then(moduleVersion => {
			if (!moduleVersion) {
				const error = new Error('ModuleVersion not found');
				error.statusCode = 404;
				throw error;
			}
			return convertModuleVersion2Object(moduleVersion);
		})
};




