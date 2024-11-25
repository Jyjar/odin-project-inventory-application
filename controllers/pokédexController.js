const db = require("../db/queries");
const { fetchPokémon } = require("../api/fetchPokémon.js");

async function getPokémons(req, res) {
    const pokémons = await db.getAllPokémons();
    res.render("index", { title: "Pokédex", pokémons: pokémons, pokémon: null});
}

async function addPokémonGet(req, res) {
    res.render("addPokémon", {
        title: "Add Pokémon",
        errorMessage: null,
    });
}

async function addPokémonPost(req, res) {
    const { name } = req.body;

    try {
        const pokémon = await fetchPokémon(name.toLowerCase());

        if (!pokémon) {
            return res.render("addPokémon", {
                title: "Add Pokémon",
                errorMessage: "No Pokémon found with that name. Please try again.",
            });
        }

        const pokémon_id = pokémon.id;
        const imgUrl = pokémon.sprites.front_default;
        const typesArray = pokémon.types.map((type) => type.type.name);

        await db.insertPokémon(pokémon_id, name.toLowerCase(), imgUrl, typesArray);

        res.redirect(`/pokemon/${pokémon_id}`);
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).render("addPokémon", {
            title: "Add Pokémon",
            errorMessage: "An error occurred while adding the Pokémon. Please try again later.",
        });
    }
}

async function getPokémon(req, res) {
    const { index } = req.params;
    const pokémon = await db.getPokémonById(index);
    const pokémons = await db.getAllPokémons();

    if (!pokémon) {
        return res.status(404).send("Pokémon not found");
    }

    res.render("index", {
        title: "Pokédex",
        pokémons: pokémons,
        pokémon: pokémon,
    });
}

module.exports = {
    getPokémons,
    addPokémonGet,
    addPokémonPost,
    getPokémon,
};
