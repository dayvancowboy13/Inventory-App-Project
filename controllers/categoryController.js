const db = require('../db/queries');

exports.get = async (req, res) => {
    let content = await db.getCategories();
    console.log(content);
    res.render('categories', { categories: content });
};

exports.addCategory = async (req, res) => {
    res.render('addCategory');
};

exports.post = async (req, res) => {
    await db.addCategory(
        req.body.categoryName,
        req.body.categoryDescription,
    )
    res.redirect('./');
};

exports.getEditPage = async (req, res) => {
    console.log('sending the edit page')
    const id = Number(req.url.split('/')[2]);
    const catInfo = await db.getCategoryById(id);
    res.render('editCategory', { catInfo });
};

exports.editCategory = async (req, res) => {
    const id = Number(req.url.split('/')[2]);
    await db.updateCategory(
        id,
        req.body.categoryName,
        req.body.categoryDescription
    );
    res.redirect('/categories');
};