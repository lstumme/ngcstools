const ModuleVersion = require('../model/moduleversion');
const Module = require('../model/module');
const Tool = require('../model/tool');
const ToolVersion = require('../model/toolversion');
const Environment = require('../model/environment');

const convertEnvironment2Object = e => {
	return {
		environmentId: e._id.toString(),
		name: e.name,
		informations: e.informations,
		modules: e.modules.map(el => { return el.toString() }),
		tools: e.tools.map(el => { return el.toString() }),
	};
};

exports.createEnvironment = async ({ name }) => {
	const environment = new Environment({
		name: name,
	});
	return environment.save().then(e => {
		return convertEnvironment2Object(e);
	});
};

exports.updateEnvironment =  async ({ environmentId, informations}) => {    
	return Environment.findOne({ _id: environmentId,  }).then(environment => {
        if (!environment) {
            const error = new Error('Could not find environment.')
            error.statusCode = 404;
            throw error;
        }

		if (informations) environment.informations = informations;

		return environment.save().then(e => {
			return convertEnvironment2Object(e);
		});
	});
};


exports.deleteEnvironment = async ({ environmentId }) => {
	return Environment.exists({ _id: environmentId })
		.then(result => {
			if (!result) {
				const error = new Error('Environment to delete was not found');
				error.statusCode = 404;
				throw error;
			}
			return result;
		})
		.then(() => {
			return Environment.deleteOne({ _id: environmentId })
				.then(() => {
					return { environmentId };
				})
		});
};

exports.getEnvironments = async ({ page, perPage }) => {
	return Environment.countDocuments()
		.then(count => {
			const pageCount = Math.trunc(count / perPage) + (count % perPage > 0 ? 1 : 0);
			if (count <= perPage * (page - 1) || (perPage * (page - 1) < 0)) {
				const error = new Error('Pagination out of bounds.');
				error.statusCode = 400;
				throw error;
			}
			return Environment.find().skip((page - 1) * perPage).limit(Number.parseInt(perPage))
				.then(result => {
					return {
						environments: result.map(e => { return convertEnvironment2Object(e); }),
						pageCount: pageCount
					};
				})
		});
};

exports.getEnvironment = async ({ environmentId }) => {
	return Environment.findOne({ _id: environmentId })
		.then(environment => {
			if (!environment) {
				const error = new Error('Environment not found');
				error.statusCode = 404;
				throw error;
			}
			return convertEnvironment2Object(environment);
		})
};

exports.addModuleVersionToEnvironment = async ({ environmentId, moduleVersionId }) => {
	return Environment.findOne({ _id: environmentId })
		.then(environment => {
			if (!environment) {
				const error = new Error('Environment not found');
				error.statusCode = 404;
				throw error;
			}
			return environment;
		})
		.then(environment => {
			return ModuleVersion.findOne({ _id: moduleVersionId })
				.then(moduleVersionToAdd => {
					if (!moduleVersionToAdd) {
						const error = new Error('ModuleVersion to add not found');
						error.statusCode = 404;
						throw error;
					}
					const environmentObject = convertEnvironment2Object(environment);
					const index = environmentObject.modules.indexOf(moduleVersionId);
					if (index >= 0) {
						const error = new Error('ModuleVersion already in modules');
						error.statusCode = 400;
						throw error;
					}
					environment.modules.push(moduleVersionId);
					return environment.save()
						.then((finalEnvironment) => {
							return convertEnvironment2Object(finalEnvironment);
						})
				})
		})
};

exports.removeModuleVersionFromEnvironment = async ({ environmentId, moduleVersionId }) => {
	return Environment.findOne({ _id: environmentId })
		.then(environment => {
			if (!environment) {
				const error = new Error('Environment not found');
				error.statusCode = 404;
				throw error;
			}
			return environment;
		})
		.then(environment => {
			return ModuleVersion.findOne({ _id: moduleVersionId })
				.then(moduleVersionToRemove => {
					if (!moduleVersionToRemove) {
						const error = new Error('ModuleVersion to remove not found');
						error.statusCode = 404;
						throw error;
					}
					const environmentObject = convertEnvironment2Object(environment);
					const index = environmentObject.modules.indexOf(moduleVersionId);
					if (index < 0) {
						const error = new Error('ModuleVersion not in modules');
						error.statusCode = 400;
						throw error;
					}
					environment.modules.splice(index, 1);
					return environment.save()
						.then((finalEnvironment) => {
							return convertEnvironment2Object(finalEnvironment);
						})
				})
		})
};

exports.addToolVersionToEnvironment = async ({ environmentId, toolVersionId }) => {
	return Environment.findOne({ _id: environmentId })
		.then(environment => {
			if (!environment) {
				const error = new Error('Environment not found');
				error.statusCode = 404;
				throw error;
			}
			return environment;
		})
		.then(environment => {
			return ToolVersion.findOne({ _id: toolVersionId })
				.then(toolVersionToAdd => {
					if (!toolVersionToAdd) {
						const error = new Error('ToolVersion to add not found');
						error.statusCode = 404;
						throw error;
					}
					const environmentObject = convertEnvironment2Object(environment);
					const index = environmentObject.tools.indexOf(toolVersionId);
					if (index >= 0) {
						const error = new Error('ToolVersion already in tools');
						error.statusCode = 400;
						throw error;
					}
					environment.tools.push(toolVersionId);
					return environment.save()
						.then((finalEnvironment) => {
							return convertEnvironment2Object(finalEnvironment);
						})
				})
		})
};

exports.removeToolVersionFromEnvironment = async ({ environmentId, toolVersionId }) => {
	return Environment.findOne({ _id: environmentId })
		.then(environment => {
			if (!environment) {
				const error = new Error('Environment not found');
				error.statusCode = 404;
				throw error;
			}
			return environment;
		})
		.then(environment => {
			return ToolVersion.findOne({ _id: toolVersionId })
				.then(toolVersionToRemove => {
					if (!toolVersionToRemove) {
						const error = new Error('ToolVersion to remove not found');
						error.statusCode = 404;
						throw error;
					}
					const environmentObject = convertEnvironment2Object(environment);
					const index = environmentObject.tools.indexOf(toolVersionId);
					if (index < 0) {
						const error = new Error('ToolVersion not in tools');
						error.statusCode = 400;
						throw error;
					}
					environment.tools.splice(index, 1);
					return environment.save()
						.then((finalEnvironment) => {
							return convertEnvironment2Object(finalEnvironment);
						})
				})
		})
};


exports.findEnvironmentByName = async ({ name }) => {
	return Environment.findOne({ name: name })
		.then(environment => {
			if (!environment) {
				const error = new Error('Could not find Environment');
				error.statusCode = 404;
				throw error;
			}
			return convertEnvironment2Object(environment);
		});
};



