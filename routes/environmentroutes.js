const express = require('express');
const { isAuth } = require('ngcsusers');
const isToolManager = require('../middleware/is-toolmanager.js');
const environmentController = require('../controllers/environmentcontroller');


const initRouter = () => {
    const router = express.Router();
    router.post('/createEnvironment', isAuth, isToolManager, environmentController.createTool);
    router.delete('/deleteEnvironment', isAuth, isToolManager, environmentController.deleteTool);
    router.put('/updateEnvironmentInformations', isAuth, isToolManager, environmentController.updateToolInformations);
    router.get('/getEnvironment:environmentId', isAuth, environmentController.getTool);
    router.get('/getEnvironments', isAuth, environmentController.getTools);
};
module.exports = initRouter;