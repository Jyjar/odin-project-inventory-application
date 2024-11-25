const pool = require("./pool");

async function getAllPokémons() {
    const { rows } = await pool.query("SELECT * FROM pokédex");
    return rows;
}

async function insertPokémon(name) {
    // Get id, url and types from api
    // Insert it into the database
    await pool.query("INSERT INTO pok")
}

module.exports = {
    getAllPokémons,
};
