const { Router } = require("express");
const manufacturerController = require('../controllers/manufacturerController')

const manufacturerRouter = Router();

manufacturerRouter.get('/', manufacturerController.get);
manufacturerRouter.get('/add', manufacturerController.addManufacturer);
manufacturerRouter.get('/edit/:id', manufacturerController.getEditPage);
manufacturerRouter.post('/edit/:id', manufacturerController.editManufacturer);
manufacturerRouter.post('/add', manufacturerController.post);

module.exports = manufacturerRouter;