const db = require('../db/queries');
const { body, validationResult } = require("express-validator");

const validateCategory = [
    body('categoryName').trim().isLength({ min: 1, max: 30 })
        .withMessage('Category name must be between 1 and 30 characters')
        .isAlphanumeric().withMessage('Category name can only contain letters or numbers'),
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

// exports.post = async (req, res) => {
//     await db.addCategory(
//         req.body.categoryName,
//         req.body.categoryDescription,
//     )
//     res.redirect('./');
// };

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
]

exports.getEditPage = async (req, res) => {
    console.log('sending the edit page')
    const id = Number(req.url.split('/')[2]);
    const catInfo = await db.getCategoryById(id);
    res.render('editCategory', { catInfo });
};

exports.postEditCategory = async (req, res) => {
    const id = Number(req.url.split('/')[2]);
    await db.updateCategory(
        id,
        req.body.categoryName,
        req.body.categoryDescription
    );
    res.redirect('/categories');
};