const express = require('express');
const { isAuth } = require('ngcsusers');
const isToolManager = require('../middleware/is-toolmanager.js');
const moduleController = require('../controllers/modulecontroller');


const initRouter = () => {
    const router = express.Router();

    router.post('/createModule', isAuth, isToolManager, moduleController.createTool);
    router.delete('/deleteModule', isAuth, isToolManager, moduleController.deleteTool);
    router.put('/updateModuleInformations', isAuth, isToolManager, moduleController.updateToolInformations);
    router.get('/getModule:ModuleId', isAuth, moduleController.getTool);
    router.get('/getModules', isAuth, moduleController.getTools);

    router.post('/createModuleVersion', iAuth, isToolManager, moduleController.createToolVersion);
    router.delete('/deleteModuleVersion', isAuth, isToolManager, moduleController.deleteToolVersion);
    router.get('getModuleVersion:versionId', isAuth, moduleController.getToolVersion);
    router.get('/getModuleVersions', isAuth, toolContoller.getToolVersions);
};