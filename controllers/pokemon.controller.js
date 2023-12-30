const axios = require('axios')
const { MyPokemon } = require('../models')
const { fibonaci } = require('../helpers/fibonaci')
require('dotenv').config()

exports.getAllPokemon = async (req, res) => {
    try {
        const fetch = await axios.get(`${process.env.POKEMON_URL}`)
        const pokeArr = []

        await Promise.all(fetch.data.results.map(async (el) => {
            const detail = await axios.get(`${el.url}`)
            pokeArr.push({
                ...el,
                ...detail.data
            })
        }))

        return res.status(200).json({
            status: "success",
            message: "Success Get Data",
            data: pokeArr
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: "error",
            message: "Bad Request",
        })
    }
}

exports.getPokemon = async (req, res) => {
    try {
        const fetch = await axios.get(`${process.env.POKEMON_URL}/${req.params.id}`)
        const data = {
            ...fetch.data
        }

        return res.status(200).json({
            status: "success",
            message: "Success Get Data",
            data: data
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: "error",
            message: "Bad Request",
        })
    }
}

exports.getMyPokemon = async (req, res) => {
    try {
        const myPokemon = await MyPokemon.findAll({ where: { user_id: req.user.user_id } })
        let pokemons = []
        await Promise.all(myPokemon.map(async (el) => {
            const fetch = await axios.get(`${process.env.POKEMON_URL}/${el.dataValues.pokemon_id}`)
            const data = {
                ...fetch.data,
                ...el.dataValues
            }

            pokemons.push(data)
        }))

        return res.status(200).json({
            status: "success",
            message: "Success Get Data",
            data: pokemons
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: "error",
            message: "Bad Request",
        })
    }
}

exports.catchPokemon = async (req, res) => {
    try {
        const prob = Math.random() * 100
        if (parseFloat(prob.toFixed(2)) <= 50) {
            return res.status(200).json({
                status: 'success',
                message: 'Failed Catch Pokemon',
                data: parseFloat(prob.toFixed(2))
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'Success Catch Pokemon',
            data: parseFloat(prob.toFixed(2))
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: "error",
            message: "Bad Request",
        })
    }
}

exports.namedPokemon = async (req, res) => {
    try {
        const pokemon = await MyPokemon.findOne({ where: { pokemon_id: req.body.pokemon_id } })
        let myPokemon
        if (!pokemon) {
            await MyPokemon.create({
                pokemon_id: req.body.pokemon_id,
                my_pokemon_name: req.body.pokemon_name,
                total_rename: 0,
                user_id: req.user.user_id
            })
        } else {
            myPokemon = pokemon
        }

        return res.status(200).json({
            status: 'success',
            message: 'Success Named Pokemon',
            data: myPokemon
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: "error",
            message: "Bad Request",
        })
    }
}

exports.renamedPokemon = async (req, res) => {
    try {
        let fibo
        const pokemon = await MyPokemon.findOne({ where: { my_pokemon_id: req.params.id } })
        if ((pokemon.total_rename + 1) > 0) {
            fibo = fibonaci(pokemon.total_rename + 1)
        }

        if (pokemon) {
            await pokemon.update({
                my_pokemon_name: `${req.body.my_pokemon_name}-${fibo[fibo.length - 1]}`,
                total_rename: pokemon.total_rename + 1,
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'Success Named Pokemon',
            data: pokemon
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: "error",
            message: "Bad Request",
        })
    }
}

exports.releasePokemon = async (req, res) => {
    try {
        const prim = parseInt(Math.random() * 30)

        let isPrima = 0
        for (let i = 1; i <= 30; i++) {
            if (prim % i == 0) {
                isPrima++
            }
        }

        if (isPrima > 2) {
            return res.status(200).json({
                status: 'failed',
                message: 'Failed Release Pokemon',
                data: prim
            })
        }

        await MyPokemon.destroy({ where: { my_pokemon_id: req.params.id } })
        return res.status(200).json({
            status: 'success',
            message: 'Success Release Pokemon',
            data: prim
        })

    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: "error",
            message: "Bad Request",
        })
    }
}