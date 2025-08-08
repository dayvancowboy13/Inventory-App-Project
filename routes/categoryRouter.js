const { Router } = require("express");
const categoryController = require('../controllers/categoryController')

const categoryRouter = Router();

categoryRouter.get('/', categoryController.get);
categoryRouter.get('/add', categoryController.addCategory);
categoryRouter.get('/edit/:id', categoryController.getEditPage);
categoryRouter.post('/add', categoryController.post);
categoryRouter.post('/edit/:id', categoryController.editCategory);


module.exports = categoryRouter;