const db = require('../db/queries');
const { body, validationResult } = require("express-validator");

const validateManufacturer = [
    body('manufacturerName').trim().isLength({ min: 1, max: 30 })
        .withMessage('Manufacturer name must be between 1 and 30 characters')
        .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Product name can only contain letters, numbers, or spaces'),
    body('manufacturerNotes').trim().isLength({ max: 200 })
        .withMessage('Manufacturer notes must contain fewer than 200 characters'),
    body('manufacturerLocation').trim().isLength({ min: 1, max: 30 })
        .withMessage('Manufacturer location must be between 1 and 30 characters')
        .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Product location can only contain letters, numbers, or spaces')
];

exports.getManufacturerPage = async (req, res) => {
    let content = await db.getManufacturers();
    res.render('manufacturers', { manufacturers: content });
};

exports.getAddManufacturerPage = async (req, res) => {
    res.render('addManufacturer');
};

exports.postNewManufacturer = [
    validateManufacturer, async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render('addManufacturer',
                {
                    errors: errors.array()
                }
            )
        } else {
            console.log('adding new manufacturer...')
            await db.addManufacturer(
                req.body.manufacturerName,
                req.body.manufacturerLocation,
                req.body.manufacturerNotes,
            );
            res.redirect('./');
        }
    }
];

exports.getEditPage = async (req, res) => {
    const id = Number(req.url.split('/')[2]);
    const manInfo = await db.getManufacturerById(id);
    res.render('editManufacturer', { manInfo });
};

exports.postEditManufacturer = [
    validateManufacturer, async (req, res) => {
        const id = Number(req.url.split('/')[2]);
        const errors = validationResult(req);
        const manInfo = await db.getManufacturerById(id);

        if (!errors.isEmpty()) {
            return res.status(400).render('editManufacturer',
                {
                    errors: errors.array(),
                    manInfo
                }
            )
        } else {

            await db.updateManufacturer(
                id,
                req.body.manufacturerName,
                req.body.manufacturerLocation,
                req.body.manufacturerNotes
            );
            res.redirect('/manufacturers');
        }

    }
];