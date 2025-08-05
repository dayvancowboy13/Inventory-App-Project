const db = require('../db/queries');

exports.get = async (req, res) => {
    let content = await db.getAllItems();

    console.log(content);
    res.render('products', { products: content });
}

exports.createProduct = async (req, res) => {
    let manufs = await db.getManufacturers();
    let cats = await db.getCategories();

    res.render('addProduct', { manufacturers: manufs, categories: cats });
}