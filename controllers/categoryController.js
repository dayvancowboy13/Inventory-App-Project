const db = require('../db/queries');

exports.get = async (req, res) => {
    let content = await db.getCategories();
    console.log(content);
    res.render('categories', { categories: content });
};

exports.addCategory = async (req, res) => {
    res.render('addCategory');
}