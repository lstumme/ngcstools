const express = require('express');
const { isAuth } = require('ngcsusers');
const isToolManager = require('../middleware/is-toolmanager.js');
const toolController = require('../controllers/toolcontroller');


const initRouter = () => {
    const router = express.Router();
    router.post('/createTool', isAuth, isToolManager, toolController.createTool);
    router.delete('/deleteTool', isAuth, isToolManager, toolController.deleteTool);
    router.put('/updateToolInformations', isAuth, isToolManager, toolController.updateToolInformations);
    router.get('/getTool:toolId', isAuth, toolController.getTool);
    router.get('/getTools', isAuth, toolController.getTools);

    router.post('/createToolVersion', iAuth, isToolManager, toolController.createToolVersion);
    router.delete('/deleteToolVersion', isAuth, isToolManager, toolController.deleteToolVersion);
    router.put('/updateToolVersionInformations', isAuth, isToolManager, toolController.updateToolVersionInformations);
    router.get('getToolVersion:versionId', isAuth, toolController.getToolVersion);
    router.get('/getToolVersions', isAuth, toolContoller.getToolVersions);

    return router;
}

module.exports = initRouter;