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

exports.insertMessage = async function (author, message) {
    await pool.query(`INSERT INTO messages (author, message, date_added) 
        VALUES ($1, $2, CURRENT_TIMESTAMP)`, [author, message]);
}

exports.getMessage = async function (id) {
    const { rows } = await pool.query(`SELECT * FROM messages
        WHERE id = $1`, [id]);
    return rows;
}

exports.getManufacturers = async function () {
    const { rows } = await pool.query(`SELECT * FROM manufacturers`);
    return rows;
}

exports.getCategories = async function () {
    const { rows } = await pool.query(`SELECT * FROM categories`);
    return rows;
}