const db = require('../db/queries');
const dbFuncs = require('../db/populatedb');

exports.checkDB = async function () {
    try {
        await db.checkDB();
    } catch (error) {
        console.log(error);

        try {
            await dbFuncs.init();
            await dbFuncs.populate();
        } catch (error) {
            console.log(error);
        }
    }
};