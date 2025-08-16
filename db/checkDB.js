const db = require('../db/queries');
const dbFuncs = require('../db/populatedb');

exports.checkDB = async function () {
    try {
        db.checkDB();
    } catch (error) {
        console.log(error);

        try {
            dbFuncs.init();
            dbFuncs.populate();
        } catch (error) {
            console.log(error);
        }
    }
};