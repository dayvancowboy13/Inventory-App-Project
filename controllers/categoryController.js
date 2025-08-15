const db = require('../db/queries');
const { body, validationResult } = require("express-validator");

const validateCategory = [
    body('categoryName').trim().isLength({ min: 1, max: 30 })
        .withMessage('Category name must be between 1 and 30 characters')
        .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Category name can only contain letters, numbers, or spaces'),
    body('categoryDescription').trim().isLength({ max: 200 })
        .withMessage('Category description must contain fewer than 200 characters')
];

exports.getCategoryPage = async (req, res) => {
    let content = await db.getCategories();
    res.render('categories', { categories: content });
};

exports.getAddCategoryPage = async (req, res) => {
    res.render('addCategory');
};

exports.postNewCategory = [
    validateCategory, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('addCategory',
                {
                    errors: errors.array()
                }
            )
        } else {
            const { categoryName, categoryDescription } = req.body;
            await db.addCategory(
                categoryName,
                categoryDescription,
            )
            res.redirect('./');
        }
    }
];

exports.getEditPage = async (req, res) => {
    const id = Number(req.url.split('/')[2]);
    const catInfo = await db.getCategoryById(id);
    res.render('editCategory', { catInfo });
};

exports.postEditCategory = [
    validateCategory, async (req, res) => {
        const errors = validationResult(req);
        const id = Number(req.url.split('/')[2]);
        if (!errors.isEmpty()) {
            const catInfo = await db.getCategoryById(id);
            return res.status(400).render('editCategory',
                {
                    catInfo,
                    errors: errors.array(),
                }
            )
        } else {
            await db.updateCategory(
                id,
                req.body.categoryName,
                req.body.categoryDescription
            );
            res.redirect('/categories');
        }

    }
];