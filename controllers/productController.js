const db = require('../db/queries');
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const validateProduct = [
    body('productName').trim().isLength({ min: 1, max: 30 })
        .withMessage('Product name must be between 1 and 30 characters')
        .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Product name can only contain letters, numbers, or spaces'),
    body('productDescription').trim().isLength({ max: 200 })
        .withMessage('Product description must contain fewer than 200 characters')
];

exports.getProductPage = async (req, res) => {
    let content = await db.getAllProducts();
    res.render('products', { products: content });
}

exports.getCreateProductPage = async (req, res) => {
    let manufs = await db.getManufacturers();
    let cats = await db.getCategories();

    res.render('addProduct', { manufacturers: manufs, categories: cats });
}

// exports.postNewProduct = async (req, res) => {
//     await db.addProduct(
//         req.body.productName,
//         req.body.manufacturer,
//         req.body.productCategory,
//         req.body.productPrice,
//         req.body.productQuantity,
//         req.body.productDescription
//     )
//     res.redirect('./');
// }

exports.postNewProduct = [
    validateProduct, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let manufs = await db.getManufacturers();
            let cats = await db.getCategories();
            return res.status(400).render('addProduct',
                {
                    errors: errors.array(),
                    manufacturers: manufs, categories: cats
                }
            )
        } else {
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

    }]


exports.getDetailPage = async (req, res) => {
    const id = req.url.slice(1);
    let content = await db.getProductById(id);
    let manufs = await db.getManufacturers();
    let cats = await db.getCategories();
    res.render('productDetails', { product: content, manufacturers: manufs, categories: cats });
}

exports.deleteProduct = async (req, res) => {
    const id = Number(req.url.slice(1));
    await db.deleteProductById(id)
        .then(result => {
            res.json({ redirect: '/products' })
        })
        .catch(err => console.log(err));
}

exports.postPasswordCheck = async (req, res) => {
    console.log(`Checking password from user...`);
    if (String(req.body.password) != String(process.env.ADMIN_PW)) {
        console.log('Wrong password')
        res.status(404).send();
    } else {
        res.status(200).send();
        console.log('Initiating database removal...')
    }
}

// exports.editproduct = async (req, res) => {
//     const id = Number(req.url.split('/')[2]);
//     await db.updateProduct(
//         id,
//         req.body.productName,
//         req.body.manufacturer,
//         req.body.productCategory,
//         req.body.productPrice,
//         req.body.productQuantity,
//         req.body.productDescription
//     );
//     res.redirect('/products/' + id);
// }

exports.editProduct = [
    validateProduct, async (req, res) => {
        const errors = validationResult(req);
        const id = Number(req.url.split('/')[2]);
        let content = await db.getProductById(id);
        let manufs = await db.getManufacturers();
        let cats = await db.getCategories();

        if (!errors.isEmpty()) {
            return res.status(400).render('productDetails',
                {
                    errors: errors.array(),
                    product: content,
                    manufacturers: manufs,
                    categories: cats
                }
            )
        } else {
            await db.updateProduct(
                id,
                req.body.productName,
                req.body.manufacturer,
                req.body.productCategory,
                req.body.productPrice,
                req.body.productQuantity,
                req.body.productDescription
            );
            res.redirect('/products/' + id);
        }
    }]