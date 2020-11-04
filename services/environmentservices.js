const Environment = require('../model/environment');
const idtostring = require('./dbutils');

exports.createEnvironment = async ({ name }) => {
    return Environment.findOne({ name }).then(existingEnvironment => {
        if (existingEnvironment) {
            const error = new Error(`Environment ${name} already exists`);
            error.statusCode = 409;
            throw error;

        }
        const environment = new Environment({ name });
        return environment.save()
            .then(newEnvironment => {
                return {
                    environmentId: newEnvironment._id.toString(),
                    name: newEnvironment.name
                };
            })
    });
};

exports.deleteEnvironment = async ({ environmentId }) => {
    return Environment.findOne({ _id: environmentId }).then(environment => {
        if (!environment) {
            const error = new Error('Could not find environment.')
            error.statusCode = 404;
            throw error;
        }
        return environment.remove().then(e => {
            return { environmentId: environment._id.toString() }
        })
    });
};

exports.updateEnvironmentInformations = ({ environmentId, informations }) => {
    return Environment.findOne({ _id: environmentId }).then(environment => {
        if (!environment) {
            const error = new Error('Could not find environment.')
            error.statusCode = 404;
            throw error;
        }
        const params = {}
        if (informations) environment.informations = informations;
        return environment.save().then(e => {
            return {
                environmentId: e._id.toString(),
                name: e.name,
                toolVersionsId: idtostring(e.toolVersionId),
                informations: e.informations
            }
        });
    });
};

exports.getEnvironment = async ({ environmentId }) => {
    return Environment.findOne({ _id: environmentId })
        .then(environment => {
            if (!environment) {
                const error = new Error('Environment not found.')
                error.statusCode = 404;
                throw error;
            }
            return environment;
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
            return Environment.find().skip((page - 1) * perPage).limit(perPage)
                .then(result => {
                    return {
                        environments: result,
                        pageCount: pageCount
                    };

                })
        });
};



