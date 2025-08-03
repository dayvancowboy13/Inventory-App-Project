const pool = require('./pool');

exports.getAll = async function () {
    console.log('Querying for all rows...');
    const { rows } = await pool.query(`SELECT * FROM messages`);
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


