const toolservices = require('../services/toolservices.js');

exports.createTool = async (req, res, next) => {
    const name = req.body.name;
    if (!name) {
        const error = new Error('Bad arguments');
        error.statusCode = 400;
        throw error;
    }
    return toolservices.createTool({ name })
        .then(response => {
            res.status(201).json({ ...response });
            return response;
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteTool = async (req, res, next) => {

};

exports.updateToolInformations = async (req, res, next) => {

};

exports.getTool = async (req, res, next) => {

};

exports.getTools = async (req, res, next) => {

};

exports.createToolVersion = async (req, res, next) => {

};
exports.deleteToolVersion = async (req, res, next) => {

};
exports.getToolVersion = async (req, res, next) => {

};
exports.getToolVersions = async (req, res, next) => {

};




