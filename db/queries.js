const pool = require("./pool");

async function getAllPokémons() {
    const { rows } = await pool.query("SELECT * FROM pokédex");
    return rows;
}

module.exports = {
    getAllPokémons,
};
