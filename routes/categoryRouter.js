const { Router } = require("express");
const categoryController = require('../controllers/categoryController')

const categoryRouter = Router();

categoryRouter.get('/', categoryController.get);
categoryRouter.get('/add', categoryController.addCategory);
categoryRouter.post('/add', categoryController.post);

module.exports = categoryRouter;