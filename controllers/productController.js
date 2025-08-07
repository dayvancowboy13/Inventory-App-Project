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

exports.post = async (req, res) => {
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

exports.detailPage = async (req, res) => {
    const id = req.url.slice(1);
    let content = await db.getItemById(id);
    res.render('productDetails', { product: content, deleteFunc: db.deleteItemById });
}

exports.deleteItem = async (req, res) => {
    const id = Number(req.url.slice(1));
    await db.deleteItemById(id).then(result => {
        res.json({ redirect: '/products' })
    })
        .catch(err => console.log(err));
}