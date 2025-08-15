const { Router } = require("express");
const manufacturerController = require('../controllers/manufacturerController')

const manufacturerRouter = Router();

manufacturerRouter.get('/', manufacturerController.getManufacturerPage);
manufacturerRouter.get('/add', manufacturerController.getAddManufacturerPage);
manufacturerRouter.get('/edit/:id', manufacturerController.getEditPage);
manufacturerRouter.post('/add', manufacturerController.postNewManufacturer);
manufacturerRouter.post('/edit/:id', manufacturerController.postEditManufacturer);

module.exports = manufacturerRouter;