const express = require('express');
const router = express.Router();
const PokemonController = require('../controllers/pokemon.controller')
const { authMiddleware } = require('../middlewares/user.middleware')

router.get('/', PokemonController.getAllPokemon)
router.get('/my-pokemon', authMiddleware, PokemonController.getMyPokemon)
router.get('/detail/:id', PokemonController.getPokemon)
router.post('/catch', authMiddleware, PokemonController.catchPokemon)
router.post('/named', authMiddleware, PokemonController.namedPokemon)
router.put('/rename/:id', authMiddleware, PokemonController.renamedPokemon)
router.delete('/release/:id', authMiddleware, PokemonController.releasePokemon)

module.exports = router