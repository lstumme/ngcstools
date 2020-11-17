const ModuleVersion = require('../model/moduleversion');
const Module = require('../model/module');

const convertModuleVersion2Object = mv => {
    return {
        moduleVersionId: mv._id.toString(),
        moduleId: mv.moduleId.toString(),
        version: mv.version,
        location: mv.location,
        informations: mv.informations,
        creationDate: mv.creationDate
    }
}

exports.createModuleVersion = ({ moduleId, version }) => {
    return ModuleVersion.findOne({ moduleId, version: version }).then(existingModuleVersion => {
        if (existingModuleVersion) {
            const error = new Error(`Module version ${version} already exists for this module`);
            error.statusCode = 409;
            throw error;
        }
        return Module.findOne({ _id: moduleId })
            .then(existingModule => {
                if (!existingModule) {
                    const error = new Error('Specified module does not exist');
                    error.statusCode = 409;
                    throw error;
                }
                const moduleVersion = new ModuleVersion({ moduleId, version });
                return moduleVersion.save()
                    .then(newModuleVersion => {
                        return convertModuleVersion2Object(newModuleVersion);
                    })
            })
    });
};

exports.deleteModuleVersion = ({ moduleVersionId }) => {
    return ModuleVersion.findOne({ _id: moduleVersionId }).then(moduleVersion => {
        if (!moduleVersion) {
            const error = new Error('Could not find module version.')
            error.statusCode = 404;
            throw error;
        }
        return moduleVersion.remove()
            .then(m => {
                return { moduleVersionId: moduleVersion._id.toString() };
            })
    });
};

exports.updateModuleVersionInformations = async ({ moduleVersionId, location, informations }) => {
    return ModuleVersion.findOne({ _id: moduleVersionId }).then(moduleVersion => {
        if (!moduleVersion) {
            const error = new Error('Could not find module version.')
            error.statusCode = 404;
            throw error;
        }
        if (location) moduleVersion.location = location;
        if (informations) moduleVersion.informations = informations
        return moduleVersion.save()
            .then(m => {
                return convertModuleVersion2Object(m);
            })
    });
};

exports.getModuleVersion = async ({ moduleVersionId }) => {
    return ModuleVersion.findOne({ _id: moduleVersionId })
        .then(moduleVersion => {
            if (!moduleVersion) {
                const error = new Error('Module version not found.')
                error.statusCode = 404;
                throw error;
            }
            return convertModuleVersion2Object(moduleVersion);
        });
};

exports.getModuleVersions = async ({ moduleId, page, perPage }) => {
    return ModuleVersion.countDocuments({ moduleId: moduleId })
        .then(count => {
            const pageCount = Math.trunc(count / perPage) + (count % perPage > 0 ? 1 : 0);
            if (count <= perPage * (page - 1) || (perPage * (page - 1) < 0)) {
                const error = new Error('Pagination out of bounds.');
                error.statusCode = 400;
                throw error;
            }
            return ModuleVersion.find({ moduleId: moduleId }).skip((page - 1) * perPage).limit(perPage)
                .then(result => {
                    return {
                        moduleVersions: result.map(mv => { return convertModuleVersion2Object(mv) }),
                        pageCount: pageCount
                    };
                })
        });
};


