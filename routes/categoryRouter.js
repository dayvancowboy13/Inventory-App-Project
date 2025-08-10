const { Router } = require("express");
const categoryController = require('../controllers/categoryController')

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategoryPage);
categoryRouter.get('/add', categoryController.getAddCategoryPage);
categoryRouter.get('/edit/:id', categoryController.getEditPage);
categoryRouter.post('/add', categoryController.postNewCategory);
categoryRouter.post('/edit/:id', categoryController.postEditCategory);

module.exports = categoryRouter;