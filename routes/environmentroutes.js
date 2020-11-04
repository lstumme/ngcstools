const express = require('express');
const { isAuth } = require('ngcsusers');
const isToolManager = require('../middleware/is-toolmanager.js');
const environmentController = require('../controllers/environmentcontroller');


const initRouter = () => {
    const router = express.Router();

    router.post('/createEnvironment', isAuth, isToolManager, environmentController.createEnvironment);
    router.delete('/deleteEnvironment', isAuth, isToolManager, environmentController.deleteEnvironment);
    router.put('/updateEnvironmentInformations', isAuth, isToolManager, environmentController.updateEnvironmentInformations);
    router.get('/getEnvironment:environmentId', isAuth, environmentController.getEnvironment);
    router.get('/getEnvironments', isAuth, environmentController.getEnvironments);

    return router;
};
module.exports = initRouter;