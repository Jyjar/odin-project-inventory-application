const db = require("../db/queries");

async function getPokémons(req, res) {
    const pokémons = await db.getAllPokémons();
    console.log("Pokémons: ", pokémons);
    res.render("index", { title: "Pokédex"})
}

module.exports = {
    getPokémons,
}