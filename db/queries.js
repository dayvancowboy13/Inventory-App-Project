const pool = require('./pool');

//  item_id | name | description | manufacturer_id | category_id | price | quantity | image

exports.getAllItems = async function () {
    console.log('Querying for items...');
    const { rows } = await pool.query(`SELECT item_id, item_name, items.description, 
        manufacturers.manu_name, categories.cat_name, price, quantity, image FROM items
        INNER JOIN manufacturers ON items.manufacturer_id = manufacturers.manufacturer_id
        INNER JOIN categories ON items.category_id = categories.category_id ORDER BY item_id`);
    return rows;
}

exports.getItemById = async function (id) {
    console.log('retreiving item from db with id ', id);
    const { rows } = await pool.query(`SELECT item_id, item_name, items.description, 
        manufacturers.manu_name, categories.cat_name, price, quantity, image FROM items
        INNER JOIN manufacturers ON items.manufacturer_id = manufacturers.manufacturer_id
        INNER JOIN categories ON items.category_id = categories.category_id
        WHERE item_id = $1`, [id]);
    return rows;
}

exports.getCategoryById = async function (id) {
    console.log('retrieving category with id', id);
    const { rows } = await pool.query(`SELECT * FROM categories
        WHERE category_id = $1`, [id]);
    return rows;
}

exports.getManufacturerById = async function (id) {
    console.log('retrieving manufacturer with id', id);
    const { rows } = await pool.query(`SELECT * FROM manufacturers
        WHERE manufacturer_id = $1`, [id]);
    return rows;
}

exports.deleteItemById = async function (id) {
    console.log("deleting item with id", id);
    await pool.query(`DELETE FROM items WHERE items.item_id = $1`, [id]);
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
    const { rows } = await pool.query(`SELECT * FROM manufacturers ORDER BY manufacturer_id`);
    return rows;
}

exports.getCategories = async function () {
    const { rows } = await pool.query(`SELECT * FROM categories ORDER BY category_id`);
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

    await pool.query(`
        INSERT INTO items (item_name, manufacturer_id, category_id, price, quantity, description) 
        VALUES($1, $2, $3, $4, $5, $6)`, [name, man_id, cat_id, price, qty, desc]);
}

exports.updateProduct = async function (id, name, manufacturer, category, price, qty, desc) {
    console.log('updating product in the database...');

    let { rows } = await pool.query(`SELECT manufacturer_id FROM manufacturers
        WHERE $1 = manu_name`, [manufacturer]);
    const man_id = rows[0].manufacturer_id;

    let blah = await pool.query(`SELECT category_id FROM categories
        WHERE $1 = cat_name`, [category]);
    const cat_id = blah.rows[0].category_id

    await pool.query(`
        UPDATE items SET item_name = $1, manufacturer_id = $2, category_id = $3, price = $4, quantity = $5, description = $6 WHERE item_id = $7`, [name, man_id, cat_id, price, qty, desc, id]);
}

exports.addCategory = async function (name, description) {
    console.log('adding new category...');

    await pool.query(`INSERT INTO categories (cat_name, description) VALUES($1, $2)`,
        [name, description]
    );
}

exports.updateCategory = async function (id, name, desc) {
    console.log('updating category with id', id)
    await pool.query(`
        UPDATE categories SET cat_name = $1, description = $2 WHERE category_id = $3`, [name, desc, id]);
}

exports.addManufacturer = async function (name, location, notes) {
    console.log('adding new manufacturer to db...');

    await pool.query(`INSERT INTO manufacturers (manu_name, location, notes) VALUES ($1, $2, $3)`,
        [name, location, notes]
    );
}

exports.updateManufacturer = async function (id, name, location, notes) {
    await pool.query(`
        UPDATE manufacturers SET manu_name = $1, location = $2, notes = $3 WHERE manufacturer_id = $4`, [name, location, notes, id]);
}

exports.countTableEntries = async function () {
    var { rows } = await pool.query(`SELECT count(*) FROM items`);
    let productCount = Number(rows[0].count);
    var { rows } = await pool.query(`SELECT count(*) FROM categories`);
    let catCount = Number(rows[0].count);
    var { rows } = await pool.query(`SELECT count(*) FROM manufacturers`);
    let manuCount = Number(rows[0].count);

    return { productCount, catCount, manuCount };
}