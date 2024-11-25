const pool = require("./pool");

async function getAllPokémons() {
    const { rows } = await pool.query("SELECT * FROM pokédex");
    return rows;
}

async function insertPokémon(pokémon_id, name, img_url, typesArray) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const pokédexResult = await client.query(
            `INSERT INTO pokédex (pokémon_id, name, img_url)
             VALUES ($1, $2, $3)
             RETURNING id`,
            [pokémon_id, name, img_url]
        );

        const pokédexId = pokédexResult.rows[0].id;

        for (const typeName of typesArray) {
            const typeResult = await client.query(
                `SELECT id FROM types WHERE LOWER(name) = LOWER($1)`,
                [typeName]
            );

            const typeId = typeResult.rows[0].id;

            await client.query(
                `INSERT INTO pokémon_types (pokédex_id, type_id)
                 VALUES ($1, $2)`,
                [pokédexId, typeId]
            );
        }

        await client.query("COMMIT");
        return pokédexId;
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Error inserting Pokémon:", error);
        throw error;
    } finally {
        client.release();
    }
}

async function getPokémonById(id) {
    const { rows } = await pool.query(
        `SELECT p.*, ARRAY_AGG(t.name) AS types
         FROM pokédex p
         LEFT JOIN pokémon_types pt ON p.id = pt.pokédex_id
         LEFT JOIN types t ON pt.type_id = t.id
         WHERE p.pokémon_id = $1
         GROUP BY p.id`,
        [id]
    );
    return rows[0];
}

module.exports = {
    getAllPokémons,
    insertPokémon,
    getPokémonById,
};
