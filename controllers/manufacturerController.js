const db = require('../db/queries');

exports.get = async (req, res) => {
    let content = await db.getManufacturers();
    res.render('manufacturers', { manufacturers: content });
};

exports.addManufacturer = async (req, res) => {
    res.render('addManufacturer');
}

exports.post = async (req, res) => {
    console.log('adding new manufacturer...')
    await db.addManufacturer(
        req.body.manufacturerName,
        req.body.manufacturerLocation,
        req.body.manufacturerNotes,
    );
    console.log('done with the important stuff, trying redirect...')
    res.redirect('./');
}