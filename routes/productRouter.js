const { Router } = require("express");
const productController = require("../controllers/productController")

const productRouter = Router();

productRouter.get('/', productController.get);

module.exports = productRouter;