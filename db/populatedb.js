require('dotenv').config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS pokédex (
    id SERIAL PRIMARY KEY,
    pokémon_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    img_url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS pokémon_types (
    id SERIAL PRIMARY KEY,
    pokédex_id INT REFERENCES pokédex(id) ON DELETE CASCADE,
    type_id INT REFERENCES types(id) ON DELETE CASCADE
);

-- Insert all types into the types table
INSERT INTO types (name)
VALUES 
    ('Normal'), 
    ('Fire'), 
    ('Water'), 
    ('Grass'), 
    ('Rock'), 
    ('Fighting'), 
    ('Psychic'), 
    ('Ghost'), 
    ('Bug'), 
    ('Poison'), 
    ('Flying'), 
    ('Electric'), 
    ('Ground'), 
    ('Ice'), 
    ('Dragon'), 
    ('Dark'), 
    ('Steel'), 
    ('Fairy')
ON CONFLICT DO NOTHING;

-- Example: Insert Gengar with types (Ghost, Poison)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pokédex WHERE pokémon_id = 94) THEN
        INSERT INTO pokédex (pokémon_id, name, img_url)
        VALUES (94, 'gengar', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png');

        INSERT INTO pokémon_types (pokédex_id, type_id)
        SELECT id, (SELECT id FROM types WHERE name = 'Ghost') FROM pokédex WHERE pokémon_id = 94;

        INSERT INTO pokémon_types (pokédex_id, type_id)
        SELECT id, (SELECT id FROM types WHERE name = 'Poison') FROM pokédex WHERE pokémon_id = 94;
    END IF;
END $$;
`;

async function main() {
    console.log("Seeding the database...");

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });

    try {
        await client.connect();
        await client.query(SQL);
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        await client.end();
    }
}

main();