const db = require('../db/queries');

exports.get = async (req, res) => {
    let content = await db.getAllItems();

    res.render('products', { products: content });
}

exports.createProduct = async (req, res) => {
    let manufs = await db.getManufacturers();
    let cats = await db.getCategories();

    res.render('addProduct', { manufacturers: manufs, categories: cats });
}

exports.post = async (req, res) => {
    console.log('Adding new product...')
    await db.addProduct(
        req.body.productName,
        req.body.manufacturer,
        req.body.productCategory,
        req.body.productPrice,
        req.body.productQuantity,
        req.body.productDescription
    )
    res.redirect('./');
}