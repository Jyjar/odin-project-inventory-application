const db = require("../db/queries");

async function getPokémons(req, res) {
    const pokémons = await db.getAllPokémons();
    console.log("Pokémons: ", pokémons);
    res.render("index", { title: "Pokédex", pokémons: pokémons });
}

async function addPokémonGet(req, res) {
    res.render("addPokémon", { title: "Add pokémon" });
}

async function addPokémonPost(req, res) {}

module.exports = {
    getPokémons,
    addPokémonGet,
    addPokémonPost,
};
