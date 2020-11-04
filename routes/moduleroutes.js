const express = require('express');
const { isAuth } = require('ngcsusers');
const isToolManager = require('../middleware/is-toolmanager.js');
const moduleController = require('../controllers/modulecontroller');


const initRouter = () => {
    const router = express.Router();

    router.post('/createModule', isAuth, isToolManager, moduleController.createModule);
    router.delete('/deleteModule', isAuth, isToolManager, moduleController.deleteModule);
    router.put('/updateModuleInformations', isAuth, isToolManager, moduleController.updateModuleInformations);
    router.get('/getModule:moduleId', isAuth, moduleController.getModule);
    router.get('/getModules', isAuth, moduleController.getModules);

    router.post('/createModuleVersion', isAuth, isToolManager, moduleController.createModuleVersion);
    router.delete('/deleteModuleVersion', isAuth, isToolManager, moduleController.deleteModuleVersion);
    router.put('/updateModuleInformations', isAuth, isToolManager, moduleController.updateModuleVersionInformations);
    router.get('/getModuleVersion:versionId', isAuth, moduleController.getModuleVersion);
    router.get('/getModuleVersions', isAuth, moduleController.getModuleVersions);

    return router;
};
module.exports = initRouter;