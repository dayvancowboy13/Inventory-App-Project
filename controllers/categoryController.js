const db = require('../db/queries');

exports.get = async (req, res) => {
    let content = await db.getAllCategories();
    console.log(content);
    res.render('categories', { categories: content });
};