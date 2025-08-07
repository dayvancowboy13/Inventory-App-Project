const { Router } = require("express");
const manufacturerController = require('../controllers/manufacturerController')

const manufacturerRouter = Router();

manufacturerRouter.get('/', manufacturerController.get);
manufacturerRouter.get('/add', manufacturerController.addManufacturer);
manufacturerRouter.post('/add', manufacturerController.post);

module.exports = manufacturerRouter;