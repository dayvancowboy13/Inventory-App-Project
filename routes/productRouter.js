const { Router } = require("express");
const productController = require("../controllers/productController")

const productRouter = Router();

productRouter.get('/', productController.get);
productRouter.get('/add', productController.createProduct)
productRouter.get('/:id', productController.detailPage)
productRouter.post('/add', productController.post);
productRouter.delete('/:id', productController.deleteItem);
productRouter.post('/edit/:id', productController.editItem);


module.exports = productRouter;