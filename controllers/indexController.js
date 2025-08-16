const db = require('../db/queries');

exports.get = async (req, res) => {

    const dbCounts = await db.countTableEntries();
    for (const key in dbCounts) {
        if (Object.prototype.hasOwnProperty.call(dbCounts, key)) {
            console.log(typeof dbCounts[key]);
            if (dbCounts[key] > 99)
                dbCounts[key] = '99+';
            else
                dbCounts[key] = String(dbCounts[key]);

        }
    }
    res.render('index', { db: dbCounts });
};