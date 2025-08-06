const pool = require('./pool');

//  item_id | name | description | manufacturer_id | category_id | price | quantity | image

exports.getAllItems = async function () {
    console.log('Querying for all rows...');
    const { rows } = await pool.query(`SELECT item_id, item_name, items.description, 
        manufacturers.manu_name, categories.cat_name, price, quantity, image FROM items
        INNER JOIN manufacturers ON items.manufacturer_id = manufacturers.manufacturer_id
        INNER JOIN categories ON items.category_id = categories.category_id`);
    return rows;
}

// exports.insertMessage = async function (author, message) {
//     await pool.query(`INSERT INTO messages (author, message, date_added) 
//         VALUES ($1, $2, CURRENT_TIMESTAMP)`, [author, message]);
// }

// exports.getMessage = async function (id) {
//     const { rows } = await pool.query(`SELECT * FROM messages
//         WHERE id = $1`, [id]);
//     return rows;
// }

exports.getManufacturers = async function () {
    const { rows } = await pool.query(`SELECT * FROM manufacturers`);
    return rows;
}

exports.getCategories = async function () {
    const { rows } = await pool.query(`SELECT * FROM categories`);
    return rows;
}

exports.addProduct = async function (name, manufacturer, category, price, qty, desc) {
    console.log('adding product to the database...');

    let { rows } = await pool.query(`SELECT manufacturer_id FROM manufacturers
        WHERE $1 = manu_name`, [manufacturer]);
    const man_id = rows[0].manufacturer_id;

    let blah = await pool.query(`SELECT category_id FROM categories
        WHERE $1 = cat_name`, [category]);
    const cat_id = blah.rows[0].category_id


    console.log(man_id, cat_id);

    await pool.query(`
        INSERT INTO items (item_name, manufacturer_id, category_id, price, quantity, description) 
        VALUES($1, $2, $3, $4, $5, $6)`, [name, man_id, cat_id, price, qty, desc])
}