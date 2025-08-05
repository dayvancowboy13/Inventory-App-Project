const db = require('../db/queries');

exports.get = async (req, res) => {
    let content = await db.getManufacturers();
    console.log(content);
    res.render('manufacturers', { manufacturers: content });
};

exports.addManufacturer = async (req, res) => {
    res.render('addManufacturer');
}