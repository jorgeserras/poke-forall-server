const express = require('express');
const router = express.Router();
const pokedexService = require('./pokedex.service');

// routes for Pokedex
router.get('/generations', generations);
router.get('/generation/:id', generationById);
router.get('/pokemon_species/:id', speciesById);
router.get('/evolution_chain/:id', evolutionById);
router.get('/pokemon/:id', pokemonById);
router.get('/pokemons', pokemonList);


module.exports = router;

function generations(req, res, next) {
    console.log("Request for generation list");
    pokedexService.generations(req.body)
        .then(generations => res.json(generations))
        .catch(err => next(err));
}

function generationById(req, res, next) {
    console.log("Request for generation ");
    pokedexService.generation_request(req.params.id)
        .then(generation_data => res.json(generation_data))
        .catch(err => next(err));
}

function speciesById(req, res, next) {
    console.log("Request for species ");
    pokedexService.get_species(req.params.id)
        .then(species_data => res.json(species_data))
        .catch(err => next(err));
}

function evolutionById(req, res, next) {
    console.log("Request for evolution ");
    pokedexService.get_evolution(req.params.id)
        .then(evolution_data => res.json(evolution_data))
        .catch(err => next(err));
}

function pokemonById(req, res, next) {
    console.log("Request for pokemon ");
    pokedexService.get_pokemon(req.params.id)
        .then(pokemon_data => res.json(pokemon_data))
        .catch(err => next(err));
}

function pokemonList(req, res, next) {
    console.log("Request for all pokemon list");
    pokedexService.get_all_pokemon(req.body)
        .then(pokemons => res.json(pokemons))
        .catch(err => next(err));
}