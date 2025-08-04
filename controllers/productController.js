const db = require('../db/queries');

exports.get = async (req, res) => {
    let content = await db.getAllItems();

    console.log(content);
    res.render('products', { products: content });
}

exports.createProduct = (req, res) => {
    res.send('New product page :)');
}