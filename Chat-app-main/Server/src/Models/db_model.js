import { pool } from '../Utils/pg.js';

const execute = async function runQuery(queryText, values) {
    try {
        const res = await pool.query(queryText, values);
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export { execute };
