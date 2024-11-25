async function fetchPokémon(pokémon) {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokémon}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        let data = await response.json();
        return data;

    } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
        return "No pokémon with that name found";
    }
}

module.exports = { fetchPokémon };
