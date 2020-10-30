
const toolServices = require('../services/toolservices');

module.exports = async (req, res, next) => {
    const userId = req.auth.userId;
    return toolServices.isToolManager(userId)
        .then(result => {
            if (!result) {
                const error = new Error('Unauthorized');
                error.statusCode = 401;
                throw error;
            }
            next();
        })
};