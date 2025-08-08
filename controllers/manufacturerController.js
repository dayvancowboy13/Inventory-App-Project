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

exports.getEditPage = async (req, res) => {
    console.log('sending the edit page')
    const id = Number(req.url.split('/')[2]);
    const manInfo = await db.getManufacturerById(id);
    res.render('editManufacturer', { manInfo });
};

exports.editManufacturer = async (req, res) => {
    const id = Number(req.url.split('/')[2]);
    await db.updateManufacturer(
        id,
        req.body.manufacturerName,
        req.body.manufacturerLocation,
        req.body.manufacturerNotes
    );
    res.redirect('/manufacturers');
}