const { Router } = require("express");
const categoryController = require('../controllers/categoryController')

const categorytRouter = Router();

categorytRouter.get('/', categoryController.get);

module.exports = categorytRouter;