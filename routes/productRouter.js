const { Router } = require("express");
const productController = require("../controllers/productController")

const productRouter = Router();

productRouter.get('/', productController.getProductPage);
productRouter.get('/add', productController.getCreateProductPage)
productRouter.get('/:id', productController.getDetailPage)
productRouter.post('/add', productController.postNewProduct);
productRouter.delete('/:id', productController.deleteProduct);
productRouter.post('/edit/:id', productController.editProduct);


module.exports = productRouter;