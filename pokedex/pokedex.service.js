
const server = require('../server');

module.exports = {
    generations,
    generation_request,
    get_pokemon,
    get_all_pokemon,
    get_species,
    get_evolution
};

async function generations() {
    console.log("Resolving generation list request");
    return await server.P.getGenerationsList();
}

async function generation_request(id) {
    console.log("Resolving generation data request");
    return await server.P.getGenerationByName(id);
}

async function get_species(id) { // id or name
    console.log("Resolving species data request");
    return await server.P.getPokemonSpeciesByName(id);
}

async function get_evolution(id) { // id or name
    console.log("Resolving evolution chain data request");
    return await server.P.getEvolutionChainById(id);
}


async function get_pokemon(id) { // id or name
    console.log("Resolving pokemon data request");
    return await server.P.getPokemonByName(id);
}

async function get_all_pokemon() {
    console.log("Resolving all pokemon list request");
    return await server.P.getPokemonsList();
}