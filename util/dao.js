
const pool = require('./db');


const get_data = async (query) => {
    try {
        const data = await pool.query(query);
        return data.rows;
    } catch (error) {
        console.log("error fetching data", error)
    }
}


const execute_value = async (query) => {
    const client = pool;
    try {
        await client.query('BEGIN');
        const executed_value = await client.query(query);
        await client.query('COMMIT');
        return executed_value;
    } catch (error) {
        client.query('ROLLBACK')
        console.log("error in executed value", error);
    }
}

const execute_values = async (query) => {
    try {
        await client.query('BEGIN');
        for (let q of query) await client.query(q);
        await client.query('COMMIT');
    } catch (error) {
        client.query('ROLLBACK')
        console.log("error in executed values", error);
    }
}
module.exports = { get_data, execute_value, execute_values }