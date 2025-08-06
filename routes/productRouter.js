const { Router } = require("express");
const productController = require("../controllers/productController")

const productRouter = Router();

productRouter.get('/', productController.get);
productRouter.get('/add', productController.createProduct)
productRouter.post('/add', productController.post);

module.exports = productRouter;